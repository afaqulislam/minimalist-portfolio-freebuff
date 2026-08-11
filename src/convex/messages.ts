import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
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
 * Message inbox — signed-in owners only. Returns the newest submissions first.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return [];
    }
    return await ctx.db
      .query("messages")
      .withIndex("by_createdAt")
      .order("desc")
      .take(100);
  },
});
