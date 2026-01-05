import type { Context } from "hono";
import type { InsertUser } from "../lib/db/schema.js";
import {
  updateUser as updateUserService,
  getUser as getUserService,
  deleteUser as deleteUserService,
  getAllUsers as getAllUsersService,
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

// Admin-only endpoints, should be protected by auth middleware. It will be prepended in the next version.
export const getAllUsers = async (c: Context) => {
  try {
    const currentUser = c.get("user");

    if (
      currentUser.globalRole !== "ADMIN" &&
      currentUser.globalRole !== "SUPER_ADMIN"
    ) {
      return c.json({ error: "Access denied. Admin rights required." }, 403);
    }

    const users = await getAllUsersService();

    return c.json({ success: true, data: users });
  } catch (error) {
    return c.json({ error: "Failed to get all users" }, 500);
  }
};

export const adminUpdateUser = async (c: Context) => {
  try {
    const currentUser = c.get("user");
    const userId = Number(c.req.param("id"));
    // Only admins can update other users
    if (
      currentUser.globalRole !== "ADMIN" &&
      currentUser.globalRole !== "SUPER_ADMIN"
    ) {
      return c.json({ error: "Access denied. Admin rights required." }, 403);
    }
    const validatedData = await c.req.json();
    await updateUserService({
      id: userId,
      ...validatedData,
    });
    const updatedUser = await getUserService(userId);
    return c.json({ success: true, user: updatedUser });
  } catch (error) {
    return c.json({ error: "Failed to update user" }, 500);
  }
};

export const adminDeleteUser = async (c: Context) => {
  try {
    const currentUser = c.get("user");
    const userId = Number(c.req.param("id"));
    // Only admins can delete other users

    if (
      currentUser.globalRole !== "ADMIN" &&
      currentUser.globalRole !== "SUPER_ADMIN"
    ) {
      return c.json({ error: "Access denied. Admin rights required." }, 403);
    }

    // Prevent deleting yourself
    if (userId === currentUser.id) {
      return c.json(
        { error: "You cannot delete your own account via admin endpoint" },
        403
      );
    }

    await deleteUserService(userId);
    return c.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return c.json({ error: "Failed to delete user" }, 500);
  }
};
