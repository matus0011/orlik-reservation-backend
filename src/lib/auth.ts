import "dotenv/config";
// import { betterAuth } from "better-auth";
// import { expo } from "@better-auth/expo";

// TODO: Add more trusted origins

// export const auth = betterAuth({
//   plugins: [expo()],
//   trustedOrigins: [
//     "myapp://",
//     // all above expo development URLs
//     "exp://*/*", // Trust all Expo development URLs
//     "exp://10.0.0.*:*/*", // Trust 10.0.0.x IP range
//     "exp://192.168.*.*:*/*", // Trust 192.168.x.x IP range
//     "exp://172.*.*.*:*/*", // Trust 172.x.x.x IP range
//     "exp://localhost:*/*", // Trust localhost
//     "http://localhost:3000",
//     "http://localhost:8081",
//   ],
//   social: {
//     facebook: {
//       clientId: process.env.FACEBOOK_CLIENT_ID!,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
//       redirectURI: process.env.FACEBOOK_REDIRECT_URI,
//     },
//   },
// });
