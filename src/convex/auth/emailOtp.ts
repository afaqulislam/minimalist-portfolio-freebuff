import { Email } from "@convex-dev/auth/providers/Email";
import axios from "axios";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";

// API key for the Freebuff email-relay service used to send OTP codes.
// Managed as a secret — set FB_EMAIL_API_KEY in the project's Keys/API keys
// UI (value: the key shown in that UI). No key is embedded in the source.
const emailRelayApiKey = process.env.FB_EMAIL_API_KEY;

export const emailOtp = Email({
  id: "email-otp",
  maxAge: 60 * 15, // 15 minutes
  // This function can be asynchronous
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
    if (!emailRelayApiKey) {
      throw new Error(
        "FB_EMAIL_API_KEY is not set — OTP emails cannot be sent. " +
          "Add it in the project's Keys/API keys settings.",
      );
    }
    try {
      await axios.post(
        "https://auth.freebuff.app/send_otp",
        {
          to: email,
          otp: token,
          appName: process.env.VLY_APP_NAME || "a freebuff.com application",
        },
        {
          headers: {
            "x-api-key": emailRelayApiKey,
          },
        },
      );
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});
