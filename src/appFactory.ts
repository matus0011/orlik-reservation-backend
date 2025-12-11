import { Hono } from "hono";
import { auth } from "./lib/auth.ts";

export const createApp = () => {
  const app = new Hono();

  // Mount Better Auth handler under /api/auth/*
  app.use("/api/auth/*", auth.handler);

  return app;
};
