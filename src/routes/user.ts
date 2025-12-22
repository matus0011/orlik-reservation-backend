import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "../middlewares/auth.js";
import { updateUser, getUser, deleteUser } from "../controllers/user.js";

const userRoutes = new Hono();

userRoutes.use("*", authMiddleware);

userRoutes.get(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  getUser
);

userRoutes.put(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  zValidator("json", z.object({ name: z.string().min(1).max(100) })),
  updateUser
);

userRoutes.delete(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  deleteUser
);

export default userRoutes;
