import { PORTFOLIO_DATA } from '@/data/portfolio';

export interface UIAction {
  type: 'OPEN_WINDOW' | 'FILTER_PROJECTS' | 'TOGGLE_THEME' | 'OPEN_LINK';
  target: string;
  label?: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  action?: UIAction;
  suggestedPrompts?: string[];
}

export const SYSTEM_PROMPT = `You are Vedant's personal AI concierge on his macOS portfolio website.
Your goal is to warmly welcome visitors, share key achievements, showcase projects, and provide information about Vedant's skills and experience.
Be concise, articulate, technical yet approachable.
Only share details grounded in the portfolio knowledge base. If asked about something unavailable, politely state that you don't have that detail and suggest contacting Vedant directly.`;

export const SUGGESTED_PROMPTS = [
  "Who is Vedant?",
  "Show me his best AI projects",
  "What is his tech stack?",
  "Tell me about his experience",
  "How can I contact Vedant?",
  "Can I see his resume?",
  "Open the Terminal app"
];

export function queryAIEngine(userInput: string): { responseText: string; action?: UIAction; suggestedPrompts?: string[] } {
  const query = userInput.toLowerCase().trim();
  const data = PORTFOLIO_DATA;

  // 1. Check for specific UI action intents
  if (query.includes('project') || query.includes('work') || query.includes('portfolio') || query.includes('built')) {
    if (query.includes('ai') || query.includes('agent') || query.includes('ml')) {
      return {
        responseText: `Vedant has built several AI-driven projects, most notably **JobMatch** (an AI-powered job board using vector search and semantic fit-scoring) and this very portfolio site's **AI Concierge** (an intent-driven conversational assistant).

Opening the Projects window filtered to AI & ML...`,
        action: { type: 'FILTER_PROJECTS', target: 'ai', label: 'Filtered Projects: AI' },
        suggestedPrompts: ["Tell me about JobMatch", "What technologies does he use?", "Show resume"]
      };
    }

    return {
      responseText: `Here are Vedant's featured projects including **JobMatch**, **CollabDocs**, **SecureChat**, and this AI-powered portfolio itself.

I'm opening the Projects window for you now.`,
      action: { type: 'OPEN_WINDOW', target: 'projects', label: 'Opened Projects' },
      suggestedPrompts: ["Show me his AI projects", "What is SecureChat?", "How can I contact him?"]
    };
  }

  if (query.includes('about') || query.includes('who is') || query.includes('background') || query.includes('bio')) {
    return {
      responseText: `**${data.owner.name}** is a **${data.owner.title}** based in ${data.owner.location}.

${data.owner.longBio}

Key stats:
• ${data.stats[0].label}: ${data.stats[0].value}
• ${data.stats[1].label}: ${data.stats[1].value}
• ${data.stats[2].label}: ${data.stats[2].value}

Opening About Me window...`,
      action: { type: 'OPEN_WINDOW', target: 'about', label: 'Opened About Me' },
      suggestedPrompts: ["What is his tech stack?", "Show me his projects", "Contact Vedant"]
    };
  }

  if (query.includes('skill') || query.includes('tech stack') || query.includes('technology') || query.includes('languages') || query.includes('framework')) {
    return {
      responseText: `Vedant's core technical focus spans:
• **AI & ML**: Vector search & embeddings (Pinecone), semantic fit-scoring, conversational/intent-driven UI
• **Frontend & UX**: React, Next.js, TypeScript, Vite
• **Backend & Systems**: Node.js, Python/FastAPI, PostgreSQL, MongoDB, Redis
• **Security**: Digital forensics, OSINT, log analysis, applied cryptography (AES-256)

Opening the interactive Skills matrix...`,
      action: { type: 'OPEN_WINDOW', target: 'skills', label: 'Opened Skills' },
      suggestedPrompts: ["Show experience timeline", "Show projects", "Contact details"]
    };
  }

  if (query.includes('experience') || query.includes('job') || query.includes('role') || query.includes('career') || query.includes('company')) {
    const currentRole = data.experience[0];
    return {
      responseText: `Vedant's most recent role was **${currentRole.role}** at **${currentRole.company}** (${currentRole.period}), focused on digital forensics, OSINT, and log analysis.

Opening the Experience Timeline...`,
      action: { type: 'OPEN_WINDOW', target: 'experience', label: 'Opened Experience' },
      suggestedPrompts: ["View resume", "Contact Vedant", "Show AI projects"]
    };
  }

  if (query.includes('resume') || query.includes('cv') || query.includes('download resume')) {
    return {
      responseText: `You can view and download Vedant's full resume in the macOS Preview viewer.

Opening Resume Preview app...`,
      action: { type: 'OPEN_WINDOW', target: 'resume', label: 'Opened Resume' },
      suggestedPrompts: ["How can I contact Vedant?", "Show projects", "What is his tech stack?"]
    };
  }

  if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('hire') || query.includes('message')) {
    return {
      responseText: `You can get in touch with Vedant directly:
• Email: **${data.owner.email}**
• LinkedIn: **${data.owner.linkedin}**
• GitHub: **${data.owner.github}**

Opening Mail app contact form...`,
      action: { type: 'OPEN_WINDOW', target: 'contact', label: 'Opened Contact Mail' },
      suggestedPrompts: ["Open GitHub", "Open LinkedIn", "Can I see his resume?"]
    };
  }

  if (query.includes('terminal') || query.includes('cli') || query.includes('command line') || query.includes('shell')) {
    return {
      responseText: `Opening the macOS Terminal application... Type 'help' to see available portfolio CLI commands!`,
      action: { type: 'OPEN_WINDOW', target: 'terminal', label: 'Opened Terminal' },
      suggestedPrompts: ["Show projects", "Who is Vedant?", "Skills"]
    };
  }

  if (query.includes('github')) {
    return {
      responseText: `Opening Vedant's GitHub profile in a new tab... (${data.owner.github})`,
      action: { type: 'OPEN_LINK', target: data.owner.github, label: 'GitHub Profile' },
      suggestedPrompts: ["Show projects", "Contact Vedant"]
    };
  }

  if (query.includes('linkedin')) {
    return {
      responseText: `Opening Vedant's LinkedIn profile in a new tab... (${data.owner.linkedin})`,
      action: { type: 'OPEN_LINK', target: data.owner.linkedin, label: 'LinkedIn Profile' },
      suggestedPrompts: ["Show projects", "Contact Vedant"]
    };
  }

  if (query.includes('theme') || query.includes('dark') || query.includes('light')) {
    return {
      responseText: `Toggling theme mode for you!`,
      action: { type: 'TOGGLE_THEME', target: 'toggle', label: 'Theme Toggled' }
    };
  }

  // Fallback intelligent response
  return {
    responseText: `I am Vedant's AI concierge. I can answer questions about his software engineering projects, technical stack, career experience, and resume, or guide you through his macOS desktop environment.

Try asking:
• "Show me his best projects"
• "What is his tech stack?"
• "Tell me about his current role"
• "How can I contact Vedant?"`,
    suggestedPrompts: [
      "Show me his AI projects",
      "What is his tech stack?",
      "Can I see his resume?",
      "How to contact him?"
    ]
  };
}
