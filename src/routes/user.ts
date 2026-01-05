import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "../middlewares/auth.js";
import {
  updateUser,
  getUser,
  deleteUser,
  getAllUsers,
  adminUpdateUser,
  adminDeleteUser,
} from "../controllers/user.js";

const userRoutes = new Hono();

userRoutes.use("*", authMiddleware);

// Admin routes
userRoutes.get("/admin/all", getAllUsers);

userRoutes.put(
  "/admin/:id",
  zValidator("param", z.object({ id: z.string() })),
  zValidator(
    "json",
    z.object({
      name: z.string().min(1).max(100).optional(),
      globalRole: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]).optional(),
    })
  ),
  adminUpdateUser
);

userRoutes.delete(
  "/admin/:id",
  zValidator("param", z.object({ id: z.string() })),
  adminDeleteUser
);

// Regular user routes
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
