"use node";

import { v } from "convex/values";
import { Resend } from "resend";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

/**
 * Escapes user-provided text before it is interpolated into the notification
 * email's HTML so visitors can't inject markup into the owner's inbox.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Stores a contact-form submission and notifies the owner by email using the
 * project's built-in Vly email integration (no external keys required).
 * Email notification is best-effort: if the integration key is not present,
 * the message is still stored and shown in the inbox.
 */
export const sendMessage = action({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    message: v.string(),
    // Honeypot field. A filled value means an automated bot submitted the
    // form, so the message is silently dropped (and no email is sent).
    website: v.optional(v.string()),
    ownerEmail: v.string(),
  },
  handler: async (
    ctx,
    args,
  ): Promise<{ success: boolean; id: string; emailNotified: boolean }> => {
    // Spam trap: bots that auto-fill hidden inputs get a fake success.
    if (args.website) {
      return { success: true, id: "", emailNotified: false };
    }

    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const company = args.company?.trim();
    const message = args.message.trim();

    if (name.length < 1 || name.length > 80) {
      throw new Error("Please enter a name under 80 characters.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
      throw new Error("Please enter a valid email address.");
    }
    if (message.length < 10 || message.length > 5000) {
      throw new Error("Message must be between 10 and 5000 characters.");
    }
    if (company && company.length > 120) {
      throw new Error("Company name must be under 120 characters.");
    }

    const id = await ctx.runMutation(api.messages.insertMessage, {
      name,
      email,
      company: company || undefined,
      message,
    });

    let emailNotified = false;
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@resend.dev";

      if (resendApiKey && args.ownerEmail) {
        const resend = new Resend(resendApiKey);
        const sender = `${name}${company ? ` · ${company}` : ""} <${email}>`;
        const safeName = escapeHtml(name);
        const safeCompany = escapeHtml(company ?? "");
        const safeMessage = escapeHtml(message);
        const safeEmail = escapeHtml(email);
        await resend.emails.send({
          from: fromEmail,
          to: args.ownerEmail,
          replyTo: email,
          subject: `New portfolio inquiry from ${name}`,
          text: [
            `You received a new message via your portfolio.`,
            ``,
            `From: ${sender}`,
            `Email: ${email}`,
            ``,
            message,
          ].join("\n"),
          html: [
            `<div style="font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #18181b;">`,
            `  <p style="margin: 0 0 4px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #71717a;">New portfolio inquiry</p>`,
            `  <p style="margin: 0 0 20px; font-size: 18px; font-weight: 600;">${safeName}${safeCompany ? ` · ${safeCompany}` : ""}</p>`,
            `  <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</p>`,
            `  <p style="margin: 0; font-size: 13px; color: #71717a;">Reply to: <a href="mailto:${safeEmail}" style="color: #18181b;">${safeEmail}</a></p>`,
            `</div>`,
          ].join("\n"),
        });
        emailNotified = true;
      }
    } catch (error) {
      console.error("[sendMessage] Email notification failed:", error);
    }

    return { success: true, id, emailNotified };
  },
});
