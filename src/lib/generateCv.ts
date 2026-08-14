// ---------------------------------------------------------------------------
// CV PDF GENERATOR
// ---------------------------------------------------------------------------
// Builds a clean, minimal, professional A4 CV (matching the site's
// monochrome aesthetic) entirely from the portfolio data in
// src/data/portfolio.ts, and downloads it as a real .pdf file.
//
// If you later want to serve your own hand-made PDF instead, drop the file
// at public/cv.pdf and the landing page button can link straight to it.

import { jsPDF } from "jspdf";

import {
  achievements,
  capabilities,
  education,
  experience,
  profile,
  projects,
  skills,
} from "@/data/portfolio";

const PT_TO_MM = 0.3528;

/** A4 page geometry (mm). */
const W = 210;
const H = 297;
const MX = 17; // left/right margin
const TOP = 18; // top margin
const BOTTOM = 15; // bottom margin
const CW = W - MX * 2; // content width

const INK: readonly [number, number, number] = [18, 18, 18];
const GRAY: readonly [number, number, number] = [96, 96, 96];
const HAIR: readonly [number, number, number] = [226, 226, 226];

const lineHeight = (pt: number, factor = 1.45) => pt * PT_TO_MM * factor;

export function downloadCvPdf() {
  const doc = buildCvPdf();
  doc.save("Afaq_Ul_Islam_CV.pdf");
}

