<p align="center">
  <img src="public/logo.svg" alt="Afaq Ul Islam" width="100" />
</p>

<h1 align="center">Afaq Ul Islam — Portfolio</h1>

<p align="center">
  <strong>Full-Stack & AI Engineer</strong><br/>
  Aptura Tech Solutions · Batch 03 · Week 1 · Task 1
</p>

<p align="center">
  <a href="https://afaqulislam.freebuff.app/">
    <img src="https://img.shields.io/badge/Live-Portfolio-0a0a0a?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Portfolio" />
  </a>
  <a href="https://github.com/afaqulislam/minimalist-portfolio-freebuff">
    <img src="https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/afaqulislam">
    <img src="https://img.shields.io/badge/LinkedIn-afaqulislam-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn" />
  </a>
  <a href="mailto:afaqulislam707@gmail.com">
    <img src="https://img.shields.io/badge/Email-afaqulislam707@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Open%20to%20Work-22C55E?style=flat-square" alt="Open to Work" />
  <img src="https://img.shields.io/badge/Location-Karachi,%20Pakistan-6B7280?style=flat-square" alt="Location" />
</p>

---

## 📋 Internship Context

This project is submitted as **Task 1: Personal Portfolio Website** for the
**Aptura Tech Solutions Batch 03 Internship, Week 1**.

