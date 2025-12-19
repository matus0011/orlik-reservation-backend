import "dotenv/config";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          console.log("Sending OTP for sign in to", email, otp);
          // Send the OTP for sign in
        }
      },
    }),
  ],
});
