import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "../middlewares/auth.js";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.js";

const eventRoutes = new Hono();

eventRoutes.use("*", authMiddleware);

eventRoutes.get("/", getEvents);

eventRoutes.post(
  "/",
  zValidator(
    "json",
    z.object({
      teamId: z.number().min(1),
      title: z.string().min(1).max(200),
      description: z.string().optional(),
      limitPlayers: z.number(),
    })
  ),
  createEvent
);

eventRoutes.put(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  updateEvent
);

eventRoutes.delete(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  deleteEvent
);

export default eventRoutes;
