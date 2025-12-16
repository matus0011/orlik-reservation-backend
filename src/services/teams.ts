import type { InsertTeam } from "../lib/db/schema.js";
import { teams } from "../lib/db/schema.js";
import { db } from "../lib/db/client.ts";

export const createTeam = async (data: InsertTeam) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    console.log(data);

    const result = await db.insert(teams).values(data);
    return result;
  } catch (error) {
    throw new Error("Failed to create team (team service)");
  }
};
