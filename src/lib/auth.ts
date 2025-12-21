import "dotenv/config";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { sendEmail } from "../lib/email.js";
import { db } from "../lib/db/client.js";
import { users } from "../lib/db/schema.js";
import { eq } from "drizzle-orm";

// it ise very simple auth only for email OTP CODE verification

export const auth = betterAuth({
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          if (!db) {
            throw new Error("Database not connected");
          }

          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

          if (user.length > 0) {
            await sendEmail(email, `Twój kod weryfikacyjny to: ${otp}`);
          } else {
            await db.insert(users).values({
              email,
              otpSecret: otp,
              name: "Wpisz swoje imię i nazwisko",
              globalRole: "USER",
            });

            await sendEmail(email, `Twój kod weryfikacyjny to: ${otp}`);
          }
        }
      },
    }),
  ],
});
