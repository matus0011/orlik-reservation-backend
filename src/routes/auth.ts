import { Hono } from "hono";
import { sendVerificationOTP } from "../controllers/auth.ts";

const authRoutes = new Hono();

authRoutes.post("email-otp/send-verification-otp", sendVerificationOTP);

export default authRoutes;
