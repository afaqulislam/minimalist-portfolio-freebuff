import { Email } from "@convex-dev/auth/providers/Email";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@resend.dev";
const appName = process.env.VLY_APP_NAME || "Afaq Portfolio";

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
      throw new Error(JSON.stringify(error));
    }
  },
});
