import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
// import { cors } from "hono/cors";

const app = new Hono();

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
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${port}`);
  }
);
