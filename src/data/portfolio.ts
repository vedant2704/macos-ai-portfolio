export interface Project {
  id: string;
  title: string;
  category: 'ai' | 'web' | 'mobile' | 'experiments';
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  tags: string[];
  role: string;
  achievements: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  metrics?: string;
  year: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    years: number;
    icon?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  isCurrent?: boolean;
  description: string;
  keyAchievements: string[];
  technologies: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface PortfolioData {
  owner: {
    name: string;
    handle: string;
    title: string;
    tagline: string;
    location: string;
    bio: string;
    longBio: string;
    avatarUrl: string;
    resumePdfUrl: string;
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
    status: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
  interests: string[];
  currentFocus: string[];
  projects: Project[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  owner: {
    name: "Vedant Mahadik",
    handle: "@vedant",
    title: "AI Engineer | Full-Stack Developer | Cybersecurity Analyst",
    tagline: "Building AI-powered products, secure systems, and full-stack applications end to end.",
    location: "Mumbai, India",
    bio: " Electronics & Computer Science engineer who builds full-stack, AI-driven, and secure applications — from semantic search pipelines to real-time collaborative tools to encrypted messaging systems.",
    longBio: "I'm a  B.Tech student in Electronics and Computer Science, working across three areas: AI engineering (retrieval-augmented search, embeddings, conversational interfaces), full-stack development (React/Next.js, Node.js, FastAPI), and cybersecurity (digital forensics, OSINT, log analysis from my internship at Maharashtra Cyber). I like building complete, deployed products solo — from data pipeline to UI to production deployment — rather than just prototypes.",
    avatarUrl: "/assets/avatar.png",
    resumePdfUrl: "/assets/vedant-resume.pdf",
    email: "mahadikvedant92@gmail.com",
    github: "https://github.com/vedant2704",
    linkedin: "https://www.linkedin.com/in/vedant-mahadik1/",
    twitter: "",
    status: "Open to full-time roles in AI Engineering, Full-Stack Development, and Cybersecurity"
  },
  stats: [
    { label: "Years Coding", value: "3+" },
    { label: "Deployed Projects", value: "5" },
    { label: "Domains", value: "AI / Full-Stack / Security" },
    { label: "Graduating", value: "2026" }
  ],
  interests: [
    "Retrieval-Augmented Generation & Semantic Search",
    "Real-Time Collaborative Systems",
    "Applied Cryptography & Secure Messaging",
    "Digital Forensics & Threat Analysis",
    "Embedded & IoT Systems"
  ],
  currentFocus: [
    "Deploying AI-powered fit-scoring pipelines with vector search (JobMatch)",
    "Deepening hands-on skills in blue-team security and log/malware analysis",
    "Preparing for entry-level AI Engineer and Full-Stack roles"
  ],
  projects: [
    {
      id: "jobmatch",
      title: "JobMatch - AI-Powered Job Board",
      category: "ai",
      shortDescription: "Full-stack job board that scores and matches candidates to roles using semantic search.",
      fullDescription: "JobMatch is a full-stack AI-powered job board built solo end to end. It uses vector embeddings and Pinecone for semantic similarity search between candidate profiles and job postings, going beyond simple keyword matching to surface genuinely relevant roles. Backend built on FastAPI with PostgreSQL for structured data, frontend on React/Vite.",
      thumbnail: "/assets/project-ai-agent.png",
      tags: ["React", "Vite", "FastAPI", "PostgreSQL", "Pinecone", "Vector Search", "Python"],
      role: "Solo Full-Stack & AI Developer",
      achievements: [
        "Designed and built a semantic fit-scoring pipeline using vector embeddings instead of keyword matching",
        "Built and shipped all 6 phases solo: data layer, embedding pipeline, API, frontend, and deployment",
        "Currently deploying backend on Railway and frontend on Vercel"
      ],
      githubUrl: "",
      liveUrl: "",
      featured: true,
      metrics: "Solo-built, 6-phase full-stack AI product",
      year: "2026"
    },
    {
      id: "collabdocs",
      title: "CollabDocs - Real-Time Collaborative Editor",
      category: "web",
      shortDescription: "A real-time collaborative document editor built and deployed end to end.",
      fullDescription: "CollabDocs is a real-time collaborative document editor supporting multiple simultaneous editors on the same document. Built with Yjs for conflict-free real-time sync and Slate.js for the rich-text editing surface, backed by MongoDB and Redis, and deployed on Railway and Vercel.",
      thumbnail: "/assets/project-ai-agent.png",
      tags: ["React", "Vite", "Node.js", "Yjs", "Slate.js", "MongoDB", "Redis"],
      role: "Solo Full-Stack Developer",
      achievements: [
        "Implemented real-time multi-user sync using Yjs CRDTs and WebSockets",
        "Debugged and resolved production issues in JWT session persistence, Mongoose population, and Yjs WebSocket path matching",
        "Deployed full stack to production (Railway backend, Vercel frontend)"
      ],
      githubUrl: "",
      liveUrl: "",
      featured: true,
      metrics: "Deployed, real-time multi-user sync",
      year: "2026"
    },
    {
      id: "securechat",
      title: "SecureChat - E2E Encrypted Messaging",
      category: "web",
      shortDescription: "Decentralized, end-to-end encrypted messaging system — final-year major project.",
      fullDescription: "SecureChat is a decentralized, end-to-end encrypted messaging system built as a final-year major project. It uses AES-256 encryption for message confidentiality, WebRTC/PeerJS for decentralized peer-to-peer connections, IndexedDB for local storage, and Supabase for backend services. Submitted to two academic conferences (ICCUBEA 2026, KCCC 2026).",
      thumbnail: "/assets/project-ai-agent.png",
      tags: ["AES-256", "WebRTC", "PeerJS", "IndexedDB", "Supabase", "Cryptography"],
      role: "Core Developer",
      achievements: [
        "Implemented AES-256 end-to-end encryption for all peer-to-peer messages",
        "Built decentralized architecture using WebRTC/PeerJS, avoiding a central message server",
        "Submitted to ICCUBEA 2026 and KCCC 2026 academic conferences"
      ],
      githubUrl: "",
      liveUrl: "",
      featured: true,
      metrics: "Submitted to 2 academic conferences",
      year: "2026"
    },
    {
      id: "ai-concierge-portfolio",
      title: "This Portfolio - AI Concierge Desktop UI",
      category: "ai",
      shortDescription: "This macOS-style portfolio site, with a built-in intent-driven AI assistant.",
      fullDescription: "This portfolio itself doubles as an AI project: it ships with a conversational AI concierge that understands visitor intent (projects, skills, experience, contact, resume) and drives real UI actions in response — opening windows, filtering projects, and navigating the interface — via a Next.js API route and a custom intent-recognition engine.",
      thumbnail: "/assets/project-ai-agent.png",
      tags: ["Next.js", "TypeScript", "API Routes", "Conversational UI", "Intent Recognition"],
      role: "Designer & Developer",
      achievements: [
        "Built a conversational AI assistant that maps natural-language queries to UI actions (open window, filter content, toggle theme)",
        "Designed the intent-matching engine and structured action schema powering the assistant",
        "Integrated the assistant as a first-class app within a custom macOS-style desktop UI"
      ],
      githubUrl: "",
      liveUrl: "",
      featured: false,
      metrics: "Custom conversational UI engine",
      year: "2026"
    }
  ],
  skillCategories: [
    {
      name: "AI & ML Systems",
      icon: "Cpu",
      skills: [
        { name: "Vector Search / Embeddings (Pinecone)", level: "Advanced", years: 1 },
        { name: "Semantic / Fit-Scoring Pipelines", level: "Advanced", years: 1 },
        { name: "Conversational UI / Intent Recognition", level: "Proficient", years: 1 },
        { name: "RAG Concepts & AI Product Design", level: "Proficient", years: 1 }
      ]
    },
    {
      name: "Frontend Development",
      icon: "Layout",
      skills: [
        { name: "React / Next.js", level: "Advanced", years: 2 },
        { name: "TypeScript / JavaScript", level: "Advanced", years: 2 },
        { name: "Vite", level: "Advanced", years: 2 },
        { name: "Slate.js (Rich Text Editing)", level: "Proficient", years: 1 }
      ]
    },
    {
      name: "Backend & Systems",
      icon: "Server",
      skills: [
        { name: "Node.js", level: "Advanced", years: 2 },
        { name: "Python / FastAPI", level: "Advanced", years: 2 },
        { name: "PostgreSQL", level: "Advanced", years: 2 },
        { name: "MongoDB & Redis", level: "Proficient", years: 1 },
        { name: "WebSockets & Real-Time Sync (Yjs, WebRTC)", level: "Advanced", years: 1 }
      ]
    },
    {
      name: "Cybersecurity",
      icon: "Shield",
      skills: [
        { name: "Digital Forensics", level: "Proficient", years: 1 },
        { name: "OSINT & Log Analysis", level: "Proficient", years: 1 },
        { name: "Malware Analysis & Reporting", level: "Proficient", years: 1 },
        { name: "Applied Cryptography (AES-256)", level: "Proficient", years: 1 },
        { name: "Networking Fundamentals for Security", level: "Proficient", years: 1 }
      ]
    },
    {
      name: "DevOps & Deployment",
      icon: "Database",
      skills: [
        { name: "Docker", level: "Proficient", years: 1 },
        { name: "Git & GitHub", level: "Advanced", years: 2 },
        { name: "Railway / Vercel Deployment", level: "Proficient", years: 1 }
      ]
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "Maharashtra Cyber",
      location: "Mumbai, India",
      role: "Cybersecurity Intern",
      period: "July 2025 - Feb 2026",
      isCurrent: false,
      description: "Worked on digital forensics, OSINT, and log analysis, producing malware analysis reports for real cases.",
      keyAchievements: [
        "Conducted digital forensics and OSINT investigations as part of case work",
        "Performed log analysis to identify indicators of compromise and suspicious activity",
        "Authored malware analysis reports documenting findings and recommendations"
      ],
      technologies: ["Digital Forensics", "OSINT", "Log Analysis", "Malware Analysis"]
    }
  ],
  education: [
    {
      institution: "Shah & Anchor Kutchhi Engineering College (SAKEC)",
      degree: "B.Tech in Electronics and Computer Science",
      period: "2022 - 2026",
      location: "Mumbai, India",
      highlights: [
        "Final-year major project: SecureChat, a decentralized end-to-end encrypted messaging system, submitted to ICCUBEA 2026 and KCCC 2026",
        "Certifications: IAM Fundamentals (Forage), Introduction to Networking for Cyber Professionals (Zscaler Academy), Introduction to AI, IoT Edge Computing and IoT Analytics"
      ]
    }
  ]
};
