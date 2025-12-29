import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "../middlewares/auth.js";
import {
  getMemberships,
  getMembership,
  getMembershipsByUserId,
  getMembershipsByTeamId,
  createMembership,
  updateMembership,
  deleteMembership,
  deleteMembershipByUserAndTeam,
} from "../controllers/memberships.js";

const membershipRoutes = new Hono();

membershipRoutes.use("*", authMiddleware);

membershipRoutes.get("/", getMemberships);

membershipRoutes.get(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  getMembership
);

membershipRoutes.get(
  "/user/:userId",
  zValidator("param", z.object({ userId: z.string() })),
  getMembershipsByUserId
);

membershipRoutes.get(
  "/team/:teamId",
  zValidator("param", z.object({ teamId: z.string() })),
  getMembershipsByTeamId
);

membershipRoutes.post(
  "/",
  zValidator(
    "json",
    z.object({
      userId: z.number().min(1),
      teamId: z.number().min(1),
    })
  ),
  createMembership
);

membershipRoutes.put(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  updateMembership
);

membershipRoutes.delete(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  deleteMembership
);

membershipRoutes.delete(
  "/user/:userId/team/:teamId",
  zValidator("param", z.object({ userId: z.string(), teamId: z.string() })),
  deleteMembershipByUserAndTeam
);

export default membershipRoutes;