| Detail | Value |
|--------|-------|
| **Student** | Afaq Ul Islam |
| **Program** | Aptura Tech Solutions — Batch 03 |
| **Task** | Week 1 — Task 1: Personal Portfolio Website |
| **Live Demo** | [https://afaqulislam.freebuff.app/](https://afaqulislam.freebuff.app/) |
| **Repository** | [github.com/afaqulislam/minimalist-portfolio-freebuff](https://github.com/afaqulislam/minimalist-portfolio-freebuff) |

**Deliverables included:**
- [x] Source files (this repository)
- [x] Report ([REPORT.md](REPORT.md))
- [x] Screenshots ([SCREENSHOTS.md](SCREENSHOTS.md))
- [x] README (this file)

---

## 👋 About Me

I'm **Afaq Ul Islam** — a full-stack and AI engineer based in **Karachi, Pakistan**. I'm the **Co-Founder & COO at [Neofyx](https://github.com/afaqulislam)**, where I lead operations, technical execution, and product delivery.

I specialize in building end-to-end web applications, AI-powered features, and automation systems that solve real-world problems. With 2+ years of professional and freelance experience, I've shipped 10+ projects ranging from SaaS platforms to multi-agent AI systems. I'm an active open-source contributor with **70+ public repositories** on GitHub.

- 🎓 First-year **BS Computational Mathematics** student at the University of Karachi
- 🏫 Enrolled in **GIAIC's** Full-Stack Development & AI / AI Agent Systems / Cloud & Web Development program (**top 10% performer, Batch 1, 90-95th percentile** across three quarters)

---

## 🌐 Live Portfolio

> **[https://afaqulislam.freebuff.app/](https://afaqulislam.freebuff.app/)**

An interactive portfolio with a minimalist monochrome theme, featuring a 3D robot scene, downloadable CV, contact form with real-time notifications, and a protected owner inbox.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **3D Interactive Scene** | Low-poly robot head rendered in real-time on Canvas, with pointer-tracking parallax, depth-sorted wireframe, glowing visor eyes, and antenna |
| **Minimalist Design** | Clean, spacious layout with near-monochrome palette, precise alignment, and intentional whitespace |
| **Fully Responsive** | Tested at 320px, 375px, 768px, 1024px, and 1440px — every section is centered and readable |
| **Downloadable CV (PDF)** | One-click CV generation using jsPDF, always reflects latest portfolio data |
| **Contact Form** | Functional form with honeypot spam protection, rate limiting (5/hour), and email notifications via Resend |
| **Owner Login (Email OTP)** | Secure email-only auth — only whitelisted owner email can log in |
| **Owner Inbox Dashboard** | Real-time display of all contact submissions, powered by Convex |
| **Tech Marquee** | Infinite horizontal scroll of technologies |
| **Impact Metrics** | Key statistics (experience, projects, AI models, ranking) |
| **Animated Sections** | Scroll-triggered Framer Motion animations |
| **SEO Optimized** | Open Graph, Twitter cards, meta tags, robots.txt, sitemap |
| **PWA Ready** | Web manifest with proper icons and theme color |
| **Print Styles** | Clean print stylesheet for CV export |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React + Vite)                 │
│                                                         │
│  Landing Page ──── 3D Scene (Canvas)                    │
│       │            Resume Section                        │
│       │            Contact Form                          │
│       │            Marquee / Stats                       │
│       │                                                 │
│  Auth Page ──────── Email OTP Login                     │
│       │            (Owner-only whitelist)                │
│       │                                                 │
│  Dashboard ──────── Inbox (contact messages)            │
│                    Protected by RequireAuth              │
└──────────────────────┬──────────────────────────────────┘
                       │ Convex SDK (real-time sync)
┌──────────────────────▼──────────────────────────────────┐
│                CONVEX (Backend + Database)               │
│                                                         │
│  Schema: messages, users                                │
│  Queries: messages.list                                 │
│  Mutations: messages.insert                             │
│  Actions: sendMessage (email notification via Resend)   │
│  Auth: Email OTP provider (owner whitelist)             │
└──────────────────────┬──────────────────────────────────┘
                       │ Resend API
┌──────────────────────▼──────────────────────────────────┐
│                   RESEND (Email)                         │
│                                                         │
│  OTP verification emails (owner login)                  │
│  Contact form notification emails                       │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, Next.js (14, 16), TypeScript, Tailwind CSS v4, Framer Motion, shadcn/ui, Lucide icons |
| **Backend** | FastAPI, Node.js, REST API design, JWT authentication, OAuth 2.0 |
| **AI & Agentic** | OpenAI Agents SDK, Chainlit, Groq AI, Google Gemini, Claude, n8n workflow automation |
| **Cloud & DevOps** | Google Cloud Run, Docker, CI/CD, Vercel, Hugging Face |
| **CMS & Auth** | Sanity CMS, Clerk |
| **3D** | Canvas API (dependency-free wireframe renderer) |
| **Convex** | Serverless DB + functions + auth + realtime (this portfolio) |
| **Email** | Resend (OTP + contact notifications) |
| **Build** | Vite 7 + esbuild (manual chunk splitting) |
| **PDF** | jsPDF (client-side CV generation) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ContactForm.tsx        # Contact form with honeypot + Resend
│   ├── RequireAuth.tsx        # Auth guard — redirects unauthenticated users
│   ├── Scene3D.tsx            # Canvas-based 3D robot head
│   ├── TiltCard.tsx           # Subtle 3D tilt effect wrapper
│   └── ui/                    # shadcn/ui components
├── convex/
│   ├── auth.config.ts         # Auth provider configuration
│   ├── auth.ts                # Auth providers (Email OTP)
│   ├── auth/
│   │   └── emailOtp.ts        # Email OTP with Resend + whitelist
│   ├── http.ts                # HTTP routes for auth callbacks
│   ├── messages.ts            # Messages query/mutation
│   ├── schema.ts              # Database schema
│   ├── sendMessage.ts         # Contact form action
│   └── users.ts               # User query helper
├── data/
│   └── portfolio.ts           # All portfolio content (single source of truth)
├── hooks/
│   ├── use-auth.ts            # Auth hook
│   └── use-mobile.ts          # Mobile detection
├── lib/
│   └── utils.ts               # Utility functions (cn)
├── pages/
│   ├── Auth.tsx               # Login page (email OTP)
│   ├── Dashboard.tsx          # Owner inbox dashboard
│   ├── Landing.tsx            # Main portfolio page
│   └── NotFound.tsx           # 404 page
├── index.css                  # Global styles + Tailwind theme
├── instrumentation.tsx        # Error boundary + monitoring
└── main.tsx                   # App entrypoint + providers
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- **Convex account** (free tier) — [convex.dev](https://convex.dev)
- **Resend account** (free tier: 100 emails/day) — [resend.com](https://resend.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/afaqulislam/minimalist-portfolio-freebuff.git
cd minimalist-portfolio-freebuff

# Install dependencies
bun install

# Initialize Convex (first time only)
bunx convex dev

# In a separate terminal, start the dev server
bun dev
```

Open [http://localhost:5173](http://localhost:5173) to view the portfolio.

### Environment Variables

Set these in your **Convex dashboard** or hosting platform's Keys tab:

| Variable | Required | Purpose |
|----------|----------|---------|
| `RESEND_API_KEY` | Yes | Sends OTP login emails + contact notifications |
| `RESEND_FROM_EMAIL` | Yes | Sender email (use `onboarding@resend.dev` for free tier) |

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start Vite development server |
| `bun run build` | Typecheck + production build |
| `bun tsc -b --noEmit` | Typecheck only |
| `bunx convex dev --once` | Push Convex functions + run codegen |
| `bunx convex dev` | Start Convex in watch mode |

### Deployment

This project is deployed on **Freebuff**:

1. Push to GitHub
2. Connect the repo to Freebuff
3. Click **Publish**

---

## 📸 Screenshots

See [SCREENSHOTS.md](SCREENSHOTS.md) for the complete screenshot checklist with viewport sizes and descriptions.

| Screenshot | Viewport | Description |
|-----------|----------|-------------|
| Desktop hero | 1440px | Full landing page with 3D scene |
| Desktop projects | 1440px | Project cards with tech tags |
| Desktop contact | 1440px | Contact form and details |
| Mobile landing | 375px | Responsive layout |
| Mobile navigation | 375px | Wrapped nav links |
| Mobile contact | 375px | Stacked form fields |

---

## 📄 Documentation

| Document | Description |
|----------|-------------|
| [REPORT.md](REPORT.md) | Full internship report with features, architecture, accessibility, SEO, and testing |
| [SCREENSHOTS.md](SCREENSHOTS.md) | Screenshot checklist for submission |
| [README.md](README.md) | This file — project overview and setup guide |

---

## 🔒 Security

| Measure | Implementation |
|---------|----------------|
| Email Whitelist | Only owner email can log in |
| Guest Login | Disabled — no anonymous auth |
| Server-Side Secrets | All API keys via `process.env` in `"use node"` functions |
| Honeypot Protection | Hidden field catches automated bots |
| Rate Limiting | 5 submissions per hour per email |
| HTML Escaping | User input escaped before email interpolation |
| Origin Validation | postMessage whitelist for iframe communication |

---

## 📬 Contact

| Channel | Link |
|---------|------|
| 📧 **Email** | [afaqulislam707@gmail.com](mailto:afaqulislam707@gmail.com) |
| 💼 **LinkedIn** | [linkedin.com/in/afaqulislam](https://www.linkedin.com/in/afaqulislam) |
| 🐙 **GitHub** | [github.com/afaqulislam](https://github.com/afaqulislam) |
| 🐦 **X (Twitter)** | [@afaqulislam708](https://x.com/afaqulislam708) |
| 🔗 **Linktree** | [linktr.ee/afaqulislam](https://linktr.ee/afaqulislam) |

---

<p align="center">
  <i>Built with ❤️ by Afaq Ul Islam — Aptura Tech Solutions Batch 03</i>
</p>
