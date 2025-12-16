import { Hono } from "hono";
// import { auth } from "./lib/auth";
import teamRoutes from "./routes/teams.ts";
import { loggerMiddleware } from "./middlewares/logger.ts";

export const createApp = () => {
  const app = new Hono();

  // logger middleware
  app.use("*", loggerMiddleware);

  // Mount Better Auth handler under /api/auth/*
  // app.use("/api/auth/*", auth.handler);

  app.route("/api/teams", teamRoutes);

  return app;
};
