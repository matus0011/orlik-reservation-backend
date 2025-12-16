import type { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  // TODO: Implement authentication middleware

  //   const token = c.req.header("Authorization");

  if (false) {
    return c.json({ error: "Unauthorized", message: "Unauthorized" }, 401);
  }

  //fake verification
  c.set("user", {
    id: 1,
    email: "klichu0011@gmail.com",
    globalRole: "SUPER_ADMIN",
  });

  await next();
};
