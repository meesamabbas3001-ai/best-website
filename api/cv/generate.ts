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

const CANDIDATE_MODELS = ['gemini-3.6-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-pro-preview', 'gemini-flash-latest'];

async function generateContentWithFallback(prompt: string, config: any) {
  let lastError: any;
  for (const model of CANDIDATE_MODELS) {
    for (let retry = 0; retry < 2; retry++) {
      try {
        return await ai.models.generateContent({
          model,
          contents: prompt,
          config,
        });
      } catch (err: any) {
        lastError = err;
        const errMsg = String(err?.message || err);
        const isTransient =
          errMsg.includes('503') ||
          errMsg.includes('UNAVAILABLE') ||
          errMsg.includes('high demand') ||
          errMsg.includes('429') ||
          errMsg.includes('RESOURCE_EXHAUSTED') ||
          errMsg.includes('Overloaded');

        if (isTransient && retry < 1) {
          await new Promise((res) => setTimeout(res, 1000));
          continue;
        }
        break;
      }
    }
  }
  throw lastError;
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
    const { targetIndustry, resumeText, jobDescription } = body || {};

    if (!resumeText || typeof resumeText !== 'string' || !resumeText.trim()) {
      return res.status(400).json({ error: 'Candidate resume text is required.' });
    }

    const prompt = `You are a professional CV optimization expert for Recruitz Solution.
Generate a professional, job-targeted, ATS-friendly CV based strictly on the candidate's actual resume text and job description.

TARGET INDUSTRY: ${targetIndustry || 'Information Technology'}
JOB DESCRIPTION:
${jobDescription || 'None provided. Optimize for general professional excellence in target industry.'}

CANDIDATE RESUME TEXT:
${resumeText}

STRICT ANTI-FABRICATION RULES:
1. NEVER INVENT: Do NOT invent work experience, companies, job titles, education, degrees, certifications, skills, projects, achievements, awards, years of experience, employment dates, numbers/results, or professional responsibilities.
2. TRUTHFUL REWRITING: Improve grammar, action verbs, sentence structure, and clarity of the user's REAL experience. If numbers/metrics were not provided, do not invent them.
3. JOB TARGETING: Prioritize and highlight relevant skills and experiences from the user's actual background that align with the job description. If a job requires a skill the user does not possess, do not add it.
4. SECTION STRUCTURE: Organize into:
   - candidateName
   - contactInfo (email, phone, location)
   - professionalSummary (concise, job-targeted, truthful)
   - coreSkills (categorized by Technical Skills, Tools & Technologies, Professional Skills, Languages - strictly supported by user data)
   - professionalExperience (company, title, dates, bulletPoints)
   - projects (title, description, technologies, contribution)
   - education (institution, degree, year)
   - certifications (array of strings)
   - additionalInfo (array of strings)

Return JSON strictly matching the schema.`;

    const response = await generateContentWithFallback(prompt, {
      temperature: 0.0,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          candidateName: { type: Type.STRING },
          contactInfo: { type: Type.STRING },
          professionalSummary: { type: Type.STRING },
          coreSkills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['category', 'skills'],
            },
          },
          professionalExperience: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                company: { type: Type.STRING },
                title: { type: Type.STRING },
                dates: { type: Type.STRING },
                bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['company', 'title', 'dates', 'bulletPoints'],
            },
          },
          projects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                contribution: { type: Type.STRING },
              },
              required: ['title', 'description'],
            },
          },
          education: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                institution: { type: Type.STRING },
                degree: { type: Type.STRING },
                year: { type: Type.STRING },
              },
              required: ['institution', 'degree'],
            },
          },
          certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
          additionalInfo: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: [
          'candidateName',
          'contactInfo',
          'professionalSummary',
          'coreSkills',
          'professionalExperience',
          'education',
          'certifications',
        ],
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini model.');
    }

    const data = JSON.parse(text);
    return res.status(200).json(data);
  } catch (err: any) {
    console.error('Error generating professional CV:', err);
    return res.status(500).json({ error: err.message || 'Internal server error during CV generation.' });
  }
}
