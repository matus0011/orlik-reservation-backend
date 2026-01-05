import type { InsertTeam, InsertUser } from "../lib/db/schema.js";
import { users } from "../lib/db/schema.js";
import { db } from "../lib/db/client.js";
import { eq } from "drizzle-orm";

export const updateUser = async (data: InsertTeam) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db
      .update(users)
      .set(data)
      .where(eq(users.id, Number(data.id)));

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update team (team service)");
  }
};

export const getUser = async (id: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const user = await db.select().from(users).where(eq(users.id, id));
    return user[0] || null;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user (user service)");
  }
};

export const getAllUsers = async () => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const allUsers = await db.select().from(users);
    return allUsers;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get all users (user service)");
  }
};

export const deleteUser = async (id: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    // Cascade delete will automatically remove:
    // - All user's bookings
    // - All user's memberships
    // - All teams created by user (and their events and bookings)
    // - All events created by user (and their bookings)
    const result = await db.delete(users).where(eq(users.id, id));

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete user (user service)");
  }
};
