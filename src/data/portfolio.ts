// ---------------------------------------------------------------------------
// PORTFOLIO CONTENT
// ---------------------------------------------------------------------------
// This is the single source of truth for everything shown on the public
// portfolio: identity, resume, and contact details. Replace the placeholder
// values below with your own information — the layout updates automatically.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Alex Chen",
  initials: "AC",
  role: "Full-Stack Developer",
  tagline: "I build fast, reliable web applications — from first commit to production.",
  summary:
    "Full-stack developer with six years of experience shipping web products for startups, agencies, and growing businesses. I work across the entire stack — product thinking, design systems, APIs, and infrastructure — so freelance clients get one person who can take an idea from wireframe to deployed, working software.",
  location: "Remote · Worldwide",
  availability: "Available for freelance projects",
  email: "hello@alexchen.dev",
  // Used as the notification recipient when a visitor submits the contact form.
  notifyEmail: "hello@alexchen.dev",
  stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  socials: [
    { label: "GitHub", href: "https://github.com/alexchen" },
    { label: "LinkedIn", href: "https://linkedin.com/in/alexchen" },
    { label: "X", href: "https://x.com/alexchen" },
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
    company: "Independent",
    role: "Freelance Full-Stack Developer",
    period: "2022 — Present",
    summary:
      "Build end-to-end web products for startups and agencies on a project basis.",
    points: [
      "Delivered 20+ client projects: marketing sites, SaaS dashboards, internal tools, and e-commerce builds.",
      "Own the full lifecycle — scoping, architecture, design handoff, implementation, deployment, and handover.",
      "Known for clear communication: weekly progress updates, predictable timelines, and working software at every milestone.",
    ],
  },
  {
    company: "Northwind Labs",
    role: "Senior Frontend Engineer",
    period: "2020 — 2022",
    summary:
      "Led the frontend team building a data-heavy analytics platform used by 400+ companies.",
    points: [
      "Rebuilt the reporting UI in React + TypeScript, cutting page-load time by 60%.",
      "Introduced a design system adopted across three product teams.",
      "Mentored four engineers and ran the hiring loop for the frontend team.",
    ],
  },
  {
    company: "Aperture Studio",
    role: "Full-Stack Developer",
    period: "2018 — 2020",
    summary:
      "Built client websites and web applications at a digital product studio.",
    points: [
      "Shipped 15+ production sites with Node.js APIs, PostgreSQL, and React.",
      "Implemented custom CMS integrations and third-party payment flows.",
      "Worked directly with clients to translate requirements into shipped features.",
    ],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { label: "Backend", items: ["Node.js", "Hono", "PostgreSQL", "Redis"] },
  { label: "Cloud & Tooling", items: ["AWS", "Docker", "Vercel", "Git / CI-CD"] },
];

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

export const education: EducationItem[] = [
  {
    school: "University of California",
    degree: "B.S. Computer Science",
    period: "2014 — 2018",
  },
];
