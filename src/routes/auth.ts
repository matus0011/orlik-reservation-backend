import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { sendVerificationOTP, signIn } from "../controllers/auth.js";

const authRoutes = new Hono();

authRoutes.post(
  "email-otp/send-verification-otp",
  zValidator("json", z.object({ email: z.email(), type: z.enum(["sign-in"]) })),
  sendVerificationOTP
);

authRoutes.post(
  "sign-in/email-otp",
  zValidator("json", z.object({ email: z.email(), otp: z.string() })),
  signIn
);

export default authRoutes;
