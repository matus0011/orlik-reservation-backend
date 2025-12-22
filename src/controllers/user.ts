import type { Context } from "hono";
import type { InsertUser } from "../lib/db/schema.js";
import {
  updateUser as updateUserService,
  getUser as getUserService,
  deleteUser as deleteUserService,
} from "../services/user.js";

export const getUser = async (c: Context) => {
  try {
    const user = await getUserService(Number(c.req.param("id")));
    return c.json({ success: true, user });
  } catch (error) {
    return c.json({ error: "Failed to get user" }, 500);
  }
};

export const updateUser = async (c: Context) => {
  try {
    const validatedData = await c.req.json();

    const result = await updateUserService({
      id: Number(c.req.param("id")),
      ...validatedData,
    });

    // Return the updated user data
    const updatedUser = await getUserService(Number(c.req.param("id")));

    return c.json({ success: true, user: updatedUser });
  } catch (error) {
    return c.json({ error: "Failed to update user" }, 500);
  }
};

export const deleteUser = async (c: Context) => {
  try {
    const userId = Number(c.req.param("id"));
    const currentUser = c.get("user");

    // Users can only delete their own account
    if (userId !== currentUser.id) {
      return c.json({ error: "You can only delete your own account" }, 403);
    }

    await deleteUserService(userId);

    return c.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return c.json({ error: "Failed to delete user" }, 500);
  }
};
