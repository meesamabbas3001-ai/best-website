import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI client on server side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Nexus Talent ATS API', timestamp: new Date().toISOString() });
  });

  // Enterprise AI ATS Resume Evaluation Endpoint
  app.post('/api/ats/evaluate', async (req, res) => {
    try {
      const { targetIndustry, resumeText, jobDescription, analysisSettings } = req.body;

      if (!resumeText || typeof resumeText !== 'string' || !resumeText.trim()) {
        return res.status(400).json({ error: 'Candidate resume text is required.' });
      }

      const prompt = `You are a senior, world-class Enterprise AI Applicant Tracking System (ATS) Evaluator and Executive Career Strategist.
Perform a rigorous, objective ATS analysis of the provided candidate resume text.

TARGET INDUSTRY: ${targetIndustry || 'Information Technology'}
TARGET JOB DESCRIPTION PROVIDED: ${jobDescription ? 'YES' : 'NO'}

JOB DESCRIPTION / ROLE REQUIREMENTS:
${jobDescription || 'No specific job description provided. Perform general employability and industry alignment evaluation.'}

CANDIDATE RESUME TEXT:
${resumeText}

EVALUATION GUIDELINES:
1. NON-DISCRIMINATION: Focus exclusively on job-relevant skills, experience, education, projects, certifications, and capabilities.
2. NO FABRICATION: Do NOT invent companies, credentials, years of experience, or degrees not present in the resume. Return "Not specified" where information is missing.
3. IMPROVED PROFESSIONAL SUMMARY: Generate an improved 3-line professional summary based ONLY on information explicitly present in the resume.
4. PAKISTAN & GLOBAL CAREER OPPORTUNITIES: Recommend realistic career paths and industry sectors in the Pakistan job market and Global/Remote pathways. Do NOT fake live vacancies.
5. RESUME ISSUES: Identify specific ATS issues (e.g. unclear title, missing keywords, vague responsibilities, formatting/structure problems) with severity (High/Medium/Low), Problem, Why it matters, and How to improve it.
6. RESUME REWRITES: Provide section-by-section current problem vs recommended version without inventing facts.

Return JSON strictly matching the schema.`;

      const response = await ai.models.generateContent({
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
      });

      const jsonText = response.text?.trim() || '{}';
      const parsedData = JSON.parse(jsonText);

      return res.json(parsedData);
    } catch (err: any) {
      console.error('Error during Gemini ATS evaluation:', err);
      return res.status(500).json({
        error: 'Failed to process ATS evaluation.',
        details: err.message || 'AI service endpoint error'
      });
    }
  });

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nexus Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
