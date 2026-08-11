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
      initial={{ opacity: 0, y: 18 }}
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
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
        {index} — {label}
      </p>
      <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      )}
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
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a
            href="#top"
            className="flex items-baseline gap-2 font-mono text-sm tracking-tight"
          >
            <span className="font-medium">{profile.initials}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{profile.name}</span>
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <a
              href="#resume"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="text-muted-foreground transition-colors hover:text-foreground"
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

      <main id="top">
        {/* -------------------------------------------------------- */}
        {/* Hero                                                      */}
        {/* -------------------------------------------------------- */}
        <section className="mx-auto w-full max-w-6xl px-6">
          <div className="grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:py-32">
            <div>
              <Reveal>
                <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-30" />
                    <span className="relative inline-flex size-2 rounded-full bg-foreground" />
                  </span>
                  {profile.availability}
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="mt-8 text-5xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                  {profile.name}
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-5 text-xl font-normal leading-snug text-muted-foreground sm:text-2xl">
                  {profile.role} — {profile.tagline}
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
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
                  <a
                    href={`mailto:${profile.email}`}
                    className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {profile.email}
                  </a>
                  <span className="hidden text-border sm:inline">|</span>
                  <span>
                    // {profile.stack.join(" · ")}
                  </span>
                </div>
              </Reveal>
            </div>

            {/* 3D scene */}
            <Reveal delay={0.2} className="lg:justify-self-end">
              <div className="relative w-full max-w-md lg:w-[420px]">
                <div className="relative aspect-square overflow-hidden rounded-none border border-border bg-card">
                  <Wireframe3D className="absolute inset-0" />
                  <span className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Scene_01
                  </span>
                  <span className="pointer-events-none absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Canvas · WebGL-style
                  </span>
                </div>
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  Icosahedron — {profile.role}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Resume                                                     */}
        {/* -------------------------------------------------------- */}
        <section id="resume" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
            <Reveal>
              <SectionHeading
                index="01"
                label="Resume"
                title="Experience"
                description="A focused history of building software for clients and teams. References and full work samples are available on request."
              />
            </Reveal>

            {/* Experience */}
            <div className="mt-14">
              {experience.map((job, i) => (
                <Reveal key={job.company} delay={i * 0.05}>
                  <article
                    className={`grid gap-3 py-10 md:grid-cols-[190px_1fr] md:gap-10 ${
                      i > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">
                        {job.period}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium tracking-tight">
                        {job.role}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {job.company}
                      </p>
                      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                        {job.summary}
                      </p>
                      <ul className="mt-5 max-w-2xl space-y-2.5">
                        {job.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm leading-6 text-foreground/80"
                          >
                            <span className="mt-[11px] size-1 shrink-0 rounded-full bg-foreground/50" />
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
              <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
                {skills.map((group, i) => (
                  <Reveal key={group.label} delay={i * 0.05}>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        {group.label}
                      </p>
                      <p className="text-sm leading-7 text-foreground">
                        {group.items.join(" · ")}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mt-16 border-t border-border pt-16">
              <Reveal>
                <SubLabel>Education</SubLabel>
              </Reveal>
              <div className="mt-8">
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
              <Reveal>
                <p className="mt-8 text-sm text-muted-foreground">
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
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Contact                                                    */}
        {/* -------------------------------------------------------- */}
        <section id="contact" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
            <Reveal>
              <SectionHeading
                index="02"
                label="Contact"
                title="Let's build something."
                description="Have a project in mind, or just want to talk through an idea? Send a message and I'll get back to you within one business day."
              />
            </Reveal>

            <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
              {/* Contact details */}
              <Reveal>
                <div className="flex flex-col gap-10">
                  <div>
                    <SubLabel>Email</SubLabel>
                    <a
                      href={`mailto:${profile.email}`}
                      className="mt-3 block text-xl font-medium tracking-tight underline-offset-4 transition-colors hover:text-muted-foreground hover:underline sm:text-2xl"
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
                        Working across time zones, async-friendly.
                      </span>
                    </p>
                  </div>

                  <div>
                    <SubLabel>Elsewhere</SubLabel>
                    <ul className="mt-3 space-y-2">
                      {profile.socials.map((social) => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                          >
                            <span className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5">
                              →
                            </span>
                            {social.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border pt-6">
                    <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-30" />
                        <span className="relative inline-flex size-2 rounded-full bg-foreground" />
                      </span>
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
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-mono text-xs text-muted-foreground">
            <span>Built with React · Convex</span>
            <a
              href="#top"
              className="transition-colors hover:text-foreground"
            >
              Back to top ↑
            </a>
            <Link
              to="/dashboard"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {isAuthenticated ? "Inbox" : "Owner login"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
