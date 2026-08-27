# Aptura Tech Solutions — Batch 03

## Week 1 — Task 1: Personal Portfolio Website

**Student:** Afaq Ul Islam  
**Email:** afaqulislam707@gmail.com  
**Date:** August 27, 2026  
**Live Demo:** [https://afaqulislam.freebuff.app/](https://afaqulislam.freebuff.app/)  
**Repository:** [https://github.com/afaqulislam/minimalist-portfolio-freebuff](https://github.com/afaqulislam/minimalist-portfolio-freebuff)

---

## 1. Project Overview

This portfolio is a full-stack web application built to showcase my work, resume, skills, and projects to freelance clients and recruiters. It is not a static template — it is a production application with authentication, a backend database, email notifications, an interactive 3D scene, and a downloadable CV.

The design follows a **Minimalism theme** — clean, spacious, restrained, with a near-monochrome palette, precise alignment, and intentional whitespace.

---

## 2. Objective

Build a professional personal portfolio website that:

- Presents my resume, projects, skills, and experience in a visually compelling way
- Includes a functional contact form with real-time notifications
- Is fully responsive across mobile, tablet, and desktop
- Is accessible, SEO-optimized, and performant
- Demonstrates proficiency with modern web technologies

---

## 3. Technologies Used

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Frontend** | React 19, Next.js (14, 16), TypeScript | Component-based UI with type safety |
| **Styling** | Tailwind CSS v4, Framer Motion | Utility-first styling and animations |
| **Build** | Vite 7 | Fast dev server and optimized production builds |
| **Backend** | FastAPI, Node.js, REST API, JWT, OAuth 2.0 | Server-side logic and API design |
| **AI & Agentic** | OpenAI Agents SDK, Chainlit, Groq AI, Gemini, Claude, n8n | Multi-agent systems and AI integrations |
| **Cloud & DevOps** | Google Cloud Run, Docker, CI/CD, Vercel, Hugging Face | Deployment and containerization |
| **CMS & Auth** | Sanity CMS, Clerk | Content management and auth |
| **Convex** | Serverless DB + functions + auth + realtime | This portfolio's backend |
| **Email** | Resend | OTP + contact form notifications |
| **3D Graphics** | Canvas API (dependency-free) | Interactive low-poly robot head scene |
| **UI Components** | shadcn/ui + Radix UI | Accessible, composable UI primitives |
| **PDF Generation** | jsPDF | Client-side CV PDF generation |
| **Hosting** | Freebuff | Managed hosting with auto-deploy from GitHub |

---

## 4. Key Features

### 4.1 Landing Page
- **Hero section** with name, role, tagline, availability status, and call-to-action buttons
- **Interactive 3D robot scene** rendered on canvas with pointer-tracking parallax, depth-sorted wireframe edges, glowing visor eyes, and antenna
- **Tech marquee** — infinite horizontal scroll of technologies (React, Next.js, TypeScript, Python, FastAPI, OpenAI Agents SDK, Chainlit, n8n, Docker, Google Cloud Run, etc.)
- **Impact metrics** — key statistics (2+ years, 10+ projects, 70+ repos, top 10% GIAIC)
- **Capabilities section** — Full-Stack Web Development, AI & Agentic Development, Product & Technical Leadership, Cloud & Deployment
- **Process section** — how I work (Discover, Architect, Build & iterate, Deploy & support)
- **Work experience** — 3 roles: Neofyx COO, CodeAlpha Frontend Intern, Freelance Developer
- **Selected projects** — 10 featured projects with tech stack tags
- **Skills grid** — 4 categorized groups (Languages, Frontend, Backend & AI, Cloud & Tools)
- **Education** — 4 entries (University of Karachi, GIAIC, Aisha Bawany College, Sadiq School)
- **Achievements** — Silver Tier Winner, Startup Challenge Winner
- **Contact section** — email, phone, location, availability, and functional contact form

### 4.2 Contact Form
- Client-side validation with required fields
- Honeypot spam protection (hidden field catches automated bots)
- Server-side rate limiting (5 submissions per hour per email)
- HTML escaping to prevent injection
- Email notification sent to portfolio owner via Resend
- Toast notification on success with clear confirmation message
- Post-submission confirmation screen

### 4.3 Owner Login (Email OTP)
- Email-only authentication (no passwords)
- Whitelist-restricted: only the owner's email can log in
- Guest login disabled for security
- Clean error messages for unauthorized access attempts

### 4.4 Owner Inbox Dashboard
- Real-time display of all contact form submissions
- Each message shows sender name, company, email, date, and message content
- Protected by RequireAuth wrapper (redirects to login if not authenticated)
- "Back to portfolio" and "Sign out" buttons

### 4.5 Downloadable CV
- Client-side PDF generation using jsPDF
- Always reflects the latest portfolio data
- Clean, minimal, professional A4 layout matching the site's monochrome aesthetic

---

## 5. Design Approach

### Minimalism Theme
- **Near-monochrome palette** — foreground/background with subtle grays, no bright accent colors
- **Centered layout** — every section, text block, and component is centered for consistency
- **No parallel text** — text and buttons stack vertically; nothing is placed side-by-side
- **Typography-first** — strong hierarchy using Space Grotesk for display, Inter for body, JetBrains Mono for code/labels
- **Subtle dividers** — 1px border-based separators instead of heavy visual breaks
- **Intentional whitespace** — generous padding and margins throughout

### Visual Identity
- Clean SVG favicon (dark "A" monogram on rounded square)
- Scroll progress bar at the top
- Dot-grid texture backdrop in the hero section
- Monochrome wireframe 3D robot with depth-based opacity

---

## 6. Responsive Design

The portfolio is tested and verified across the following viewports:

| Viewport | Width | Device |
|----------|-------|--------|
| Mobile S | 320px | Small smartphones |
| Mobile M | 375px | Standard smartphones |
| Tablet | 768px | Tablets, large phones landscape |
| Desktop S | 1024px | Small desktops, tablets landscape |
| Desktop | 1440px | Standard desktops |
| Desktop XL | 1920px+ | Large monitors |

**Responsive behaviors:**
- Navigation wraps gracefully on smaller screens
- Metric grid collapses from 4 columns to 2 columns
- Project grid collapses from 2 columns to 1 column
- Skill grid collapses from 2 columns to 1 column
- Font sizes scale using `clamp()` for fluid typography
- Buttons stack vertically on mobile, side-by-side on desktop
- 3D scene scales proportionally within its container
- Contact form maintains readability at all sizes
- Dashboard messages container adjusts width

---

## 7. Accessibility

| Check | Implementation |
|-------|---------------|
| Skip to content | Skip link visible on keyboard focus, jumps to main content |
| Semantic HTML | `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>` used throughout |
| Heading hierarchy | Logical h1 → h2 → h3 nesting, no skipped levels |
| ARIA labels | Navigation landmarks, form labels, image alt text, social links |
| Keyboard navigation | All interactive elements focusable and operable via keyboard |
| Focus states | Visible focus indicators on all buttons and links |
| Form labels | All form fields have associated `<label>` elements with `htmlFor` |
| Color contrast | Near-monochrome palette ensures high contrast in both light and dark modes |
| Reduced motion | `prefers-reduced-motion: reduce` disables marquee animation, 3D rotation, and scroll animations |
| Screen reader | 3D scene has `role="img"` with descriptive `aria-label` |
| Print styles | Print media query strips animations and backgrounds for clean CV export |

---

## 8. SEO

| Element | Implementation |
|---------|---------------|
| Page title | "Afaq Ul Islam — Full-Stack & AI Developer Portfolio" |
| Meta description | Professional description with role, skills, and availability |
| Keywords | Developer-relevant keywords for search engines |
| Canonical URL | Points to the live deployment URL |
| Open Graph | Title, description, image, URL, site name for Facebook/LinkedIn sharing |
| Twitter Card | Summary large image card with creator handle |
| Robots | `index, follow` directive, disallows /dashboard and /auth |
| Sitemap | XML sitemap with the root URL |
| Favicon | SVG favicon with apple-touch-icon support |
| PWA manifest | Web manifest with name, description, icons, theme color |
| Theme color | `#0a0a0a` for browser chrome |
| Author | `<meta name="author">` tag |

---

## 9. Performance

| Optimization | Details |
|-------------|---------|
| **Code splitting** | React Router lazy loading for all page components |
| **Chunk splitting** | Manual Vite chunks: react-vendor, convex-vendor, radix-ui, framer-motion, charts, forms |
| **Font loading** | `preconnect` hints for Google Fonts, three fonts loaded (Inter, JetBrains Mono, Space Grotesk) |
| **3D scene optimization** | Pauses when off-screen (IntersectionObserver), pauses when tab is hidden, respects reduced motion |
| **Canvas DPR capping** | Device pixel ratio capped at 2 to prevent GPU overload on high-DPI screens |
| **Lazy route loading** | All pages wrapped in `<Suspense>` with loading fallback |
| **Minimal bundle** | 3D scene is dependency-free (no Three.js/R3F), uses raw Canvas API |
| **Build target** | `esnext` for modern browsers, esbuild minification |

---

## 10. Project Architecture

```
src/
├── components/
│   ├── ContactForm.tsx        # Contact form with honeypot + Resend
│   ├── RequireAuth.tsx        # Auth guard — redirects unauthenticated users
│   ├── Scene3D.tsx            # Canvas-based 3D robot head
│   ├── TiltCard.tsx           # Subtle 3D tilt effect wrapper
│   └── ui/                    # shadcn/ui component library
├── convex/
│   ├── auth.config.ts         # Convex auth provider configuration
│   ├── auth.ts                # Auth providers (Email OTP)
│   ├── auth/
│   │   └── emailOtp.ts        # Email OTP with Resend + whitelist
│   ├── http.ts                # HTTP routes for auth callbacks
│   ├── messages.ts            # Messages query/mutation (inbox)
│   ├── schema.ts              # Database schema
│   ├── sendMessage.ts         # Contact form action (email notification)
│   └── users.ts               # User query helper
├── data/
│   └── portfolio.ts           # Single source of truth for all content
├── hooks/
│   ├── use-auth.ts            # Auth hook
│   └── use-mobile.ts          # Mobile detection
├── lib/
│   └── utils.ts               # Utility functions (cn)
├── pages/
│   ├── Auth.tsx               # Login page (email OTP)
│   ├── Dashboard.tsx          # Owner inbox
│   ├── Landing.tsx            # Main portfolio page
│   └── NotFound.tsx           # 404 page
├── index.css                  # Global styles + Tailwind theme
├── instrumentation.tsx        # Error boundary + monitoring
└── main.tsx                   # App entrypoint + providers
```

**Data flow:**
1. Visitor views the portfolio (static content from `portfolio.ts`)
2. Visitor submits the contact form
3. `sendMessage` action validates, stores in Convex DB, sends email via Resend
4. Owner logs in via email OTP (verified against whitelist)
5. Owner views the inbox dashboard (real-time Convex query)

---

## 11. Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| **3D rendering without Three.js** | Built a custom canvas-based wireframe renderer with depth sorting, perspective projection, and pointer tracking — zero dependencies |
| **OTP email delivery** | Integrated Resend with free-tier compatible sender address (`onboarding@resend.dev`) |
| **Owner-only access** | Email whitelist in the OTP provider + guest login disabled + RequireAuth guard |
| **Spam protection** | Honeypot hidden field + server-side rate limiting (5/hour per email) |
| **Responsive 3D scene** | Canvas resizes with ResizeObserver, DPR capped at 2, scene pauses when off-screen |
| **CV PDF generation** | Client-side jsPDF generation from portfolio data — always up-to-date, no server dependency |
| **Security** | All API keys server-side only, postMessage origin validation, HTML escaping, no hardcoded secrets |
| **Performance** | Lazy route loading, manual chunk splitting, font preconnect, canvas intersection observer |

---

## 12. Testing

### Type Checking
- `tsc -b --noEmit` — passes with zero errors

### Build Verification
- `npm run build` (`tsc -b && vite build`) — completes successfully
- Production build generates optimized chunks with code splitting

### Responsive Testing
- Verified layouts at 320px, 375px, 768px, 1024px, and 1440px viewports
- Navigation wraps correctly on mobile
- Grids collapse from multi-column to single-column
- Font sizes scale with `clamp()` for fluid readability
- No horizontal overflow at any tested viewport

### Accessibility Testing
- Skip-to-content link appears on keyboard focus
- All form fields have associated labels
- Navigation landmarks are properly labeled
- 3D scene has appropriate ARIA attributes
- Reduced motion media query disables animations
- Color contrast meets WCAG AA standards in both light and dark modes

### Feature Testing
- Contact form submits successfully with validation
- Honeypot field silently drops bot submissions
- Owner login sends OTP email and verifies correctly
- Unauthorized emails receive a clean error message
- Dashboard displays messages in real-time
- CV PDF downloads with correct content
- 404 page displays with navigation back to portfolio

---

## 13. Screenshots

> Screenshots should be captured at the following viewports. See [SCREENSHOTS.md](SCREENSHOTS.md) for the complete checklist.

| Screenshot | Viewport | Description |
|-----------|----------|-------------|
| Desktop homepage | 1440px | Full landing page with hero, 3D scene, navigation |
| Desktop projects | 1440px | Projects section with tech stack tags |
| Desktop contact | 1440px | Contact section with form |
| Mobile homepage | 375px | Responsive hero and navigation |
| Mobile navigation | 375px | Wrapped navigation links |
| Mobile contact | 375px | Stacked contact form |

---

## 14. Live Demo

**URL:** [https://afaqulislam.freebuff.app/](https://afaqulislam.freebuff.app/)

---

## 15. GitHub Repository

**URL:** [https://github.com/afaqulislam/minimalist-portfolio-freebuff](https://github.com/afaqulislam/minimalist-portfolio-freebuff)

---

## 16. Conclusion

This portfolio demonstrates proficiency in modern full-stack web development using React, TypeScript, Tailwind CSS, and Convex. It goes beyond a static template by incorporating a real backend with authentication, database storage, email notifications, and interactive 3D graphics — all while maintaining a clean, minimalist design that prioritizes readability and user experience.

The project was built with production best practices in mind: type safety, security (email whitelisting, honeypot protection, server-side secrets, origin validation), accessibility (semantic HTML, ARIA labels, reduced motion support, keyboard navigation), SEO (meta tags, Open Graph, robots.txt, sitemap), and performance (code splitting, lazy loading, canvas optimization).

---

*Built by Afaq Ul Islam — Aptura Tech Solutions Batch 03*
