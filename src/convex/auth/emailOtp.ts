import { Email } from "@convex-dev/auth/providers/Email";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
// Resend free tier ONLY allows sending from @resend.dev domains.
// Do NOT set a custom domain here unless you verified it in Resend dashboard.
const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const appName = process.env.VLY_APP_NAME || "Afaq Portfolio";

// Only these emails can log in as owner.
const ALLOWED_EMAILS = new Set([
  "afaqulislam707@gmail.com",
]);

export const emailOtp = Email({
  id: "email-otp",
  maxAge: 60 * 15, // 15 minutes
  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes: Uint8Array) {
        crypto.getRandomValues(bytes);
      },
    };
    const alphabet = "0123456789";
    return generateRandomString(random, alphabet, 6);
  },
  async sendVerificationRequest({ identifier: email, token }) {
    // Only allow whitelisted emails to log in
    if (!ALLOWED_EMAILS.has(email.toLowerCase().trim())) {
      throw new Error(
        "NOT_AUTHORIZED",
      );
    }

    if (!resendApiKey) {
      throw new Error(
        "RESEND_API_KEY is not set — OTP emails cannot be sent. " +
          "Add it in the project's Keys/API keys settings.",
      );
    }
    const resend = new Resend(resendApiKey);
    try {
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Your ${appName} Login Code`,
        html: `
          <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 32px;">
            <h2 style="margin: 0 0 8px; font-size: 20px; color: #111;">Your login code</h2>
            <p style="margin: 0 0 24px; color: #555; font-size: 14px;">Use the code below to sign in to ${appName}. It expires in 15 minutes.</p>
            <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; text-align: center;">
              <span style="font-size: 32px; font-weight: 600; letter-spacing: 8px; color: #111; font-family: monospace;">${token}</span>
            </div>
            <p style="margin: 24px 0 0; color: #999; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : JSON.stringify(error);
      console.error("[emailOtp] Failed to send OTP:", msg);
      throw new Error(`Failed to send OTP email: ${msg}`);
    }
  },
});
