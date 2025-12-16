import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "../middlewares/auth.js";
import {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/teams.js";

const teamRoutes = new Hono();

//ale routes should be protected by authentication middleware
teamRoutes.use("*", authMiddleware);

// eventRoutes.get("/", getEvents);
// wy need only name and id no need validation

teamRoutes.post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string().min(1).max(200),
      inviteCode: z.string().min(1).max(50),
    })
  ),
  createTeam
);

// eventRoutes.put("/:id", updateEvent);
// only update name mayby onlu validation for name and check if team exists

// eventRoutes.delete("/:id", deleteEvent);

export default teamRoutes;
