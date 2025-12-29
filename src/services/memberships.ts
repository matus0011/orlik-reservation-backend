import type { InsertMembership, SelectMembership } from "../lib/db/schema.js";
import { memberships } from "../lib/db/schema.js";
import { db } from "../lib/db/client.ts";
import { eq, and } from "drizzle-orm";

export const createMembership = async (data: InsertMembership) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.insert(memberships).values(data);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create membership (membership service)");
  }
};

export const getMemberships = async () => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.select().from(memberships);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get memberships (membership service)");
  }
};

export const getMembership = async (id: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.select().from(memberships).where(eq(memberships.id, id));
    return result[0] || null;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get membership (membership service)");
  }
};

export const getMembershipsByUserId = async (userId: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.select().from(memberships).where(eq(memberships.userId, userId));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get memberships by user ID (membership service)");
  }
};

export const getMembershipsByTeamId = async (teamId: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.select().from(memberships).where(eq(memberships.teamId, teamId));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get memberships by team ID (membership service)");
  }
};

export const updateMembership = async (data: InsertMembership) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db
      .update(memberships)
      .set(data)
      .where(eq(memberships.id, Number(data.id)));

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update membership (membership service)");
  }
};

export const deleteMembership = async (id: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.delete(memberships).where(eq(memberships.id, id));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete membership (membership service)");
  }
};

export const deleteMembershipByUserAndTeam = async (userId: number, teamId: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.delete(memberships).where(
      and(eq(memberships.userId, userId), eq(memberships.teamId, teamId))
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete membership by user and team (membership service)");
  }
};
