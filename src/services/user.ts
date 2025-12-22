import type { InsertTeam } from "../lib/db/schema.js";
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

export const deleteUser = async (id: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    // TODO:All delete user content
    const result = await db.delete(users).where(eq(users.id, id));

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete user (user service)");
  }
};