function buildCvPdf(): jsPDF {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Cursor — y.v tracks the current vertical position on the active page.
  const y = { v: TOP };

  /** Start a new page if `h` mm doesn't fit below the cursor. */
  const ensure = (h: number) => {
    if (y.v + h > H - BOTTOM) {
      doc.addPage();
      y.v = TOP;
    }
  };

  /** Draw a single line of text at the cursor with explicit styling. */
  const text = (
    str: string,
    x: number,
    size: number,
    color: readonly [number, number, number] = INK,
    style: "normal" | "bold" = "normal",
    align: "left" | "center" | "right" = "left",
  ) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(str, x, y.v, { align });
  };

  /** Wrap a string to the content width at the given size. */
  const wrap = (str: string, size: number): string[] => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    return doc.splitTextToSize(str, CW) as string[];
  };

  /** Draw a wrapped paragraph, advancing the cursor line by line. */
  const paragraph = (
    str: string,
    size: number,
    color: readonly [number, number, number] = GRAY,
    gap = 0.9,
    indent = 0,
  ) => {
    const lines = wrap(str, size);
    ensure(lines.length * lineHeight(size) + gap);
    for (const ln of lines) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      doc.setTextColor(color[0], color[1], color[2]);
      doc.text(ln, MX + indent, y.v);
      y.v += lineHeight(size);
    }
    y.v += gap;
  };

  /** Section heading: uppercase label + hairline divider. */
  const sectionTitle = (label: string) => {
    ensure(14);
    y.v += 4;
    text(label.toUpperCase(), MX, 10, INK, "bold");
    doc.setDrawColor(HAIR[0], HAIR[1], HAIR[2]);
    doc.setLineWidth(0.25);
    doc.line(MX, y.v + 1.6, W - MX, y.v + 1.6);
    y.v += 6;
  };

  /* ---------------------------------------------------------------- */
  /* Header                                                            */
  /* ---------------------------------------------------------------- */

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(INK[0], INK[1], INK[2]);
  doc.text(profile.name.toUpperCase(), MX, y.v);

  y.v += 9.5;
  text(profile.role, MX, 12, INK, "bold");

  y.v += 5.5;
  paragraph(
    [profile.location, profile.email, profile.phone].join("   ·   "),
    8.5,
    GRAY,
    1.1,
  );
  paragraph(
    profile.socials.map((s) => s.label).join("   ·   "),
    8.5,
    GRAY,
    1.1,
  );
  paragraph(profile.availability, 8.5, INK, 1.1);

  // Header divider
  doc.setDrawColor(HAIR[0], HAIR[1], HAIR[2]);
  doc.setLineWidth(0.4);
  doc.line(MX, y.v, W - MX, y.v);
  y.v += 7;

  /* ---------------------------------------------------------------- */
  /* Profile                                                           */
  /* ---------------------------------------------------------------- */

  sectionTitle("Profile");
  paragraph(profile.summary, 9.5, GRAY, 1.5);

  /* ---------------------------------------------------------------- */
  /* Core expertise                                                    */
  /* ---------------------------------------------------------------- */

  sectionTitle("Core Expertise");
  for (const cap of capabilities) {
    ensure(14);
    doc.setFillColor(INK[0], INK[1], INK[2]);
    doc.circle(MX + 0.8, y.v - 1.1, 0.55, "F");
    text(cap.title, MX + 3.5, 10.5, INK, "bold");
    y.v += lineHeight(10.5) - 1;
    paragraph(cap.description, 9, GRAY, 1.3, 3.5);
    y.v += 0.8;
  }

  /* ---------------------------------------------------------------- */
  /* Experience                                                        */
  /* ---------------------------------------------------------------- */

  sectionTitle("Experience");
  for (const job of experience) {
    ensure(16);
    text(job.period, W - MX, 8.5, GRAY, "normal", "right");
    text(job.role, MX, 10.5, INK, "bold");
    y.v += lineHeight(10.5) - 0.8;
    text(job.company, MX, 8.5, GRAY);
    y.v += lineHeight(8.5) - 0.4;
    paragraph(job.summary, 9, GRAY, 1.1);
    for (const point of job.points) {
      ensure(8);
      const lines = wrap(point, 9);
      doc.setFillColor(GRAY[0], GRAY[1], GRAY[2]);
      doc.circle(MX + 1.1, y.v - 1.1, 0.45, "F");
      for (const ln of lines) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        doc.text(ln, MX + 3.5, y.v);
        y.v += lineHeight(9);
      }
      y.v += 0.2;
    }
    y.v += 2;
  }

  /* ---------------------------------------------------------------- */
  /* Selected projects                                                 */
  /* ---------------------------------------------------------------- */

  sectionTitle("Selected Projects");
  for (const project of projects) {
    ensure(12);
    text(project.name, MX, 10, INK, "bold");
    y.v += lineHeight(10) - 0.6;
    paragraph(project.description, 9, GRAY, 1.3);
    y.v += 0.8;
  }

  /* ---------------------------------------------------------------- */
  /* Skills                                                            */
  /* ---------------------------------------------------------------- */

  sectionTitle("Skills");
  for (const group of skills) {
    ensure(10);
    text(group.label.toUpperCase(), MX, 8.5, INK, "bold");
    y.v += lineHeight(8.5) - 0.3;
    paragraph(group.items.join(" · "), 9, GRAY, 1.1);
    y.v += 0.6;
  }

  /* ---------------------------------------------------------------- */
  /* Education                                                         */
  /* ---------------------------------------------------------------- */

  sectionTitle("Education");
  for (const item of education) {
    ensure(12);
    text(item.period, W - MX, 8.5, GRAY, "normal", "right");
    text(item.school, MX, 10, INK, "bold");
    y.v += lineHeight(10) - 0.6;
    text(item.degree, MX, 8.5, GRAY);
    y.v += lineHeight(8.5) + 1.6;
  }

  /* ---------------------------------------------------------------- */
  /* Achievements                                                      */
  /* ---------------------------------------------------------------- */

  sectionTitle("Achievements");
  for (const item of achievements) {
    ensure(12);
    text(item.title, MX, 9.5, INK, "bold");
    y.v += lineHeight(9.5) - 0.5;
    paragraph(item.description, 9, GRAY, 1.2);
    y.v += 0.8;
  }

  /* ---------------------------------------------------------------- */
  /* Footer — name/email + page numbers on every page                  */
  /* ---------------------------------------------------------------- */

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
    doc.text(`${profile.name} — ${profile.email}`, MX, H - 8);
    doc.text(`${i} / ${pages}`, W - MX, H - 8, { align: "right" });
  }
  doc.setPage(1);

  return doc;
}
