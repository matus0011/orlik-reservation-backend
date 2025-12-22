import type { InsertUser } from "../lib/db/schema.js";
import { users } from "../lib/db/schema.js";
import { db } from "../lib/db/client.ts";
import { eq, and } from "drizzle-orm";

export const signInService = async (data: { email: string; otp: string }) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const user = await db
      .select()
      .from(users)
      .where(and(eq(users.email, data.email), eq(users.otpSecret, data.otp)));

    if (user.length === 0) {
      throw new Error("Invalid email or OTP");
    }

    await db
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(and(eq(users.email, data.email), eq(users.otpSecret, data.otp)));

    return user[0];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create event (event service)");
  }
};
