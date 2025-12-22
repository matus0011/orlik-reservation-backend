import type { Context, Next } from "hono";
import { getUser } from "../services/user.ts";

export const authMiddleware = async (c: Context, next: Next) => {
  const otpSecret = c.req.header("x-otp-secret");
  const userId = c.req.header("x-user-id");

  if (!otpSecret || !userId) {
    return c.json({ error: "Unauthorized", message: "Unauthorized" }, 401);
  }

  try {
    const user = await getUser(Number(userId));

    if (!user) {
      return c.json({ error: "Unauthorized", message: "User not found" }, 401);
    }

    if (user.otpSecret !== otpSecret) {
      return c.json(
        { error: "Unauthorized", message: "Invalid OTP secret" },
        401
      );
    }

    c.set("user", {
      id: user.id,
      email: user.email,
      name: user.name,
      globalRole: user.globalRole,
    });

    await next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};
