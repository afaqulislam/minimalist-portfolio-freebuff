# Afaq Ul Islam — Full-Stack & AI Engineer Portfolio

A minimalist, monochrome 3D portfolio for freelance clients. Built as a full-stack app: the public portfolio (hero, impact metrics, resume, projects, skills, contact) plus a protected owner inbox that receives contact-form submissions by email.

**Live demo:** https://afaqulislam.vercel.app

---

## ✨ Features

- **Landing page** (`/`) — hero with an interactive low-poly 3D robot scene, impact metrics, tech marquee, capabilities, "How I work" process, experience, project cards with tech stacks, skills, education, achievements, and a contact section.
- **Download CV** — generates a clean, print-ready `Afaq_Ul_Islam_CV.pdf` client-side from the same data that drives the site (`src/lib/generateCv.ts`).
- **Contact form** (`/#contact`) — validated server-side, spam-protected (honeypot), stored in Convex, and forwarded to the owner's email via the built-in Vly email integration.
- **Owner inbox** (`/dashboard`) — email-OTP sign-in, protected route, and a message list that only the owner's verified email can read.
- **Fully responsive** — every section is centered and reflows cleanly from mobile to desktop.
- **Light + dark mode** via the shadcn/ui token system.

## 🧱 Tech Stack

| Layer        | Tech                                                        |
| ------------ | ----------------------------------------------------------- |
| Frontend     | React 19, TypeScript, Vite                                  |
| Routing      | React Router v7                                             |
| Styling      | Tailwind CSS v4, shadcn/ui, Framer Motion                   |
| 3D           | Three.js (interactive robot scene)                          |
| Backend/DB   | Convex (queries, mutations, actions)                        |
| Auth         | Convex Auth — email OTP + anonymous                         |
| Email        | Vly email integration (no external provider needed)         |
| PDF          | jsPDF (client-side CV generation)                           |
| Package mgr  | Bun                                                        |

## 📁 Project Structure

```
src/
├── components/        # UI components (ContactForm, Scene3D, TiltCard, shadcn/ui)
├── convex/            # Backend: schema, auth, messages, sendMessage action
├── data/portfolio.ts  # Single source of truth for ALL portfolio content
├── lib/               # generateCv.ts (PDF), vly-integrations.ts
├── pages/             # Landing.tsx, Auth.tsx, Dashboard.tsx, NotFound.tsx
├── hooks/             # use-auth, use-mobile
├── index.css          # Theme tokens (monochrome minimal palette)
└── main.tsx           # Router + app bootstrap
```

**Content lives in one place:** edit `src/data/portfolio.ts` (profile, experience, projects, skills, achievements, education, socials) and the site, CV, and contact form all update together.

## 🚀 Getting Started

```bash
bun install          # install dependencies
bunx convex dev      # link/start the Convex backend (regenerates src/convex/_generated)
bun dev              # start the Vite dev server
```

The dev server runs on http://localhost:5173. The Convex dashboard link is printed by `convex dev`.

### Scripts

| Command              | Purpose                              |
| -------------------- | ------------------------------------ |
| `bun dev`            | Start the Vite dev server            |
| `bun run build`      | Typecheck + production build         |
| `bunx tsc -b --noEmit` | Typecheck only                     |
| `bunx convex dev --once` | Push Convex functions + codegen  |

## 🔐 Environment Variables

No `.env` file is committed — keys are managed through the platform's Keys/API keys UI (or your hosting provider's env settings). Never commit real secrets.

| Variable                | Where it's used                       | Required |
| ----------------------- | ------------------------------------- | -------- |
| `VITE_CONVEX_URL`       | Frontend Convex client (deployment URL) | Yes — set on Vercel for production |
| `CONVEX_DEPLOYMENT`     | `convex` CLI target for deploy/push   | Yes (set by `convex dev`) |
| `VLY_INTEGRATION_KEY`   | Contact-form email notifications (`src/convex/sendMessage.ts`) | Optional — messages still store without it |
| `VLY_APP_NAME`          | App name shown in OTP emails          | Optional |
| `FB_EMAIL_API_KEY`      | OTP sign-in emails (`src/convex/auth/emailOtp.ts`) | **Yes** — no key is hardcoded; without it OTP emails fail |
| `JWKS`, `JWT_PRIVATE_KEY`, `SITE_URL` | Convex Auth JWT signing  | Set by the platform |

## 🌍 Deploying to Vercel

The repo is deploy-ready:

1. Push this project to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the GitHub repo.
3. Vercel auto-detects Vite (build: `bun run build`, output: `dist`). If prompted, set the **Framework Preset** to *Vite* and the install command to `bun install`.
4. Add the production environment variables in **Project → Settings → Environment Variables**:
   - `VITE_CONVEX_URL` → your production Convex deployment URL (e.g. `https://<name>.convex.cloud`)
   - `VLY_INTEGRATION_KEY` → your Vly email key (for contact-form notifications)
   - `VLY_APP_NAME` → your app name
5. Deploy. `vercel.json` includes an SPA fallback rewrite so client-side routes (`/auth`, `/dashboard`) work on direct visits.

> **Important:** `src/convex/_generated/` (Convex's generated TypeScript types) is **committed to the repo** — it is not gitignored. Vercel's build runs `tsc` before bundling, so the generated files must be present. They are regenerated automatically whenever you run `bunx convex dev` or `bunx convex codegen`. After changing `src/convex/schema.ts`, regenerate them and commit the updated files:
>
> ```bash
> bunx convex dev --once   # regenerates src/convex/_generated
> ```

### Deploying the Convex backend

The database/functions run on Convex, not Vercel:

```bash
bunx convex deploy     # push functions + schema to the production deployment
```

`CONVEX_DEPLOYMENT` must point at your production deployment (see Convex dashboard → Deployments → Production).

## 🛡️ Security Notes

- **Server-side validation** on every contact submission (`src/convex/sendMessage.ts` **and** `src/convex/messages.ts`) — length, format, and field limits are enforced on the backend, not just the UI. The public mutation re-validates independently, so it can't be bypassed by calling it directly.
- **Spam honeypot** — a hidden form field (`website`) silently discards bot submissions without tipping them off.
- **Rate limiting** — max 5 submissions per hour per email address (`messages.by_email_created` index).
- **HTML-escaped emails** — user input is escaped before interpolation into the notification email HTML.
- **Owner-only inbox** — `api.messages.list` returns submissions only to the authenticated account whose verified email matches the owner's address (`profile.notifyEmail`).
- **OTP auth** — the dashboard uses email OTP (6-digit code, 15-minute expiry) via Convex Auth; the relay key comes from `FB_EMAIL_API_KEY`, never from source code.
- **Secrets** — `.env.local` and `.env` are gitignored, and no API keys are hardcoded anywhere in the repo. (`src/convex/_generated` is intentionally committed so Vercel builds can resolve Convex types — it contains only types/function references, no secrets.)

## 📬 Owner Inbox

1. Go to **Footer → Owner login** (or `/auth`).
2. Enter your email — a 6-digit OTP is sent to it.
3. After sign-in you land on `/dashboard`, where every contact-form submission is listed newest-first.
4. New inquiries are also emailed to `afaqulislam707@gmail.com` automatically.

## 🧑‍💻 Author

**Afaq Ul Islam** — Full-Stack & AI Engineer

- Email: [afaqulislam707@gmail.com](mailto:afaqulislam707@gmail.com)
- GitHub: [github.com/afaqulislam](https://github.com/afaqulislam)
- LinkedIn: [linkedin.com/in/afaqulislam](https://www.linkedin.com/in/afaqulislam)
