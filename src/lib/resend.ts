import { Resend } from "resend";

/**
 * Resend email client — reads the API key from Convex environment variables.
 * Used by the auth OTP email sender to deliver verification codes.
 */
export const resend = new Resend(process.env.RESEND_API_KEY);
