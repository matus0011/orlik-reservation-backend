import { Hono } from "hono";
import teamRoutes from "./routes/teams.js";
import eventRoutes from "./routes/events.js";
import authRoutes from "./routes/auth.js";

import { loggerMiddleware } from "./middlewares/logger.js";

export const createApp = () => {
  const app = new Hono();

  // logger middleware
  app.use("*", loggerMiddleware);

  app.route("/api/auth", authRoutes);
  app.route("/api/teams", teamRoutes);
  app.route("/api/events", eventRoutes);

  return app;
};
