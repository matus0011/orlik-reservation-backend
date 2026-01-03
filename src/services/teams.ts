import type { InsertTeam } from "../lib/db/schema.js";
import { teams } from "../lib/db/schema.js";
import { db } from "../lib/db/client.ts";
import { eq } from "drizzle-orm";

export const createTeam = async (data: InsertTeam) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.insert(teams).values(data);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create team (team service)");
  }
};

export const getTeams = async () => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.select().from(teams);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get teams (team service)");
  }
};

export const updateTeam = async (data: InsertTeam) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db
      .update(teams)
      .set(data)
      .where(eq(teams.id, Number(data.id)));

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update team (team service)");
  }
};

export const deleteTeam = async (id: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    // TODO: delate is last step off all
    // const result = await db.delete(teams).where(eq(teams.id, id));
    // return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete team (team service)");
  }
};

export const getTeamByInviteCode = async (inviteCode: string) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db
      .select()
      .from(teams)
      .where(eq(teams.inviteCode, inviteCode));
    return result[0] || null;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get team by invite code (team service)");
  }
};
