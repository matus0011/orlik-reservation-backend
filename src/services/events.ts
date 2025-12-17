import type { InsertEvent } from "../lib/db/schema.js";
import { events } from "../lib/db/schema.js";
import { db } from "../lib/db/client.ts";
import { eq } from "drizzle-orm";

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

    const result = await db.select().from(events);
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
    // TODO: delate is last step off all
    // const result = await db.delete(teams).where(eq(teams.id, id));
    // return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete event (event service)");
  }
};
