import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function generateWithRetry(fn: () => Promise<any>, maxRetries = 3) {
  let lastErr: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastErr = err;
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1500 * (i + 1)));
      }
    }
  }
  throw lastErr;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { resumeText, job } = body || {};

    if (!resumeText || typeof resumeText !== 'string' || !resumeText.trim()) {
      return res.status(400).json({ error: 'Resume text is required.' });
    }

    const prompt = `You are an expert AI Applicant Tracking System (ATS) Evaluator.
Analyze the candidate's resume text against the specific job requirement provided below.

JOB REQUIREMENT DETAILS:
Title: ${job?.title || 'Not specified'}
Department: ${job?.department || 'Not specified'}
Required Experience: ${job?.experienceRequired || 'Not specified'}
Required Education: ${job?.educationRequired || 'Not specified'}
Required Skills: ${(job?.requiredSkills || []).join(', ') || 'Not specified'}
Preferred Skills: ${(job?.preferredSkills || []).join(', ') || 'Not specified'}
Job Description: ${job?.description || 'Not specified'}

CANDIDATE RESUME TEXT:
${resumeText}

TASK:
1. Extract key candidate information accurately from the resume text (fullName, email, phone, location, education, degree, university, yearsOfExperience, companies, jobTitles, skills, certifications, projects, languages, resumeSummary).
2. Calculate overallMatchScore (0-100) and scoreBreakdown (skillsMatchScore, experienceMatchScore, educationMatchScore, keywordMatchScore).
3. Identify matchedSkills, missingSkills, relevantExperience summary, educationAssessment summary, strengths (3-5 bullet points), gaps (1-3 points), candidateSummary, and recommendation ('Highly Recommended', 'Recommended', 'Consider with Reservations', or 'Not Recommended').

Return JSON matching the schema strictly.`;

    const response = await generateWithRetry(() =>
      ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          temperature: 0.2,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              candidateInfo: {
                type: Type.OBJECT,
                properties: {
                  fullName: { type: Type.STRING },
                  email: { type: Type.STRING },
                  phone: { type: Type.STRING },
                  location: { type: Type.STRING },
                  education: { type: Type.STRING },
                  degree: { type: Type.STRING },
                  university: { type: Type.STRING },
                  yearsOfExperience: { type: Type.NUMBER },
                  companies: { type: Type.ARRAY, items: { type: Type.STRING } },
                  jobTitles: { type: Type.ARRAY, items: { type: Type.STRING } },
                  skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
                  projects: { type: Type.ARRAY, items: { type: Type.STRING } },
                  languages: { type: Type.ARRAY, items: { type: Type.STRING } },
                  resumeSummary: { type: Type.STRING }
                },
                required: [
                  'fullName',
                  'email',
                  'phone',
                  'location',
                  'education',
                  'degree',
                  'university',
                  'yearsOfExperience',
                  'companies',
                  'jobTitles',
                  'skills',
                  'certifications',
                  'projects',
                  'languages',
                  'resumeSummary'
                ]
              },
              analysis: {
                type: Type.OBJECT,
                properties: {
                  overallMatchScore: { type: Type.NUMBER },
                  scoreBreakdown: {
                    type: Type.OBJECT,
                    properties: {
                      skillsMatchScore: { type: Type.NUMBER },
                      experienceMatchScore: { type: Type.NUMBER },
                      educationMatchScore: { type: Type.NUMBER },
                      keywordMatchScore: { type: Type.NUMBER }
                    },
                    required: ['skillsMatchScore', 'experienceMatchScore', 'educationMatchScore', 'keywordMatchScore']
                  },
                  matchedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  relevantExperience: { type: Type.STRING },
                  educationAssessment: { type: Type.STRING },
                  strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                  gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
                  candidateSummary: { type: Type.STRING },
                  recommendation: {
                    type: Type.STRING,
                    description: 'Highly Recommended, Recommended, Consider with Reservations, or Not Recommended'
                  }
                },
                required: [
                  'overallMatchScore',
                  'scoreBreakdown',
                  'matchedSkills',
                  'missingSkills',
                  'relevantExperience',
                  'educationAssessment',
                  'strengths',
                  'gaps',
                  'candidateSummary',
                  'recommendation'
                ]
              }
            },
            required: ['candidateInfo', 'analysis']
          }
        }
      })
    );

    const jsonText = response.text?.trim() || '{}';
    const parsedData = JSON.parse(jsonText);

    if (parsedData.candidateInfo) {
      parsedData.candidateInfo.resumeText = resumeText;
    }

    return res.status(200).json(parsedData);
  } catch (err: any) {
    console.error('Error during Gemini ATS candidate analysis:', err);
    return res.status(500).json({
      error: 'Failed to process ATS candidate analysis.',
      details: err.message || 'AI service endpoint error'
    });
  }
}
