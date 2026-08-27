import { motion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "react-router";

import { ContactForm } from "@/components/ContactForm";
import { Scene3D } from "@/components/Scene3D";
import { TiltCard } from "@/components/TiltCard";
import { Button } from "@/components/ui/button";
import { downloadCvPdf } from "@/lib/generateCv";
import { useAuth } from "@/hooks/use-auth";
import {
  achievements,
  capabilities,
  education,
  experience,
  metrics,
  process,
  profile,
  projects,
  skills,
} from "@/data/portfolio";

/* ------------------------------------------------------------------ */
/* Motion helpers                                                      */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  index,
  label,
  title,
  description,
  aside,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {index} — {label}
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto max-w-xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {aside && <div className="flex justify-center">{aside}</div>}
    </div>
  );
}

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-center font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
      {children}
    </p>
  );
}

function AvailabilityDot() {
  return (
    <span className="relative flex size-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-25" />
      <span className="relative inline-flex size-2 rounded-full bg-foreground" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Landing                                                             */
/* ------------------------------------------------------------------ */

const MARQUEE_ITEMS = [
  ...profile.stack,
  "SaaS",
  "AI Agents",
  "REST APIs",
  "Pydantic",
  "Vercel",
];

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const year = new Date().getFullYear();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Skip to content link for keyboard users */}
      <a
        href="#resume"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background focus:outline-none"
      >
        Skip to content
      </a>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-foreground print:hidden"
      />

      {/* ---------------------------------------------------------- */}
      {/* Header                                                      */}
      {/* ---------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md print:hidden">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-4 text-center">
          <a
            href="#top"
            className="flex w-fit items-baseline justify-center gap-2.5 font-display text-sm font-semibold tracking-tight"
            aria-label="Afaq Ul Islam — back to top"
          >
            {profile.initials}
            <span className="text-muted-foreground">/</span>
            <span className="font-sans text-xs font-medium text-muted-foreground">
              {profile.name}
            </span>
          </a>
          <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <a
              href="#resume"
              className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Contact
            </a>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Inbox
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main id="top" className="relative">
        {/* Dot-grid backdrop, faded toward the bottom */}
        <div
          aria-hidden
          className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        />

        {/* -------------------------------------------------------- */}
        {/* Hero                                                      */}
        {/* -------------------------------------------------------- */}
        <section className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col items-center gap-16 py-20 text-center sm:py-28">
            <div className="flex w-full flex-col items-center">
              <Reveal>
                <p className="flex items-center justify-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  <AvailabilityDot />
                  {profile.availability}
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="mt-8 font-display text-[clamp(2.25rem,8vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] [overflow-wrap:anywhere]">
                  {profile.name}
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-6 text-xl font-medium leading-snug text-foreground sm:text-2xl">
                  {profile.role}
                  <span className="text-muted-foreground"> — </span>
                  <span className="font-normal text-muted-foreground">
                    {profile.tagline}
                  </span>
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-muted-foreground">
                  {profile.summary}
                </p>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
                  <Button
                    asChild
                    className="w-full cursor-pointer rounded-none bg-foreground text-background hover:bg-foreground/90"
                  >
                    <a href="#resume">View resume</a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full cursor-pointer rounded-none"
                  >
                    <a href="#contact">Get in touch</a>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mt-12 flex w-full max-w-md flex-col items-center gap-2 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
                  <span>{profile.location}</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="w-fit underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {profile.email}
                  </a>
                  <span>// {profile.stack.join(" · ")}</span>
                </div>
              </Reveal>
            </div>

            {/* 3D scene — robot head */}
            <Reveal delay={0.2}>
              <div className="relative mx-auto w-full max-w-md">
                <div className="group relative aspect-square overflow-hidden rounded-none border border-border bg-card">
                  <Scene3D className="absolute inset-0" />
                  <span className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground">
                    Scene_01 — robot
                  </span>
                  <span className="pointer-events-none absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Frontend Engineering
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-1 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  <span>Frontend Engineer Bot · Low-poly 3D</span>
                  <span>
                    Frontend engineering — fast, accessible, pixel-perfect
                    interfaces.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Tech marquee                                               */}
        {/* -------------------------------------------------------- */}
        <div
          aria-hidden
          className="overflow-hidden border-y border-border py-3.5 print:hidden"
        >
          <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-10">
                <span>{item}</span>
                <span className="text-foreground/25">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* Impact metrics                                             */}
        {/* -------------------------------------------------------- */}
        <section className="border-b border-border print:hidden">
          <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border lg:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col items-center gap-2.5 bg-background px-4 py-8 text-center sm:py-10"
                >
                  <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {metric.value}
                  </p>
                  <p className="max-w-[190px] text-xs leading-5 text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Resume                                                     */}
        {/* -------------------------------------------------------- */}
        <section id="resume" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
            <Reveal>
              <SectionHeading
                index="01"
                label="Resume"
                title="Experience"
                description="Selected work building SaaS and AI products. Full work history and references are available on request."
                aside={
                  <Button
                    variant="outline"
                    className="cursor-pointer rounded-none print:hidden"
                    onClick={() => downloadCvPdf()}
                  >
                    Download CV (PDF)
                  </Button>
                }
              />
            </Reveal>

            {/* Capabilities — what clients can hire you for */}
            <div className="mt-16 flex flex-col border-t border-border">
              {capabilities.map((cap, i) => (
                <Reveal key={cap.title} delay={i * 0.05}>
                  <div className="flex flex-col items-center gap-3 border-b border-border py-8 text-center">
                    <p className="font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </p>
                    <h3 className="font-display text-xl font-medium tracking-tight">
                      {cap.title}
                    </h3>
                    <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground">
                      {cap.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* How a senior engineer works */}
            <div className="mt-16 border-t border-border pt-16">
              <Reveal>
                <SubLabel>How I work</SubLabel>
              </Reveal>
              <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
                {process.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col items-center gap-3 bg-background px-6 py-8 text-center"
                  >
                    <p className="font-mono text-xs text-muted-foreground">
                      {item.step}
                    </p>
                    <h3 className="font-display text-base font-medium tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mt-16">
              {experience.map((job, i) => (
                <Reveal key={job.company} delay={i * 0.05}>
                  <article
                    className={`flex flex-col items-center gap-4 py-12 text-center ${
                      i > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
                      <p className="font-mono text-xs text-muted-foreground">
                        {job.period}
                      </p>
                      <span className="hidden size-1 rounded-full bg-foreground/40 sm:block" />
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {job.company}
                      </p>
                    </div>
                    <div className="flex w-full flex-col items-center">
                      <h3 className="mt-2 font-display text-xl font-medium tracking-tight">
                        {job.role}
                      </h3>
                      <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                        {job.summary}
                      </p>
                      <ul className="mx-auto mt-6 max-w-2xl space-y-3">
                        {job.points.map((point) => (
                          <li
                            key={point}
                            className="flex justify-center gap-3 text-sm leading-6 text-foreground/80"
                          >
                            <span className="mt-[9px] size-1 shrink-0 rounded-full bg-foreground/60" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Selected Projects */}
            <div className="mt-6 border-t border-border pt-16">
              <Reveal>
                <SubLabel>Selected Projects</SubLabel>
              </Reveal>
              <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
                {projects.map((project, i) => (
                  <Reveal key={project.name} delay={i * 0.05} className="h-full">
                    <article className="flex h-full flex-col border border-border bg-background p-7 text-center transition-colors hover:border-foreground/50">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        Project_0{i + 1}
                      </p>
                      <h3 className="mt-4 font-display text-lg font-medium tracking-tight">
                        {project.name}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6 border-t border-border pt-16">
              <Reveal>
                <SubLabel>Skills</SubLabel>
              </Reveal>
              <div className="mx-auto mt-10 grid w-full max-w-4xl grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
                {skills.map((group, i) => (
                  <Reveal key={group.label} delay={i * 0.05} className="h-full">
                    <div className="flex h-full min-w-0 flex-col items-center justify-center gap-4 bg-background px-4 py-8 text-center sm:px-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {group.label}
                      </p>
                      <div className="flex min-w-0 flex-wrap items-center justify-center gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/80"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Education — hidden until data exists */}
            {education.length > 0 && (
              <div className="mt-16 border-t border-border pt-16">
                <Reveal>
                  <SubLabel>Education</SubLabel>
                </Reveal>
                <div className="mt-10 flex flex-col items-center">
                  {education.map((item, i) => (
                    <Reveal key={item.school} delay={i * 0.05}>
                      <div
                        className={`flex flex-col items-center gap-2 py-6 text-center ${
                          i > 0 ? "border-t border-border" : ""
                        }`}
                      >
                        <div>
                          <p className="text-sm font-medium">{item.school}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {item.degree}
                          </p>
                        </div>
                        <p className="font-mono text-xs text-muted-foreground">
                          {item.period}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            <div className="mt-16 border-t border-border pt-16">
              <Reveal>
                <SubLabel>Achievements</SubLabel>
              </Reveal>
              <div className="mt-10 flex flex-col items-center">
                {achievements.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.05}>
                    <div
                      className={`flex flex-col items-center gap-2 py-6 text-center ${
                        i > 0 ? "border-t border-border" : ""
                      }`}
                    >
                      <h3 className="font-display text-lg font-medium tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal>
              <p className="mt-10 text-center text-sm text-muted-foreground">
                Full CV and references —{" "}
                <a
                  href={`mailto:${profile.email}?subject=CV%20request`}
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  available on request
                </a>
                .
              </p>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Contact                                                    */}
        {/* -------------------------------------------------------- */}
        <section id="contact" className="scroll-mt-20 border-t border-border print:hidden">
          <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
            <Reveal>
              <SectionHeading
                index="02"
                label="Contact"
                title="Let's build something."
                description="Have a SaaS product, an AI feature, or a full build in mind? Send a message and I'll get back to you within one business day."
              />
            </Reveal>

            <div className="mt-16 flex flex-col items-center gap-16">
              {/* Contact details */}
              <Reveal>
                <div className="flex flex-col items-center gap-12 text-center">
                  <div>
                    <SubLabel>Email</SubLabel>
                    <a
                      href={`mailto:${profile.email}`}
                      className="mt-3 block font-display text-lg font-medium tracking-tight underline-offset-4 transition-colors hover:text-muted-foreground hover:underline break-words sm:text-2xl"
                    >
                      {profile.email}
                    </a>
                  </div>

                  <div>
                    <SubLabel>Phone</SubLabel>
                    <a
                      href={`tel:${profile.phone}`}
                      className="mt-3 block font-display text-lg font-medium tracking-tight underline-offset-4 transition-colors hover:text-muted-foreground hover:underline break-words sm:text-2xl"
                    >
                      {profile.phone}
                    </a>
                  </div>

                  <div>
                    <SubLabel>Location</SubLabel>
                    <p className="mt-3 text-sm leading-6 text-foreground/80">
                      {profile.location}
                      <br />
                      <span className="text-muted-foreground">
                        Working remotely with clients worldwide.
                      </span>
                    </p>
                  </div>

                  <div className="w-full max-w-md border-t border-border pt-8">
                    <p className="flex items-center justify-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      <AvailabilityDot />
                      {profile.availability}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Contact form — subtle 3D tilt on hover */}
              <Reveal delay={0.1}>
                <TiltCard>
                  <ContactForm />
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------- */}
      {/* Footer                                                      */}
      {/* ---------------------------------------------------------- */}
      <footer className="border-t border-border print:hidden">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 py-12 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="font-display text-sm font-semibold tracking-tight">
              {profile.initials}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              © {year} {profile.name}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Elsewhere
            </p>
            <nav aria-label="Social links" className="flex flex-col items-center gap-2">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {social.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Site
            </p>
            <nav aria-label="Site links" className="flex flex-col items-center gap-2 text-sm">
              <a
                href="#top"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Back to top ↑
              </a>
              <span className="font-mono text-xs text-muted-foreground">
                React · Convex · Canvas
              </span>
              <Link
                to="/dashboard"
                className="font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {isAuthenticated ? "Inbox" : "Owner login"}
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
