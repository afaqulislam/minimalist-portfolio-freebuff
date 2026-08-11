import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "react-router";

import { ContactForm } from "@/components/ContactForm";
import { Wireframe3D } from "@/components/Wireframe3D";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  education,
  experience,
  profile,
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
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {index} — {label}
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {aside}
    </div>
  );
}

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
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

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* ---------------------------------------------------------- */}
      {/* Header                                                      */}
      {/* ---------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md print:hidden">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a
            href="#top"
            className="flex items-baseline gap-2.5 font-display text-sm font-semibold tracking-tight"
          >
            {profile.initials}
            <span className="text-muted-foreground">/</span>
            <span className="font-sans text-xs font-medium text-muted-foreground">
              {profile.name}
            </span>
          </a>
          <nav className="flex items-center gap-6 text-sm">
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
          <div className="grid items-center gap-16 py-24 sm:py-32 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  <AvailabilityDot />
                  {profile.availability}
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="mt-8 font-display text-[clamp(2.75rem,7.5vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
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
                <p className="mt-6 max-w-xl text-[15px] leading-7 text-muted-foreground">
                  {profile.summary}
                </p>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Button asChild className="cursor-pointer rounded-none bg-foreground text-background hover:bg-foreground/90">
                    <a href="#resume">View resume</a>
                  </Button>
                  <Button asChild variant="outline" className="cursor-pointer rounded-none">
                    <a href="#contact">Get in touch</a>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
                  <span>{profile.location}</span>
                  <span className="hidden text-border sm:inline">·</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {profile.email}
                  </a>
                  <span className="hidden text-border sm:inline">·</span>
                  <span>// {profile.stack.join(" · ")}</span>
                </div>
              </Reveal>
            </div>

            {/* 3D scene */}
            <Reveal delay={0.2} className="lg:justify-self-end">
              <div className="relative w-full max-w-md lg:w-[420px]">
                <div className="group relative aspect-square overflow-hidden rounded-none border border-border bg-card">
                  <Wireframe3D className="absolute inset-0" />
                  <span className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground">
                    Scene_01 — wireframe
                  </span>
                  <span className="pointer-events-none absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Move cursor to tilt
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  <span>Icosahedron</span>
                  <span>{profile.initials} · 2026</span>
                </div>
              </div>
            </Reveal>
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
                    onClick={() => window.print()}
                  >
                    Download CV
                  </Button>
                }
              />
            </Reveal>

            {/* Experience */}
            <div className="mt-16">
              {experience.map((job, i) => (
                <Reveal key={job.company} delay={i * 0.05}>
                  <article
                    className={`grid gap-4 py-12 md:grid-cols-[190px_1fr] md:gap-10 ${
                      i > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">
                        {job.period}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {job.company}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-medium tracking-tight">
                        {job.role}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                        {job.summary}
                      </p>
                      <ul className="mt-6 max-w-2xl space-y-3">
                        {job.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm leading-6 text-foreground/80"
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

            {/* Skills */}
            <div className="mt-6 border-t border-border pt-16">
              <Reveal>
                <SubLabel>Skills</SubLabel>
              </Reveal>
              <div className="mt-10 grid gap-x-12 gap-y-12 sm:grid-cols-2">
                {skills.map((group, i) => (
                  <Reveal key={group.label} delay={i * 0.05}>
                    <div className="flex flex-col gap-3">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {group.label}
                      </p>
                      <p className="text-[15px] leading-8 text-foreground">
                        {group.items.map((item, idx) => (
                          <span key={item}>
                            {idx > 0 && (
                              <span className="mx-2 text-foreground/30">
                                ·
                              </span>
                            )}
                            {item}
                          </span>
                        ))}
                      </p>
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
                <div className="mt-10">
                  {education.map((item, i) => (
                    <Reveal key={item.school} delay={i * 0.05}>
                      <div
                        className={`flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between ${
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

            <Reveal>
              <p className="mt-10 text-sm text-muted-foreground">
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

            <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
              {/* Contact details */}
              <Reveal>
                <div className="flex flex-col gap-12">
                  <div>
                    <SubLabel>Email</SubLabel>
                    <a
                      href={`mailto:${profile.email}`}
                      className="mt-3 block font-display text-xl font-medium tracking-tight underline-offset-4 transition-colors hover:text-muted-foreground hover:underline sm:text-2xl"
                    >
                      {profile.email}
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

                  <div>
                    <SubLabel>Elsewhere</SubLabel>
                    <ul className="mt-4 space-y-1">
                      {profile.socials.map((social) => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-baseline gap-3 py-1 text-sm text-foreground/80 transition-colors hover:text-foreground"
                          >
                            <span className="font-mono text-xs text-muted-foreground transition-transform duration-200 group-hover:translate-x-1">
                              →
                            </span>
                            {social.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border pt-8">
                    <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      <AvailabilityDot />
                      {profile.availability}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Contact form */}
              <Reveal delay={0.1}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------- */}
      {/* Footer                                                      */}
      {/* ---------------------------------------------------------- */}
      <footer className="border-t border-border print:hidden">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-display text-sm font-semibold tracking-tight">
              {profile.initials}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              © {year} {profile.name}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Elsewhere
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
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
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Site
            </p>
            <div className="flex flex-col items-start gap-2 text-sm">
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
