import type { InsertEvent } from "../lib/db/schema.js";
import { events, memberships, bookings } from "../lib/db/schema.js";
import { db } from "../lib/db/client.js";
import { eq, inArray, sql } from "drizzle-orm";

export const createEvent = async (data: InsertEvent) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.insert(events).values(data);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create event (event service)");
  }
};

export const getEvents = async () => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    console.log("getEvents");

    // Get all events with booking counts
    const result = await db
      .select({
        id: events.id,
        teamId: events.teamId,
        title: events.title,
        description: events.description,
        limitPlayers: events.limitPlayers,
        createdBy: events.createdBy,
        createdAt: events.createdAt,
        bookingCount: sql<number>`COUNT(${bookings.id})`.as("booking_count"),
      })
      .from(events)
      .leftJoin(bookings, eq(events.id, bookings.eventId))
      .groupBy(events.id);

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get events (event service)");
  }
};

export const updateEvent = async (data: InsertEvent) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db
      .update(events)
      .set(data)
      .where(eq(events.id, Number(data.id)));

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update event (event service)");
  }
};

export const deleteEvent = async (id: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    // Cascade delete will automatically remove all bookings for this event
    const result = await db.delete(events).where(eq(events.id, id));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete event (event service)");
  }
};

export const getEventsByUserId = async (userId: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    // Get all teams the user is a member of
    const userMemberships = await db
      .select()
      .from(memberships)
      .where(eq(memberships.userId, userId));

    if (userMemberships.length === 0) {
      return [];
    }

    const teamIds = userMemberships.map((m) => m.teamId);

    // Get all events for those teams with booking counts
    // where inArray(events.teamId, teamIds) return user is member of the team
    const result = await db
      .select({
        id: events.id,
        teamId: events.teamId,
        title: events.title,
        description: events.description,
        limitPlayers: events.limitPlayers,
        createdBy: events.createdBy,
        createdAt: events.createdAt,
        bookingCount: sql<number>`COUNT(${bookings.id})`.as("booking_count"),
      })
      .from(events)
      .leftJoin(bookings, eq(events.id, bookings.eventId))
      .where(inArray(events.teamId, teamIds))
      .groupBy(events.id);

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get events by user ID (event service)");
  }
};
