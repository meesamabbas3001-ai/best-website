export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Hybrid';
export type JobStatus = 'Active' | 'Draft' | 'Closed';
export type CandidateStatus = 'Applied' | 'Screening' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  experienceRequired: string; // e.g., "3+ years"
  educationRequired: string;  // e.g., "Bachelor's Degree in CS"
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  salaryRange?: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ScoreBreakdown {
  skillsMatchScore: number;       // 0 - 100 (weight ~40%)
  experienceMatchScore: number;   // 0 - 100 (weight ~30%)
  educationMatchScore: number;    // 0 - 100 (weight ~15%)
  keywordMatchScore: number;      // 0 - 100 (weight ~15%)
}

export interface CandidateAnalysis {
  overallMatchScore: number; // 0 - 100
  scoreBreakdown: ScoreBreakdown;
  matchedSkills: string[];
  missingSkills: string[];
  relevantExperience: string;
  educationAssessment: string;
  strengths: string[];
  gaps: string[];
  candidateSummary: string;
  recommendation: 'Highly Recommended' | 'Recommended' | 'Consider with Reservations' | 'Not Recommended';
}

export interface RecruiterNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Candidate {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  degree: string;
  university: string;
  yearsOfExperience: number;
  companies: string[];
  jobTitles: string[];
  skills: string[];
  certifications: string[];
  projects: string[];
  languages: string[];
  resumeSummary: string;
  resumeFileName: string;
  resumeText: string;
  resumeUrl?: string;
  status: CandidateStatus;
  appliedDate: string;
  analysis?: CandidateAnalysis;
  notes: RecruiterNote[];
}

export interface AtsMetrics {
  totalCandidates: number;
  newCandidates: number;
  shortlistedCandidates: number;
  interviewCandidates: number;
  rejectedCandidates: number;
  avgMatchScore: number;
  activeJobsCount: number;
  recentApplicationsCount: number;
}

export interface FilterOptions {
  searchQuery: string;
  jobId: string;
  status: string;
  minScore: number;
  maxScore: number;
  skill: string;
  sortBy: 'score' | 'date' | 'name';
  sortOrder: 'asc' | 'desc';
}

export interface CandidateProfile {
  candidateName: string;
  professionalTitle: string;
  location: string;
  email: string;
  phone: string;
  professionalSummary: string;
  education: string;
  degrees: string[];
  certifications: string[];
  yearsOfExperience: string;
  companies: string[];
  jobTitles: string[];
  technicalSkills: string[];
  softSkills: string[];
  tools: string[];
  programmingLanguages: string[];
  industryExperience: string;
  projects: string[];
  achievements: string[];
  languages: string[];
  keywords: string[];
}

export interface AtsScoreBreakdown {
  keywordOptimization: number;
  skillMatch: number;
  experienceMatch: number;
  educationMatch: number;
  jobDescriptionMatch: number;
  industryAlignment: number;
  resumeStructure: number;
  achievementStrength: number;
  explanations: {
    keywordOptimization: string;
    skillMatch: string;
    experienceMatch: string;
    educationMatch: string;
    jobDescriptionMatch: string;
    industryAlignment: string;
    resumeStructure: string;
    achievementStrength: string;
  };
}

export interface AtsIssue {
  problem: string;
  whyItMatters: string;
  howToImprove: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface KeywordEvidence {
  keyword: string;
  matchType: 'CONFIRMED_FROM_CV' | 'INFERRED_RELATED' | 'NOT_FOUND';
  sectionFound?: string;
  reason?: string;
}

export interface KeywordAnalysis {
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendedKeywords: string[];
  importantSkillsFound: string[];
  importantSkillsMissing: string[];
  highPriorityMissing?: string[];
  otherGaps?: string[];
  keywordEvidence?: KeywordEvidence[];
}

export interface RecommendedSkillToLearn {
  skill: string;
  whyUseful: string;
}

export interface SkillGapAnalysis {
  skillsDemonstrated: string[];
  skillsPartiallyDemonstrated: string[];
  skillsMissing: string[];
  recommendedSkillsToLearn: RecommendedSkillToLearn[];
}

export interface JobMatchDetails {
  jobDescriptionProvided: boolean;
  requirementsMatched: string[];
  requirementsPartiallyMatched: string[];
  requirementsMissing: string[];
  requiredSkillsMatched: string[];
  preferredSkillsMatched: string[];
  experienceMatchAssessment: string;
  educationMatchAssessment: string;
  responsibilitiesMatchAssessment: string;
  whyResumeMatches: string;
  whatMayPreventStrongerMatch: string;
}

export interface RecommendedRole {
  role: string;
  matchScore: number;
  matchBadge: 'Excellent Match' | 'Strong Match' | 'Potential Match';
  whyItMatches: string;
  relevantSkills: string[];
  skillsToImprove: string[];
  suggestedCareerLevel: string;
}

export interface PakistanCareerOpportunities {
  recommendedJobCategories: string[];
  commonIndustries: string[];
  typicalRoleTypes: string[];
  workEnvironments: string[];
  remoteOpportunities: string;
}

export interface GlobalCareerOpportunities {
  internationalJobRoles: string[];
  remoteCareerPaths: string[];
  globalSkillOpportunities: string;
}

export interface ResumeImprovement {
  section: string;
  currentProblem: string;
  recommendedVersion: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface FinalAtsReport {
  overallAtsScore: number;
  topStrengths: string[];
  topProblems: string[];
  mostImportantMissingSkills: string[];
  mostImportantKeywords: string[];
  bestMatchingJobRoles: string[];
  top5Improvements: string[];
}

export interface AtsEvaluationResult {
  candidateProfile: CandidateProfile;
  atsScore: number;
  scoreBreakdown: AtsScoreBreakdown;
  scoreExplanation: string;
  atsIssues: AtsIssue[];
  keywordAnalysis: KeywordAnalysis;
  skillGapAnalysis: SkillGapAnalysis;
  jobMatchDetails: JobMatchDetails;
  recommendedRoles: RecommendedRole[];
  pakistanOpportunities: PakistanCareerOpportunities;
  globalOpportunities: GlobalCareerOpportunities;
  resumeImprovements: ResumeImprovement[];
  improvedProfessionalSummary: string;
  finalAtsReport: FinalAtsReport;
}

export interface ProfessionalCvData {
  candidateName: string;
  contactInfo: string;
  professionalSummary: string;
  coreSkills: {
    category: string;
    skills: string[];
  }[];
  professionalExperience: {
    company: string;
    title: string;
    dates: string;
    bulletPoints: string[];
  }[];
  projects: {
    title: string;
    description: string;
    technologies?: string[];
    contribution?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year?: string;
  }[];
  certifications: string[];
  additionalInfo?: string[];
}



