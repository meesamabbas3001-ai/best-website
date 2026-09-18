import { Job, Candidate } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer (React/Node)',
    department: 'Engineering',
    location: 'San Francisco, CA (Hybrid)',
    employmentType: 'Full-time',
    experienceRequired: '5+ years',
    educationRequired: "Bachelor's in Computer Science or related field",
    description: 'We are seeking an experienced Senior Full Stack Engineer to lead front-end and API service development for our core SaaS product platform. Ideal candidates possess deep mastery of modern TypeScript, React 19, REST/GraphQL APIs, Node.js, microservices architecture, and automated CI/CD pipelines.',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'PostgreSQL', 'Tailwind CSS'],
    preferredSkills: ['GraphQL', 'Docker', 'AWS', 'Next.js', 'Redis'],
    salaryRange: '$150,000 - $185,000 / yr',
    status: 'Active',
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'job-2',
    title: 'Lead AI System Specialist',
    department: 'AI & Data Intelligence',
    location: 'Remote (US/Canada)',
    employmentType: 'Remote',
    experienceRequired: '4+ years',
    educationRequired: "Master's or Bachelor's in CS / AI / Data Science",
    description: 'Join our cutting-edge AI team implementing LLM orchestrations, RAG pipelines, fine-tuned agent workflows, and real-time multimodal model integration. Experience with Python, LangChain/LlamaIndex, PyTorch, vector databases (Pinecone, Qdrant), and Gemini API is highly valued.',
    requiredSkills: ['Python', 'LLMs', 'Gemini API', 'Vector Databases', 'PyTorch', 'System Architecture'],
    preferredSkills: ['TypeScript', 'FastAPI', 'LangChain', 'MLOps', 'Kubernetes'],
    salaryRange: '$165,000 - $205,000 / yr',
    status: 'Active',
    createdAt: '2026-09-05T10:00:00.000Z',
    updatedAt: '2026-09-05T10:00:00.000Z',
  },
  {
    id: 'job-3',
    title: 'Senior Product Designer (UX/UI)',
    department: 'Design',
    location: 'New York, NY (Hybrid)',
    employmentType: 'Full-time',
    experienceRequired: '4+ years',
    educationRequired: "Bachelor's in HCI, Design, or equivalent portfolio experience",
    description: 'Looking for a human-centered Product Designer to sculpt our enterprise web applications, design systems, interactive prototypes, and recruiter workflows. Requires proficiency in Figma, design tokens, micro-interactions, accessibility compliance (WCAG 2.1 AA), and user testing.',
    requiredSkills: ['Figma', 'UX Research', 'Design Systems', 'Interactive Prototyping', 'WCAG Accessibility'],
    preferredSkills: ['HTML/CSS', 'Design Tokens', 'User Interviewing', 'Framing/Motion'],
    salaryRange: '$135,000 - $165,000 / yr',
    status: 'Active',
    createdAt: '2026-09-10T11:30:00.000Z',
    updatedAt: '2026-09-10T11:30:00.000Z',
  },
  {
    id: 'job-4',
    title: 'DevOps & Cloud Infrastructure Lead',
    department: 'Infrastructure',
    location: 'Austin, TX (Hybrid)',
    employmentType: 'Contract',
    experienceRequired: '6+ years',
    educationRequired: "Bachelor's in Computer Engineering or CS",
    description: 'Seeking a seasoned Infrastructure Engineer to orchestrate zero-downtime Cloud Run/Kubernetes deployments, Terraform IaC, GCP/AWS IAM security, monitoring dashboards with Datadog/Prometheus, and serverless edge caching.',
    requiredSkills: ['Docker', 'Kubernetes', 'Terraform', 'GCP', 'CI/CD', 'Linux'],
    preferredSkills: ['AWS', 'Datadog', 'Python scripting', 'Cloudflare Workers'],
    salaryRange: '$85 - $110 / hr',
    status: 'Draft',
    createdAt: '2026-09-12T14:00:00.000Z',
    updatedAt: '2026-09-12T14:00:00.000Z',
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-101',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack Engineer (React/Node)',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@devmail.org',
    phone: '+1 (415) 892-3410',
    location: 'San Francisco, CA',
    education: "B.S. in Computer Science",
    degree: "Bachelor of Science",
    university: "UC Berkeley",
    yearsOfExperience: 6,
    companies: ['Vanguard Labs', 'CloudScale Technologies', 'Apex Solutions'],
    jobTitles: ['Senior Software Engineer', 'Full Stack Developer', 'Frontend Engineer'],
    skills: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'PostgreSQL', 'Tailwind CSS', 'Next.js', 'Redis'],
    certifications: ['AWS Certified Solutions Architect', 'Meta Front-End Developer Professional'],
    projects: ['High-throughput FinTech Analytics Engine', 'Multi-tenant Enterprise SaaS Portal'],
    languages: ['English', 'Spanish'],
    resumeSummary: 'Experienced Senior Full Stack Software Engineer with 6 years of expertise building scalable React/Node microservices, complex dashboards, and robust API backends in high-growth SaaS environments.',
    resumeFileName: 'Elena_Rostova_CV_2026.pdf',
    resumeText: `ELENA ROSTOVA
San Francisco, CA | elena.rostova@devmail.org | +1 (415) 892-3410

PROFESSIONAL SUMMARY
Dynamic Senior Full Stack Engineer with 6 years of experience architecting distributed cloud applications, modern SPA frontends (React 19, TypeScript, Tailwind CSS), and high-availability Express/Node.js backends. Proven track record of improving site performance by 45% and leading cross-functional engineering teams.

WORK EXPERIENCE
Senior Software Engineer | Vanguard Labs | 2023 - Present
- Architected enterprise multi-tenant React/TypeScript client portal serving 120,000 daily active users.
- Designed PostgreSQL query optimization strategies and Redis caching layers reducing response latency by 60ms.
- Mentored 4 junior engineers and implemented strict CI/CD linting & unit testing pipelines.

Full Stack Developer | CloudScale Technologies | 2020 - 2023
- Built RESTful and GraphQL API backends handling 5M monthly requests.
- Integrated Tailwind CSS design system with reusable component libraries across 3 product lines.

EDUCATION
B.S. in Computer Science | UC Berkeley (2016 - 2020)

SKILLS & CERTIFICATIONS
Skills: React, TypeScript, Node.js, Express, REST APIs, PostgreSQL, Tailwind CSS, Next.js, Redis, Docker, Git
Certifications: AWS Certified Solutions Architect`,
    status: 'Shortlisted',
    appliedDate: '2026-09-02T14:22:00.000Z',
    analysis: {
      overallMatchScore: 92,
      scoreBreakdown: {
        skillsMatchScore: 95,
        experienceMatchScore: 90,
        educationMatchScore: 90,
        keywordMatchScore: 90
      },
      matchedSkills: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'PostgreSQL', 'Tailwind CSS', 'Next.js', 'Redis'],
      missingSkills: ['AWS', 'GraphQL'],
      relevantExperience: '6 years of hands-on senior full-stack experience exceeding the 5+ years requirement.',
      educationAssessment: "B.S. in Computer Science from UC Berkeley perfectly satisfies the educational criteria.",
      strengths: [
        'Exceeds minimum experience threshold with 6 years in React/Node engineering',
        'Demonstrated track record of performance optimization and architectural leadership',
        'Strong alignment with key tech stack (React, TypeScript, Node.js, PostgreSQL)'
      ],
      gaps: [
        'Limited direct exposure mentioned for AWS in primary stack, though certified as AWS Solutions Architect'
      ],
      candidateSummary: 'Top-tier candidate with comprehensive technical alignment across all front-end and API backend requirements.',
      recommendation: 'Highly Recommended'
    },
    notes: [
      {
        id: 'note-1',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Initial screening call went exceptionally well. Elena demonstrated great communication and deep architectural knowledge.',
        createdAt: '2026-09-03T10:15:00.000Z'
      }
    ]
  },
  {
    id: 'cand-102',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack Engineer (React/Node)',
    fullName: 'Marcus Vance',
    email: 'marcus.vance@techcode.io',
    phone: '+1 (212) 555-0198',
    location: 'Brooklyn, NY',
    education: "B.A. in Software Engineering",
    degree: "Bachelor of Arts",
    university: "NYU Courant",
    yearsOfExperience: 4,
    companies: ['Nexus Digital', 'ByteCraft Labs'],
    jobTitles: ['Full Stack Developer', 'Software Engineer'],
    skills: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'MongoDB', 'CSS3', 'Git'],
    certifications: ['Certified Web Developer'],
    projects: ['E-commerce Platform', 'Customer Care Chatbot'],
    languages: ['English'],
    resumeSummary: 'Full Stack Engineer with 4 years of hands-on web application development using React, JavaScript/TypeScript, and Node.js.',
    resumeFileName: 'Marcus_Vance_Resume.pdf',
    resumeText: `MARCUS VANCE
Brooklyn, NY | marcus.vance@techcode.io | +1 (212) 555-0198

SUMMARY
Dedicated Full Stack Engineer with 4 years building web apps. Proficient in React, JavaScript, Node.js, REST APIs, and MongoDB.

EXPERIENCE
Full Stack Developer | Nexus Digital (2022 - Present)
- Developed front-end components using React and TypeScript.
- Created REST endpoints for client applications.

EDUCATION
B.A. in Software Engineering | NYU (2018 - 2022)

SKILLS
React, TypeScript, Node.js, REST APIs, MongoDB, Git`,
    status: 'Screening',
    appliedDate: '2026-09-04T09:10:00.000Z',
    analysis: {
      overallMatchScore: 74,
      scoreBreakdown: {
        skillsMatchScore: 75,
        experienceMatchScore: 70,
        educationMatchScore: 80,
        keywordMatchScore: 70
      },
      matchedSkills: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
      missingSkills: ['PostgreSQL', 'Tailwind CSS', 'Docker', 'AWS', 'GraphQL'],
      relevantExperience: '4 years experience (requirement is 5+ years).',
      educationAssessment: "Software Engineering degree meets standard education requirements.",
      strengths: [
        'Solid foundation in core React and Node.js development',
        'Clean track record in web application delivery'
      ],
      gaps: [
        'Slightly below required 5+ years experience target (has 4 years)',
        'Missing relational database experience (PostgreSQL)'
      ],
      candidateSummary: 'Competent mid-to-senior engineer who meets core stack requirements but is slightly under target experience.',
      recommendation: 'Consider with Reservations'
    },
    notes: []
  },
  {
    id: 'cand-103',
    jobId: 'job-2',
    jobTitle: 'Lead AI System Specialist',
    fullName: 'Dr. Aris Thorne',
    email: 'aris.thorne@ai-research.org',
    phone: '+1 (650) 431-9981',
    location: 'Palo Alto, CA',
    education: "Ph.D. in Computer Science (Artificial Intelligence)",
    degree: "Doctorate",
    university: "Stanford University",
    yearsOfExperience: 7,
    companies: ['DeepMind Neural Lab', 'OpenSynthetics', 'Stanford AI Lab'],
    jobTitles: ['Lead AI Research Engineer', 'Senior Machine Learning Engineer'],
    skills: ['Python', 'LLMs', 'Gemini API', 'Vector Databases', 'PyTorch', 'System Architecture', 'FastAPI', 'LangChain'],
    certifications: ['TensorFlow Certified Developer', 'GCP Professional Data Engineer'],
    projects: ['Multimodal Retrieval-Augmented Generation Engine', 'Agentic Workflow Synthesizer'],
    languages: ['English', 'German', 'Mandarin'],
    resumeSummary: 'AI Research Engineer & System Specialist with 7 years specializing in LLM orchestrations, transformer optimization, RAG pipelines, and enterprise AI integrations.',
    resumeFileName: 'Aris_Thorne_AI_Resume.docx',
    resumeText: `DR. ARIS THORNE
Palo Alto, CA | aris.thorne@ai-research.org

SUMMARY
Ph.D. graduate from Stanford with 7 years leading state-of-the-art AI systems engineering, LLM agent orchestrations, Gemini API deployments, and high-performance vector databases.

EXPERIENCE
Lead AI Research Engineer | DeepMind Neural Lab | 2022 - Present
- Spearheaded production LLM RAG pipelines utilizing vector databases and Gemini model endpoints.
- Developed custom agentic reasoning benchmarks and tool-calling execution engines in Python.

EDUCATION
Ph.D. in Computer Science (AI Track) | Stanford University (2015 - 2019)

SKILLS
Python, PyTorch, Gemini API, Vector Databases, LLM Agents, LangChain, System Architecture`,
    status: 'Interview',
    appliedDate: '2026-09-06T11:45:00.000Z',
    analysis: {
      overallMatchScore: 96,
      scoreBreakdown: {
        skillsMatchScore: 98,
        experienceMatchScore: 95,
        educationMatchScore: 100,
        keywordMatchScore: 92
      },
      matchedSkills: ['Python', 'LLMs', 'Gemini API', 'Vector Databases', 'PyTorch', 'System Architecture', 'FastAPI', 'LangChain'],
      missingSkills: ['Kubernetes'],
      relevantExperience: '7 years of elite AI & machine learning engineering experience.',
      educationAssessment: 'Ph.D. in AI from Stanford exceeds education requirement (Master/Bachelor).',
      strengths: [
        'Exceptional academic and industry credentials in generative AI & LLM architectures',
        'Direct hands-on experience with Gemini API and vector index orchestrations',
        '7 years of proven technical leadership'
      ],
      gaps: ['Minimal infrastructure containerization detail mentioned'],
      candidateSummary: 'Outstanding candidate with perfect technical fit for the Lead AI System Specialist role.',
      recommendation: 'Highly Recommended'
    },
    notes: [
      {
        id: 'note-2',
        author: 'David Kim (Head of AI)',
        text: 'Technical interview scheduled for Tuesday. Impressive research publications.',
        createdAt: '2026-09-07T16:00:00.000Z'
      }
    ]
  }
];
