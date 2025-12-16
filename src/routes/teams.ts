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

teamRoutes.use("*", authMiddleware);

teamRoutes.get("/", getTeams);

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

teamRoutes.put(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  updateTeam
);

teamRoutes.delete(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  deleteTeam
);

export default teamRoutes;
