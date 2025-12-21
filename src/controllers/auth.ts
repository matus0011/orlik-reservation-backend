import type { Context } from "hono";
import { auth } from "../lib/auth.js";

export const sendVerificationOTP = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { email, type = "sign-in" } = body;

    const result = await auth.api.sendVerificationOTP({
      body: { email, type },
    });

    return c.json(result);
  } catch (error) {
    console.error("OTP send error:", error);
    return c.json({ error: "Failed to send OTP" }, 500);
  }
};
