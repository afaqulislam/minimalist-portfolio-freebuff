// ---------------------------------------------------------------------------
// PORTFOLIO CONTENT
// ---------------------------------------------------------------------------
// This is the single source of truth for everything shown on the public
// portfolio: identity, resume, and contact details.
//
// Populated from https://github.com/afaqulislam (Aug 2026). Please review:
//  - email / notifyEmail: replace with a real inbox you check daily
//  - experience periods: adjust to match your LinkedIn work history
//  - education: add your own entry (the section hides until you do)
// ---------------------------------------------------------------------------

export const profile = {
  name: "Afaq Ul Islam",
  initials: "AUI",
  role: "Full-Stack & AI Developer",
  tagline: "Building SaaS products with Next.js, React, TypeScript & FastAPI.",
  summary:
    "COO at Neofyx and a full-stack developer who takes SaaS ideas from first commit to production. I build AI-powered products end to end — polished Next.js interfaces, FastAPI backends, and the agentic systems in between — so clients get one person who owns the whole stack.",
  location: "Sindh, Pakistan",
  availability: "Available for freelance projects",
  // TODO: replace with the email address you actually check.
  email: "hello@afaqulislam.dev",
  // Recipient for contact-form notifications (via the built-in email integration).
  notifyEmail: "hello@afaqulislam.dev",
  stack: ["Next.js", "React", "TypeScript", "FastAPI", "Python", "Docker"],
  socials: [
    { label: "GitHub", href: "https://github.com/afaqulislam" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/afaqulislam" },
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
    role: "COO & Co-Founder",
    period: "2025 — Present",
    summary:
      "Leading product and engineering at Neofyx, building SaaS products for clients and internal ventures.",
    points: [
      "Own product delivery end to end — scoping, architecture, implementation, and go-live.",
      "Ship across the full stack with Next.js, React, TypeScript, and FastAPI, including AI-powered features.",
      "Work directly with clients from first call to production handover, with working software at every milestone.",
    ],
  },
  {
    company: "Independent",
    role: "Full-Stack & AI Developer",
    period: "2024 — Present",
    summary:
      "Freelance and personal projects spanning agentic AI, API design, and secure data tooling.",
    points: [
      "Built startuplaunch-ai, an agentic platform that runs market research, competitor analysis, and risk assessment in parallel — then issues an evidence-backed Go / No-Go verdict.",
      "Designed validated CRUD REST APIs with FastAPI and Pydantic, shipped with interactive Swagger documentation.",
      "Containerized and published applications to Docker Hub and deployed SaaS frontends to Vercel.",
    ],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { label: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "HTML / CSS"] },
  { label: "Backend & AI", items: ["FastAPI", "Pydantic", "Node.js", "LLM / Agent APIs"] },
  { label: "DevOps & Tooling", items: ["Docker", "Vercel", "Git & GitHub", "REST APIs"] },
];

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

// Add your education here, e.g.:
//   { school: "Your University", degree: "B.S. Computer Science", period: "20XX — 20XX" }
// The Education section is hidden until at least one entry exists.
export const education: EducationItem[] = [];
