import { Hono } from "hono";
// import { auth } from "./lib/auth";
import teamRoutes from "./routes/teams.ts";
import eventRoutes from "./routes/events.ts";
import memberRoutes from "./routes/members.ts";
import bookingRoutes from "./routes/bookings.ts";

import { loggerMiddleware } from "./middlewares/logger.ts";

export const createApp = () => {
  const app = new Hono();

  // logger middleware
  app.use("*", loggerMiddleware);

  // Mount Better Auth handler under /api/auth/*
  // app.use("/api/auth/*", auth.handler);

  app.route("/api/teams", teamRoutes);
  app.route("/api/events", eventRoutes);
  // app.route("/api/members", memberRoutes);
  // app.route("/api/bookings", bookingRoutes);

  return app;
};
