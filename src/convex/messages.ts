import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { profile } from "../data/portfolio";
import { mutation, query } from "./_generated/server";

// Per-address rate limit for the public contact form: at most 5 submissions
// per hour, so spam scripts can't flood the inbox.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;

/**
 * Public contact form. Freelance clients do not need an account, so this
 * mutation accepts anonymous submissions and stores them for the owner.
 *
 * This mutation is publicly callable, so it re-validates every field itself
 * (defense in depth — the sendMessage action also validates) and enforces a
 * basic rate limit per email address.
 */
export const insertMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
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

    const now = Date.now();
    const recent = await ctx.db
      .query("messages")
      .withIndex("by_email_created", (q) =>
        q.eq("email", email).gte("createdAt", now - RATE_LIMIT_WINDOW_MS),
      )
      .collect();
    if (recent.length >= RATE_LIMIT_MAX) {
      throw new Error(
        "Too many messages from this address — please try again later.",
      );
    }

    return await ctx.db.insert("messages", {
      name,
      email,
      company: company || undefined,
      message,
      createdAt: now,
    });
  },
});

/**
 * Message inbox — owner only. Returns the newest submissions first.
 *
 * Any signed-in user could previously read every submission; now the query
 * only returns messages when the authenticated user's verified email matches
 * the portfolio owner's notification address.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return [];
    }
    const user = await ctx.db.get(userId);
    if (
      !user?.email ||
      user.email.toLowerCase() !== profile.notifyEmail.toLowerCase()
    ) {
      return [];
    }
    return await ctx.db
      .query("messages")
      .withIndex("by_createdAt")
      .order("desc")
      .take(100);
  },
});
