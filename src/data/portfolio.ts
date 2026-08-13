// ---------------------------------------------------------------------------
// PORTFOLIO CONTENT
// ---------------------------------------------------------------------------
// This is the single source of truth for everything shown on the public
// portfolio: identity, resume, and contact details.
//
// Populated from Afaq's CV (Aug 2026). Please review:
//  - email / notifyEmail: replace with a real inbox you check daily
//  - experience periods: adjust to match your LinkedIn work history
// ---------------------------------------------------------------------------

export const profile = {
  name: "Afaq Ul Islam",
  initials: "AUI",
  role: "Full-Stack & AI Engineer",
  tagline: "Software Engineering Consultant · Fractional Engineering",
  summary:
    "Full-stack and AI engineer with hands-on experience building production-grade web applications, AI-powered automation systems, and SaaS products end to end. Co-Founder and COO at Neofyx, where I lead product engineering alongside client delivery — comfortable scoping requirements, architecting solutions, and shipping working software independently across modern web and AI stacks.",
  location: "Karachi, Pakistan",
  availability: "Open to consulting, project-based & fractional work",
  email: "afaqulislam707@gmail.com",
  phone: "0346-1863082",
  // Recipient for contact-form notifications (via the built-in email integration).
  notifyEmail: "afaqulislam707@gmail.com",
  // Path to your CV PDF, hosted in /public. Drop your file at public/cv.pdf
  // (or update this path to match your file's name).
  cvUrl: "/cv.pdf",
  stack: ["Next.js", "React", "TypeScript", "FastAPI", "Python", "AI APIs"],
  socials: [
    { label: "GitHub", href: "https://github.com/afaqulislam" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/afaqulislam" },
    { label: "Website", href: "https://afaqulislam.vercel.app" },
    { label: "X", href: "https://x.com/afaqulislam708" },
    { label: "Linktree", href: "https://linktr.ee/afaqulislam" },
  ],
} as const;

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Neofyx",
    role: "Co-Founder & COO",
    period: "2025 — Present",
    summary:
      "AI automation and SaaS startup in Karachi — co-leading the company and driving product engineering alongside client delivery.",
    points: [
      "Co-lead a Karachi-based AI automation and SaaS startup, working alongside co-founders across CEO and CTO functions.",
      "Drive product engineering as a hands-on full-stack and AI engineer, building client-facing web applications and AI-powered features.",
      "Own client and project delivery, including scoping requirements and translating business needs into technical solutions.",
    ],
  },
  {
    company: "Independent",
    role: "Full-Stack & AI Engineer (Freelance / Project-Based)",
    period: "2024 — Present",
    summary:
      "Freelance and project-based engagements spanning web builds, AI automation, and agentic systems.",
    points: [
      "Delivered a website build-out for C.Ronaldo Sports, a Karachi-based sports and football gear retailer, on a Next.js stack.",
      "Designed and implemented an n8n automation workflow for AI-generated video content and multi-platform publishing (YouTube, TikTok), integrating Groq LLMs and the kie.ai Veo3 API on a free-tier stack.",
      "Built a personal portfolio website using React, TypeScript, Tailwind CSS, and Framer Motion.",
    ],
  },
];

export type Capability = {
  title: string;
  description: string;
};

// Core expertise — what clients can hire you for, shown at the top of the resume.
export const capabilities: Capability[] = [
  {
    title: "Full-Stack Web Development",
    description:
      "React, TypeScript, Next.js, FastAPI, Python — building, deploying, and maintaining production web applications and SaaS platforms.",
  },
  {
    title: "AI & Automation Engineering",
    description:
      "Integrating and orchestrating AI APIs (Gemini, Claude, OpenAI, Groq) into applications; building agentic and multi-agent systems, automation workflows (n8n), and AI-powered content and data pipelines.",
  },
  {
    title: "Product & Technical Leadership",
    description:
      "Scoping features, architecting solutions, and taking products from concept to deployment as a startup co-founder and hands-on engineer.",
  },
  {
    title: "Cloud & Deployment",
    description:
      "Deploying applications on Google Cloud Run and modern hosting platforms; working with free-tier and cost-conscious infrastructure stacks for early-stage products.",
  },
];

export type Project = {
  name: string;
  description: string;
};

// Selected projects — the highlights from the CV.
export const projects: Project[] = [
  {
    name: "CIRO AI — Multi-Agent Crisis Response System",
    description:
      "Built as part of a team for AI Seekho Phase 2, coordinating multiple AI agents to support crisis response workflows.",
  },
  {
    name: "Kisaan Dost AI — Crop Disease Detector",
    description:
      "AI-powered crop disease detection tool for Pakistani farmers, built on Google Gemini Vision for Google AI Seekho 2026.",
  },
  {
    name: "AURELIA — Luxury Fashion E-Commerce Platform",
    description:
      "Built for the Google Build with AI 2026 workshop (GeeksforGeeks); deployed on Google Cloud Run.",
  },
  {
    name: "Personal AI Employee",
    description:
      "An agentic personal-automation system built for GIAIC Hackathon 0, using Obsidian for persistent memory, Python watcher scripts, and a Qwen Code CLI reasoning engine, with tiered Gmail, WhatsApp, LinkedIn, and social-posting automation.",
  },
];

export type Achievement = {
  title: string;
  description: string;
};

// Achievements — recognitions and milestones from the CV.
export const achievements: Achievement[] = [
  {
    title: "Silver Tier Winner, Google AI Seekho 2026",
    description:
      "For Kisaan Dost AI, an AI-powered crop disease detector for Pakistani farmers built on Google Gemini Vision.",
  },
  {
    title: "Startup Challenge Winner",
    description: "Neofyx won a startup challenge competition.",
  },
  {
    title: "Ranked #21 of 319 participants (top ~7%)",
    description:
      "In 'Ramadan Prompting Nights,' a scenario-based daily coding challenge series.",
  },
  {
    title: "Applied to Y Combinator Startup School 2026",
    description: "With Neofyx and its key product work.",
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { label: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "Framer Motion"] },
  { label: "Backend & AI", items: ["FastAPI", "Pydantic", "Node.js", "Gemini", "Claude", "OpenAI", "Groq"] },
  { label: "Automation & DevOps", items: ["n8n", "Docker", "Google Cloud Run", "Vercel", "Git & GitHub"] },
];

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

export const education: EducationItem[] = [
  {
    school: "University of Karachi",
    degree: "BS Computational Mathematics",
    period: "In Progress",
  },
  {
    school: "GIAIC — Governor's Initiative for AI & Computing",
    degree: "Agentic AI and Python Track",
    period: "In Progress",
  },
];
