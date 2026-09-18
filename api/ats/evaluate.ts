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
    const { targetIndustry, resumeText, jobDescription } = body || {};

    if (!resumeText || typeof resumeText !== 'string' || !resumeText.trim()) {
      return res.status(400).json({ error: 'Candidate resume text is required.' });
    }

    if (resumeText.length > 25000) {
      return res.status(400).json({ error: 'Resume text exceeds maximum length limit of 25,000 characters.' });
    }

    if (jobDescription && typeof jobDescription === 'string' && jobDescription.length > 15000) {
      return res.status(400).json({ error: 'Job description exceeds maximum length limit of 15,000 characters.' });
    }

    const prompt = `You are a senior Enterprise AI Applicant Tracking System (ATS) Evaluator for Recruitz Solution.
Perform a rigorous, objective ATS analysis of the provided candidate resume text.

TARGET INDUSTRY: ${targetIndustry || 'Information Technology'}
TARGET JOB DESCRIPTION PROVIDED: ${jobDescription ? 'YES' : 'NO'}

JOB DESCRIPTION / ROLE REQUIREMENTS:
${jobDescription || 'No specific job description provided. Perform general employability and industry alignment evaluation.'}

CANDIDATE RESUME TEXT:
${resumeText}

CRITICAL ANTI-HALLUCINATION & EVALUATION GUIDELINES:
1. NEVER FABRICATE: Do NOT invent companies, degrees, certifications, years of experience, titles, or achievements not present in the resume.
2. MISSING DATA HANDLING: If information is missing from the resume, explicitly return "Not found in the provided resume."
3. MISSING JD DATA HANDLING: If job description is missing or lacks specific criteria, explicitly return "Not specified in the provided job description."
4. LIVE VACANCY HONESTY: For Pakistan Opportunities and Global Remote Opportunities, recommend relevant career directions and industry categories. Always clarify: "Career-market guidance, not live vacancy data. Live vacancy information is not connected."
5. SKILL GAP RULE: Under recommended skills, include the wording principle: "Add this skill only if you genuinely possess it."
6. NON-DISCRIMINATION: Focus exclusively on job-relevant skills, experience, education, projects, certifications, and capabilities.
7. IMPROVED SUMMARY: Generate an improved 3-line professional summary based strictly ONLY on facts provided in the resume.
8. ATS ISSUES & REWRITES: Provide specific problem, severity (High/Medium/Low), why it matters, and recommended improvements without inventing facts.

Return JSON strictly matching the schema.`;

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
              candidateProfile: {
                type: Type.OBJECT,
                properties: {
                  candidateName: { type: Type.STRING },
                  professionalTitle: { type: Type.STRING },
                  location: { type: Type.STRING },
                  email: { type: Type.STRING },
                  phone: { type: Type.STRING },
                  professionalSummary: { type: Type.STRING },
                  education: { type: Type.STRING },
                  degrees: { type: Type.ARRAY, items: { type: Type.STRING } },
                  certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
                  yearsOfExperience: { type: Type.STRING },
                  companies: { type: Type.ARRAY, items: { type: Type.STRING } },
                  jobTitles: { type: Type.ARRAY, items: { type: Type.STRING } },
                  technicalSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  softSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  tools: { type: Type.ARRAY, items: { type: Type.STRING } },
                  programmingLanguages: { type: Type.ARRAY, items: { type: Type.STRING } },
                  industryExperience: { type: Type.STRING },
                  projects: { type: Type.ARRAY, items: { type: Type.STRING } },
                  achievements: { type: Type.ARRAY, items: { type: Type.STRING } },
                  languages: { type: Type.ARRAY, items: { type: Type.STRING } },
                  keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: [
                  'candidateName',
                  'professionalTitle',
                  'location',
                  'email',
                  'phone',
                  'professionalSummary',
                  'education',
                  'degrees',
                  'certifications',
                  'yearsOfExperience',
                  'companies',
                  'jobTitles',
                  'technicalSkills',
                  'softSkills',
                  'tools',
                  'programmingLanguages',
                  'industryExperience',
                  'projects',
                  'achievements',
                  'languages',
                  'keywords'
                ]
              },
              atsScore: { type: Type.NUMBER, description: 'Overall ATS score 0-100' },
              scoreBreakdown: {
                type: Type.OBJECT,
                properties: {
                  keywordOptimization: { type: Type.NUMBER },
                  skillMatch: { type: Type.NUMBER },
                  experienceMatch: { type: Type.NUMBER },
                  educationMatch: { type: Type.NUMBER },
                  jobDescriptionMatch: { type: Type.NUMBER },
                  industryAlignment: { type: Type.NUMBER },
                  resumeStructure: { type: Type.NUMBER },
                  achievementStrength: { type: Type.NUMBER },
                  explanations: {
                    type: Type.OBJECT,
                    properties: {
                      keywordOptimization: { type: Type.STRING },
                      skillMatch: { type: Type.STRING },
                      experienceMatch: { type: Type.STRING },
                      educationMatch: { type: Type.STRING },
                      jobDescriptionMatch: { type: Type.STRING },
                      industryAlignment: { type: Type.STRING },
                      resumeStructure: { type: Type.STRING },
                      achievementStrength: { type: Type.STRING }
                    },
                    required: [
                      'keywordOptimization',
                      'skillMatch',
                      'experienceMatch',
                      'educationMatch',
                      'jobDescriptionMatch',
                      'industryAlignment',
                      'resumeStructure',
                      'achievementStrength'
                    ]
                  }
                },
                required: [
                  'keywordOptimization',
                  'skillMatch',
                  'experienceMatch',
                  'educationMatch',
                  'jobDescriptionMatch',
                  'industryAlignment',
                  'resumeStructure',
                  'achievementStrength',
                  'explanations'
                ]
              },
              scoreExplanation: { type: Type.STRING },
              atsIssues: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    problem: { type: Type.STRING },
                    whyItMatters: { type: Type.STRING },
                    howToImprove: { type: Type.STRING },
                    severity: { type: Type.STRING, description: 'High, Medium, or Low' }
                  },
                  required: ['problem', 'whyItMatters', 'howToImprove', 'severity']
                }
              },
              keywordAnalysis: {
                type: Type.OBJECT,
                properties: {
                  matchedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  recommendedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  importantSkillsFound: { type: Type.ARRAY, items: { type: Type.STRING } },
                  importantSkillsMissing: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: [
                  'matchedKeywords',
                  'missingKeywords',
                  'recommendedKeywords',
                  'importantSkillsFound',
                  'importantSkillsMissing'
                ]
              },
              skillGapAnalysis: {
                type: Type.OBJECT,
                properties: {
                  skillsDemonstrated: { type: Type.ARRAY, items: { type: Type.STRING } },
                  skillsPartiallyDemonstrated: { type: Type.ARRAY, items: { type: Type.STRING } },
                  skillsMissing: { type: Type.ARRAY, items: { type: Type.STRING } },
                  recommendedSkillsToLearn: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        skill: { type: Type.STRING },
                        whyUseful: { type: Type.STRING }
                      },
                      required: ['skill', 'whyUseful']
                    }
                  }
                },
                required: [
                  'skillsDemonstrated',
                  'skillsPartiallyDemonstrated',
                  'skillsMissing',
                  'recommendedSkillsToLearn'
                ]
              },
              jobMatchDetails: {
                type: Type.OBJECT,
                properties: {
                  jobDescriptionProvided: { type: Type.BOOLEAN },
                  requirementsMatched: { type: Type.ARRAY, items: { type: Type.STRING } },
                  requirementsPartiallyMatched: { type: Type.ARRAY, items: { type: Type.STRING } },
                  requirementsMissing: { type: Type.ARRAY, items: { type: Type.STRING } },
                  requiredSkillsMatched: { type: Type.ARRAY, items: { type: Type.STRING } },
                  preferredSkillsMatched: { type: Type.ARRAY, items: { type: Type.STRING } },
                  experienceMatchAssessment: { type: Type.STRING },
                  educationMatchAssessment: { type: Type.STRING },
                  responsibilitiesMatchAssessment: { type: Type.STRING },
                  whyResumeMatches: { type: Type.STRING },
                  whatMayPreventStrongerMatch: { type: Type.STRING }
                },
                required: [
                  'jobDescriptionProvided',
                  'requirementsMatched',
                  'requirementsPartiallyMatched',
                  'requirementsMissing',
                  'requiredSkillsMatched',
                  'preferredSkillsMatched',
                  'experienceMatchAssessment',
                  'educationMatchAssessment',
                  'responsibilitiesMatchAssessment',
                  'whyResumeMatches',
                  'whatMayPreventStrongerMatch'
                ]
              },
              recommendedRoles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    role: { type: Type.STRING },
                    matchScore: { type: Type.NUMBER },
                    matchBadge: { type: Type.STRING, description: 'Excellent Match, Strong Match, or Potential Match' },
                    whyItMatches: { type: Type.STRING },
                    relevantSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                    skillsToImprove: { type: Type.ARRAY, items: { type: Type.STRING } },
                    suggestedCareerLevel: { type: Type.STRING }
                  },
                  required: [
                    'role',
                    'matchScore',
                    'matchBadge',
                    'whyItMatches',
                    'relevantSkills',
                    'skillsToImprove',
                    'suggestedCareerLevel'
                  ]
                }
              },
              pakistanOpportunities: {
                type: Type.OBJECT,
                properties: {
                  recommendedJobCategories: { type: Type.ARRAY, items: { type: Type.STRING } },
                  commonIndustries: { type: Type.ARRAY, items: { type: Type.STRING } },
                  typicalRoleTypes: { type: Type.ARRAY, items: { type: Type.STRING } },
                  workEnvironments: { type: Type.ARRAY, items: { type: Type.STRING } },
                  remoteOpportunities: { type: Type.STRING }
                },
                required: [
                  'recommendedJobCategories',
                  'commonIndustries',
                  'typicalRoleTypes',
                  'workEnvironments',
                  'remoteOpportunities'
                ]
              },
              globalOpportunities: {
                type: Type.OBJECT,
                properties: {
                  internationalJobRoles: { type: Type.ARRAY, items: { type: Type.STRING } },
                  remoteCareerPaths: { type: Type.ARRAY, items: { type: Type.STRING } },
                  globalSkillOpportunities: { type: Type.STRING }
                },
                required: [
                  'internationalJobRoles',
                  'remoteCareerPaths',
                  'globalSkillOpportunities'
                ]
              },
              resumeImprovements: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    section: { type: Type.STRING },
                    currentProblem: { type: Type.STRING },
                    recommendedVersion: { type: Type.STRING },
                    impact: { type: Type.STRING, description: 'High, Medium, or Low' }
                  },
                  required: ['section', 'currentProblem', 'recommendedVersion', 'impact']
                }
              },
              improvedProfessionalSummary: { type: Type.STRING },
              finalAtsReport: {
                type: Type.OBJECT,
                properties: {
                  overallAtsScore: { type: Type.NUMBER },
                  topStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                  topProblems: { type: Type.ARRAY, items: { type: Type.STRING } },
                  mostImportantMissingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  mostImportantKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  bestMatchingJobRoles: { type: Type.ARRAY, items: { type: Type.STRING } },
                  top5Improvements: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: [
                  'overallAtsScore',
                  'topStrengths',
                  'topProblems',
                  'mostImportantMissingSkills',
                  'mostImportantKeywords',
                  'bestMatchingJobRoles',
                  'top5Improvements'
                ]
              }
            },
            required: [
              'candidateProfile',
              'atsScore',
              'scoreBreakdown',
              'scoreExplanation',
              'atsIssues',
              'keywordAnalysis',
              'skillGapAnalysis',
              'jobMatchDetails',
              'recommendedRoles',
              'pakistanOpportunities',
              'globalOpportunities',
              'resumeImprovements',
              'improvedProfessionalSummary',
              'finalAtsReport'
            ]
          }
        }
      })
    );

    const jsonText = response.text?.trim() || '{}';
    const parsedData = JSON.parse(jsonText);

    return res.status(200).json(parsedData);
  } catch (err: any) {
    console.error('Error during Gemini ATS evaluation:', err);
    return res.status(500).json({
      error: 'Failed to process ATS evaluation.',
      details: err.message || 'AI service endpoint error'
    });
  }
}
