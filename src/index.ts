import "dotenv/config";
import { serve } from "@hono/node-server";
import { createApp } from "./appFactory.ts";
// import { cors } from "hono/cors";

const port = Number(process.env.APP_PORT);
// const origin = process.env.APP_ALLOWED_ORIGIN;

// app.use(
//   "/api/auth/*",
//   cors({
//     origin: origin || `http://localhost:${port}`,
//     // allowHeaders: ["Content-Type", "Authorization"],
//     allowMethods: ["POST", "GET", "PUT", "DELETE"],
//     // exposeHeaders: ["Content-Length"],
//     // maxAge: 600,
//     // credentials: true,
//   })
// );

serve(
  {
    fetch: createApp().fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${port}`);
  }
);
