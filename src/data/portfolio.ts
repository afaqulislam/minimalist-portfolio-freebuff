// ---------------------------------------------------------------------------
// PORTFOLIO CONTENT
// ---------------------------------------------------------------------------
// Single source of truth for all portfolio content: identity, resume,
// projects, skills, and contact details.
//
// Populated from Afaq's CV (Aug 2026).
// ---------------------------------------------------------------------------

export const profile = {
  name: "Afaq Ul Islam",
  initials: "AUI",
  role: "Full-Stack & AI Engineer",
  tagline: "Co-Founder & COO, Neofyx",
  summary:
    "Full-stack and AI engineer with hands-on, end-to-end experience building web applications, AI-powered automation systems, and SaaS products. Co-Founder and COO at Neofyx, an AI automation and SaaS startup in Karachi, where I lead product engineering and client delivery. First-year BS Computational Mathematics student at the University of Karachi, also enrolled in GIAIC's Full-Stack Development & AI / AI Agent Systems / Cloud & Web Development program (top 10% performer, Batch 1, 90-95th percentile across three quarters). Active open-source contributor with 70+ public repositories on GitHub. Comfortable scoping requirements, architecting solutions, and shipping working software independently across modern web and AI stacks.",
  location: "Karachi, Pakistan",
  availability: "Open to consulting, project-based & fractional work",
  email: "afaqulislam707@gmail.com",
  phone: "0346-1863082",
  notifyEmail: "afaqulislam707@gmail.com",
  cvUrl: "/cv.pdf",
  stack: ["React", "Next.js", "TypeScript", "Python", "FastAPI", "AI APIs"],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/afaqulislam" },
    { label: "GitHub", href: "https://github.com/afaqulislam" },
    { label: "X (Twitter)", href: "https://x.com/afaqulislam708" },
    { label: "Portfolio", href: "https://afaqulislam.vercel.app" },
  ],
} as const;

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

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
    period: "Dec 2025 — Present",
    summary:
      "AI automation and SaaS startup in Karachi — leading operations, technical execution, and product delivery.",
    points: [
      "Lead operations, technical execution, and product delivery; structure workflows and define technical direction so projects move efficiently from concept to deployment.",
      "Build full-stack features and AI-powered functionality end to end for client-facing applications.",
      "Drive product engineering as a hands-on full-stack and AI engineer alongside co-founders across CEO and CTO functions.",
    ],
  },
  {
    company: "CodeAlpha (Remote)",
    role: "Frontend Development Intern",
    period: "Sep 2024 (1 month)",
    summary:
      "Virtual internship focused on frontend development fundamentals.",
    points: [
      "Completed a one-month Frontend Development Virtual Internship (1–30 September 2024).",
      "Independently built and deployed three responsive web projects using HTML, CSS, and JavaScript: an Audio Player, a Calculator, and an Image Gallery.",
      "Applied core frontend concepts including DOM manipulation, responsive UI design, and interactive component building.",
    ],
  },
  {
    company: "Independent",
    role: "Full-Stack Developer (Freelance / Project-Based)",
    period: "Ongoing",
    summary:
      "Freelance and project-based engagements spanning web builds, AI automation, and agentic systems.",
    points: [
      "Built and deployed a personal portfolio website using React, TypeScript, Tailwind CSS, and Framer Motion.",
      "Designed and implemented an n8n automation workflow for AI-generated video content and multi-platform publishing (YouTube, TikTok), integrating Groq LLMs and the kie.ai Veo3 API.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Impact metrics
// ---------------------------------------------------------------------------

export type Metric = { value: string; label: string };

export const metrics: Metric[] = [
  {
    value: "2+",
    label: "Years of professional & freelance experience",
  },
  {
    value: "10+",
    label: "Projects shipped across web, AI, and automation",
  },
  {
    value: "70+",
    label: "Public repositories on GitHub",
  },
  {
    value: "Top 10%",
    label: "GIAIC Batch 1 — 90-95th percentile across three quarters",
  },
];

// ---------------------------------------------------------------------------
// Process
// ---------------------------------------------------------------------------

export type ProcessStep = { step: string; title: string; description: string };

export const process: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "Dig into your goals, users, and constraints first — no code until the problem is crystal clear.",
  },
  {
    step: "02",
    title: "Architect",
    description:
      "Right-sized architecture: the stack, structure, and trade-offs chosen for your product, not for a resume.",
  },
  {
    step: "03",
    title: "Build & iterate",
    description:
      "Short, visible build cycles with regular check-ins, so you always know what's shipping and why.",
  },
  {
    step: "04",
    title: "Deploy & support",
    description:
      "Production deployment, monitoring, and a clear handover — plus ongoing improvements after launch.",
  },
];

// ---------------------------------------------------------------------------
// Capabilities
// ---------------------------------------------------------------------------

export type Capability = {
  title: string;
  description: string;
};

