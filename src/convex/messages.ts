import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { profile } from "../data/portfolio";
import { mutation, query } from "./_generated/server";

/**
 * Public contact form. Freelance clients do not need an account, so this
 * mutation accepts anonymous submissions and stores them for the owner.
 */
export const insertMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("messages", {
      name: args.name.trim(),
      email: args.email.trim().toLowerCase(),
      company: args.company?.trim() || undefined,
      message: args.message.trim(),
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
