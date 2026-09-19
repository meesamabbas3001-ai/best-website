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
        console.warn(`Model ${model} failed (${errMsg}). Trying next candidate...`);
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

    if (resumeText.length > 25000) {
      return res.status(400).json({ error: 'Resume text exceeds maximum length limit of 25,000 characters.' });
    }

    if (jobDescription && typeof jobDescription === 'string' && jobDescription.length > 15000) {
      return res.status(400).json({ error: 'Job description exceeds maximum length limit of 15,000 characters.' });
    }

    const prompt = `You are a senior Enterprise AI Applicant Tracking System (ATS) Evaluator for Recruitz Solution.
Perform a fast, deterministic, evidence-based ATS Compatibility & Job Match Analysis of the provided candidate resume text against the target job requirements.

TARGET INDUSTRY: ${targetIndustry || 'Information Technology'}
TARGET JOB DESCRIPTION PROVIDED: ${jobDescription ? 'YES' : 'NO'}

JOB DESCRIPTION / ROLE REQUIREMENTS:
${jobDescription || 'No specific job description provided. Perform general employability and industry alignment evaluation.'}

CANDIDATE RESUME TEXT:
${resumeText}

STRICT EVIDENCE-BASED & ACCURACY RULES:
1. NEVER FABRICATE: Do NOT invent companies, degrees, certifications, years of experience, titles, skills, or achievements not present in the resume.
2. EVIDENCE-BASED KEYWORD MATCHING: For keywords, explicitly categorize matching status:
   - "CONFIRMED_FROM_CV": Explicitly written in the candidate's CV text (indicate section found e.g., "Skills section", "Work experience").
   - "INFERRED_RELATED": Related experience implied by context, but NOT explicitly written as a keyword. NEVER convert an inferred skill into a confirmed skill.
   - "NOT_FOUND": Missing from the CV text.
3. MISSING KEYWORDS PRIORITIZATION: Separate missing keywords into "highPriorityMissing" (core job requirements) and "otherGaps".
4. TRUTHFUL RECOMMENDATIONS: For any recommended skill/keyword, include the explicit advice: "Only add this if you genuinely have this skill or experience." Do NOT encourage keyword stuffing.
5. EXPLAINABLE ATS COMPATIBILITY SCORE (0-100): Calculate an objective score based on keyword match, skill alignment, experience fit, structure, and impact.
6. SUPPORTED CV PROBLEMS: Report only genuine problems found in the CV text (e.g., missing metrics, missing dates, unformatted bullet points). Do not invent issues.
7. NON-DISCRIMINATION: Focus exclusively on job-relevant skills, experience, education, projects, certifications, and capabilities.

Return JSON strictly matching the schema.`;

    const response = await generateContentWithFallback(prompt, {
      temperature: 0.0,
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
                  importantSkillsMissing: { type: Type.ARRAY, items: { type: Type.STRING } },
                  highPriorityMissing: { type: Type.ARRAY, items: { type: Type.STRING } },
                  otherGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
                  keywordEvidence: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        keyword: { type: Type.STRING },
                        matchType: { type: Type.STRING, description: 'CONFIRMED_FROM_CV, INFERRED_RELATED, or NOT_FOUND' },
                        sectionFound: { type: Type.STRING },
                        reason: { type: Type.STRING }
                      },
                      required: ['keyword', 'matchType']
                    }
                  }
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
      );

    const jsonText = response.text?.trim() || '{}';
    const parsedData = JSON.parse(jsonText);

    return res.status(200).json(parsedData);
  } catch (err: any) {
    console.warn('Gemini ATS evaluation endpoint fallback notice:', err?.message || err);
    return res.status(500).json({
      error: 'AI service temporarily unavailable due to high demand.',
      details: err?.message || 'AI service endpoint error'
    });
  }
}