export const capabilities: Capability[] = [
  {
    title: "Full-Stack Web Development",
    description:
      "React, Next.js (14, 16, App Router, ISR, Turbopack), TypeScript, FastAPI, Python — building, deploying, and maintaining production web applications and SaaS platforms.",
  },
  {
    title: "AI & Agentic Development",
    description:
      "OpenAI Agents SDK, Chainlit, Groq AI, Google Gemini, Claude — building multi-agent/agentic systems, n8n workflow automation, and AI-powered content and data pipelines.",
  },
  {
    title: "Product & Technical Leadership",
    description:
      "Scoping features, architecting solutions, and taking products from concept to deployment as a startup co-founder and hands-on engineer.",
  },
  {
    title: "Cloud & Deployment",
    description:
      "Google Cloud Run, Docker, CI/CD, Vercel, Hugging Face — containerization, deployment pipelines, and cost-conscious infrastructure for early-stage products.",
  },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export type Project = {
  name: string;
  description: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "Kisaan Dost AI — Crop Disease Detector",
    description:
      "AI-powered crop disease detection tool for Pakistani farmers, built with Google Gemini Vision and deployed on Google Cloud Run, for Google AI Seekho 2026. Won Silver Tier.",
    stack: ["Google Gemini", "Python", "Google Cloud Run", "AI Vision"],
  },
  {
    name: "CIRO AI — Multi-Agent Crisis Response System",
    description:
      "Built with a team (Aadil Memon, Muskaan Fayyaz) for AI Seekho Phase 2, coordinating multiple AI agents to support crisis response workflows.",
    stack: ["Python", "Multi-Agent AI", "Orchestration"],
  },
  {
    name: "TaskSnap AI — Screenshot-to-Task Extractor",
    description:
      "AI tool that turns a screenshot of any conversation into a prioritized, deadline-aware task list. Built for \"Chai aur Code\", a monthly vibe-coding session by GDG Live Pakistan.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Groq AI", "Tailwind CSS v4"],
  },
  {
    name: "AURELIA — Luxury Fashion E-Commerce",
    description:
      "Built for the Google Build with AI 2026 workshop (GeeksforGeeks); deployed on Google Cloud Run.",
    stack: ["Next.js", "TypeScript", "Google Cloud Run"],
  },
  {
    name: "Personal AI Employee",
    description:
      "Agentic personal-automation system built for GIAIC Hackathon 0, using Obsidian for persistent memory, Python watcher scripts, and a CLI reasoning engine with tiered Gmail, WhatsApp, LinkedIn, and social-posting automation.",
    stack: ["Python", "Obsidian", "n8n", "Automation"],
  },
  {
    name: "Taskory — AI Full-Stack Task Manager",
    description:
      "Task manager with natural language processing, JWT authentication, real-time task management, and multi-AI-provider support.",
    stack: ["Python", "FastAPI", "JWT", "REST API"],
  },
  {
    name: "MORENT — Car Rental Marketplace",
    description:
      "Booking platform with smart filters, booking calendar, and interactive charts, built for GIAIC Hackathon 2025.",
    stack: ["Next.js", "Sanity CMS", "Clerk", "shadcn/ui"],
  },
  {
    name: "AUI Blogo — Dev Blog Platform",
    description:
      "Production blog with Next.js 14 ISR, Sanity CMS, Tailwind CSS, dark mode, auto table-of-contents, and dynamic SEO, deployed on Vercel.",
    stack: ["Next.js 14", "Sanity CMS", "Tailwind CSS", "Vercel"],
  },
  {
    name: "ChatAUI — Conversational AI Assistant",
    description:
      "Enterprise-style assistant built with Chainlit, the OpenAI Agents SDK, and OAuth 2.0 on a Python backend.",
    stack: ["Python", "Chainlit", "OpenAI Agents SDK", "OAuth 2.0"],
  },
  {
    name: "25 Python Projects",
    description:
      "A portfolio of 25 production-ready Python projects (socket games, computer vision, AI assistants, REST APIs, full-stack integrations) built for GIAIC.",
    stack: ["Python", "Computer Vision", "REST APIs", "Socket Programming"],
  },
];

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "HTML5", "CSS3"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Lucide"],
  },
  {
    label: "Backend & AI",
    items: ["FastAPI", "Node.js", "OpenAI Agents SDK", "Chainlit", "Groq AI", "Google Gemini", "Claude", "n8n"],
  },
  {
    label: "Cloud & Tools",
    items: ["Google Cloud Run", "Docker", "CI/CD", "Vercel", "Hugging Face", "Git & GitHub", "Sanity CMS", "Clerk"],
  },
];

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

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
    school: "GIAIC — Governor's Initiative for GenAI, Web3 & Metaverse",
    degree: "Full-Stack Development & AI / AI Agent Systems / Cloud & Web Development",
    period: "Feb 2024 — Sep 2026",
  },
  {
    school: "Aisha Bawany Government College",
    degree: "Intermediate, Pre-Engineering",
    period: "Aug 2022 — Aug 2024 · Grade A",
  },
  {
    school: "Sadiq Public Primary & Secondary School",
    degree: "SSC, Science",
    period: "May 2020 — May 2022 · Grade A1",
  },
];

// ---------------------------------------------------------------------------
// Achievements
// ---------------------------------------------------------------------------

export type Achievement = {
  title: string;
  description: string;
};

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
];
