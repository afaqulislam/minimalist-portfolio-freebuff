<p align="center">
  <img src="public/logo.svg" alt="Afaq Ul Islam" width="100" />
</p>

<h1 align="center">Afaq Ul Islam</h1>

<p align="center">
  <strong>Full-Stack & AI Engineer</strong><br/>
  Building production-grade SaaS products, AI-powered systems & automation workflows.
</p>

<p align="center">
  <a href="https://afaqulislam.freebuff.app/">
    <img src="https://img.shields.io/badge/Live-Portfolio-0a0a0a?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Portfolio" />
  </a>
  <a href="https://github.com/afaqulislam">
    <img src="https://img.shields.io/badge/GitHub-afaqulislam-181717?style=for-the-badge&logo=github" alt="GitHub" />
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

## 👋 About Me

I'm **Afaq Ul Islam** — a full-stack and AI engineer based in **Karachi, Pakistan**. I'm the **Co-Founder & COO at [Neofyx](https://github.com/afaqulislam)**, where I lead product engineering and client delivery for AI automation and SaaS products.

I specialize in building end-to-end web applications, AI-powered features, and automation systems that solve real-world problems. With 2+ years of professional and freelance experience, I've shipped 10+ projects ranging from SaaS platforms to multi-agent AI systems.

**What I do:**
- 🏗️ Full-stack web development with **React**, **Next.js**, **TypeScript**, and **FastAPI**
- 🤖 AI & automation engineering with **Gemini**, **Claude**, **OpenAI**, and **Groq** APIs
- 🚀 Product architecture — from concept to deployment on **Google Cloud Run** and modern hosting
- ⚡ Workflow automation with **n8n**, agentic systems, and multi-agent orchestration

---

## 🌐 Live Portfolio

> **[https://afaqulislam.freebuff.app/](https://afaqulislam.freebuff.app/)**

An interactive 3D portfolio with a minimalist monochrome theme, featuring an immersive robot scene, downloadable CV, contact form with real-time notifications, and a protected owner inbox.

---

## 🖥️ Portfolio — Project Deep Dive

This repository is the **source code for my personal developer portfolio** — a full-stack web application designed to showcase my work, resume, and skills to freelance clients and recruiters. It is **not** a static template — it is a production application with authentication, a backend database, email notifications, and an interactive 3D scene.

### ✨ Features

| Feature | Description |
|---------|-------------|
| **3D Interactive Scene** | A low-poly robot rendered in real-time using Three.js / React Three Fiber, symbolizing frontend engineering. Users can orbit and interact with the model. |
| **Minimalist Monochrome Design** | Clean, spacious layout with a near-monochrome palette, precise alignment, and intentional whitespace — following a strict Minimalism theme. |
| **Responsive Layout** | Fully responsive across mobile, tablet, and desktop. Every section is centered and properly aligned on all screen sizes. |
| **Downloadable CV (PDF)** | One-click CV download generated client-side using jsPDF — no server required. The CV mirrors the portfolio data and is always up to date. |
| **Contact Form** | A functional contact form with honeypot spam protection. Messages are stored in Convex DB and the owner receives an email notification via Resend. |
| **Owner Login (Email OTP)** | A secure, email-only authentication system. Only the whitelisted owner email (`afaqulislam707@gmail.com`) can log in — no passwords, no guest access. |
| **Owner Inbox Dashboard** | After logging in, the owner sees a dashboard with all contact form submissions in real time, powered by Convex's reactive database. |
| **Animated Marquee** | A scrolling tech-stack marquee strip with smooth CSS animations, showcasing the technologies I work with. |
| **Stats Section** | Key impact metrics (years of experience, projects shipped, AI models integrated, competitive ranking) displayed in a clean grid. |
| **Social Proof** | Awards, achievements, and competitive rankings are prominently displayed to build credibility with potential clients. |
| **PDF-Style Resume Section** | A structured resume section showing experience, projects, skills, education, and achievements — styled to look like a professional CV. |
| **Framer Motion Animations** | Smooth scroll-triggered animations, page transitions, and micro-interactions throughout the portfolio using Framer Motion. |
| **SEO Optimized** | Open Graph tags, Twitter cards, meta descriptions, canonical URLs, and semantic HTML for better search engine visibility. |
| **PWA Ready** | Web manifest with proper icons, theme color, and app metadata for a native-like experience on mobile devices. |
| **Fast Builds** | Optimized Vite build with manual chunk splitting (React, Radix UI, Framer Motion, Recharts) for fast loading and caching. |

### 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React + Vite)                 │
│                                                         │
│  Landing Page ──── 3D Scene (Three.js)                  │
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
│  Queries: messages.list, messages.get                    │
│  Mutations: messages.insert                              │
│  Actions: sendMessage (email notification via Resend)    │
│  Auth: Email OTP provider + Anonymous (disabled)         │
│  HTTP: Custom routes for auth callbacks                  │
└──────────────────────┬──────────────────────────────────┘
                       │ Resend API
┌──────────────────────▼──────────────────────────────────┐
│                   RESEND (Email)                         │
│                                                         │
│  OTP verification emails (owner login)                  │
│  Contact form notification emails (new inquiries)       │
└─────────────────────────────────────────────────────────┘
```

### 📁 Project Structure

```
src/
├── components/
│   ├── ContactForm.tsx        # Contact form with honeypot + Resend notification
│   ├── RequireAuth.tsx        # Auth guard — redirects to /auth if not signed in
│   ├── Scene3D.tsx            # Three.js / React Three Fiber 3D robot scene
│   ├── TiltCard.tsx           # Tilt-effect card wrapper
│   └── ui/                    # shadcn/ui components (button, card, input, etc.)
├── convex/
│   ├── auth.config.ts         # Convex auth provider configuration
│   ├── auth.ts                # Auth providers (Email OTP)
│   ├── auth/
│   │   └── emailOtp.ts        # Email OTP provider with Resend integration
│   ├── http.ts                # Custom HTTP routes for auth
│   ├── messages.ts            # Messages query/mutation (inbox)
│   ├── schema.ts              # Convex database schema
│   ├── sendMessage.ts         # Contact form action (sends email via Resend)
│   └── users.ts               # User query helper
├── data/
│   └── portfolio.ts           # All portfolio content (profile, experience, projects, skills)
├── hooks/
│   ├── use-auth.ts            # Auth hook (Convex Auth)
│   └── use-mobile.ts          # Mobile detection hook
├── lib/
│   └── utils.ts               # Utility functions (cn, etc.)
├── pages/
│   ├── Auth.tsx               # Login page (email OTP)
│   ├── Dashboard.tsx          # Owner inbox dashboard
│   ├── Landing.tsx            # Main portfolio page
│   └── NotFound.tsx           # 404 page
├── index.css                  # Global styles + Tailwind
├── instrumentation.tsx        # Error boundary + monitoring
└── main.tsx                   # App entrypoint + providers
```

### 🎨 Design Philosophy

- **Minimalism** — Clean, spacious, restrained. Near-monochrome palette with intentional whitespace.
- **Centered Everything** — Every section, text block, and component is centered for consistency across all screen sizes.
- **No Parallel Text** — Text and buttons are never placed side-by-side; everything stacks vertically for readability.
- **Typography-First** — Strong typographic hierarchy using `font-display` for headings and `font-mono` for labels/meta.
- **Subtle Motion** — Scroll-triggered Framer Motion animations that enhance without distracting.
- **Responsive by Default** — Mobile-first design that works perfectly from 320px to 4K.

### 🔒 Security

| Measure | Implementation |
|---------|----------------|
| **Email Whitelist** | Only the owner email can log in — all other emails are rejected |
| **No Guest Login** | Anonymous auth provider has been disabled |
| **Server-Side Secrets** | `RESEND_API_KEY` is only accessed in `"use node"` Convex functions — never exposed to the client |
| **Honeypot Spam Protection** | Hidden field in contact form catches automated bots |
| **HTML Escaping** | All user input is escaped before being interpolated into notification emails |
| **No Hardcoded Keys** | All API keys are read from environment variables via `process.env` |
| **Convex Auth** | Industry-standard email OTP with 15-minute expiry — no passwords stored |

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Framer Motion |
| **3D** | Three.js / React Three Fiber (interactive robot scene) |
| **Backend** | Convex (serverless DB + functions + auth + realtime) |
| **Email** | Resend (OTP login emails + contact form notifications) |
| **Auth** | Convex Auth — email OTP only (owner whitelist) |
| **Database** | Convex (serverless, real-time, type-safe) |
| **UI Components** | shadcn/ui + Radix UI primitives |
| **Build** | Vite 7 + esbuild (manual chunk splitting) |
| **Hosting** | Freebuff (managed hosting with auto-deploy) |
| **PDF Generation** | jsPDF (client-side CV download) |

---

## 📂 Featured Projects

### 🔴 CIRO AI — Multi-Agent Crisis Response System
> Built for AI Seekho Phase 2. Coordinated multiple AI agents to support crisis response workflows.
> `Python` `Multi-Agent AI` `Orchestration`

### 🌾 Kisaan Dost AI — Crop Disease Detector
> AI-powered crop disease detection for Pakistani farmers using Google Gemini Vision. **Silver Tier Winner at Google AI Seekho 2026.**
> `Google Gemini` `Python` `AI Vision`

### 👗 AURELIA — Luxury Fashion E-Commerce
> Full-stack luxury fashion platform built for Google Build with AI 2026. Deployed on Google Cloud Run.
> `Next.js` `TypeScript` `Google Cloud Run`

### 🧠 Personal AI Employee
> Agentic personal-automation system with persistent memory, tiered Gmail/WhatsApp/LinkedIn automation, and social-posting capabilities.
> `Python` `Qwen Code CLI` `Obsidian` `Automation`

---

## 🏆 Achievements

| Award | Description |
|-------|-------------|
| 🥈 **Silver Tier Winner** | Google AI Seekho 2026 — Kisaan Dost AI |
| 🏆 **Startup Challenge Winner** | Neofyx won a startup challenge competition |
| 📊 **Top 7% Ranked** | #21 of 319 participants in "Ramadan Prompting Nights" |
| 🎓 **Y Combinator Applied** | Applied to Y Combinator Startup School 2026 with Neofyx |

---

## 💼 Experience

### Co-Founder & COO — Neofyx
**2025 — Present** · Karachi, Pakistan

- Co-leading an AI automation and SaaS startup alongside CEO and CTO functions
- Driving product engineering as a hands-on full-stack and AI engineer
- Owning client and project delivery — scoping requirements and translating business needs into technical solutions

### Full-Stack & AI Engineer (Freelance)
**2024 — Present** · Remote

- Delivered website build-out for C.Ronaldo Sports on a Next.js stack
- Designed n8n automation workflows for AI-generated video content and multi-platform publishing
- Built multiple production web applications and AI-powered tools

---

## 🎓 Education

| Institution | Program | Status |
|------------|---------|--------|
| **University of Karachi** | BS Computational Mathematics | In Progress |
| **GIAIC** (Governor's Initiative for AI & Computing) | Agentic AI and Python Track | In Progress |

---

## 📊 Impact at a Glance

| Metric | Value |
|--------|-------|
| Years of Experience | 2+ |
| Projects Shipped | 10+ |
| AI Models Integrated | 5+ |
| Competitive Ranking | Top 7% |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- **Convex account** (free tier works) — [convex.dev](https://convex.dev)
- **Resend account** (free tier: 100 emails/day) — [resend.com](https://resend.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/afaqulislam/minimalist-portfolio-freebuff.git
cd minimalist-portfolio-freebuff

# Install dependencies
bun install

# Initialize Convex (first time only — creates your own Convex project)
bunx convex dev

# In a separate terminal, start the dev server
bun dev
```

Open [http://localhost:5173](http://localhost:5173) to view the portfolio.

### Environment Variables

Set these in your **Convex dashboard** or via the hosting platform's Keys tab:

| Variable | Required | Where to Get | Purpose |
|----------|----------|-------------|---------|
| `RESEND_API_KEY` | Yes | [resend.com/api-keys](https://resend.com/api-keys) | Sends OTP login emails + contact form notifications |
| `RESEND_FROM_EMAIL` | Yes | Use `onboarding@resend.dev` for free tier | Sender email address |

> ⚠️ **Do not commit API keys.** These are server-side only and read via `process.env` in Convex actions.

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start Vite development server |
| `bun run build` | Typecheck + production build (`tsc -b && vite build`) |
| `bun tsc -b --noEmit` | Typecheck only (no output) |
| `bunx convex dev --once` | Push Convex functions + run codegen |
| `bunx convex dev` | Start Convex in watch mode (interactive) |

### Deployment

This project is deployed on **Freebuff** (managed hosting). To deploy:

1. Push to GitHub
2. Connect the repo to Freebuff
3. Click **Publish**

Freebuff handles the build (`tsc -b && vite build`) and serves the app automatically.

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
  <i>Built with ❤️ by Afaq Ul Islam</i>
</p>
