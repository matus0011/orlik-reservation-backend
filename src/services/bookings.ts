import type { InsertBooking, SelectBooking } from "../lib/db/schema.js";
import { bookings } from "../lib/db/schema.js";
import { db } from "../lib/db/client.ts";
import { eq, and } from "drizzle-orm";

export const createBooking = async (data: InsertBooking) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.insert(bookings).values(data);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create booking (booking service)");
  }
};

export const getBookings = async () => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.select().from(bookings);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get bookings (booking service)");
  }
};

export const getBooking = async (id: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.select().from(bookings).where(eq(bookings.id, id));
    return result[0] || null;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get booking (booking service)");
  }
};

export const getBookingsByUserId = async (userId: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.select().from(bookings).where(eq(bookings.userId, userId));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get bookings by user ID (booking service)");
  }
};

export const getBookingsByEventId = async (eventId: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.select().from(bookings).where(eq(bookings.eventId, eventId));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get bookings by event ID (booking service)");
  }
};

export const updateBooking = async (data: InsertBooking) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db
      .update(bookings)
      .set(data)
      .where(eq(bookings.id, Number(data.id)));

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update booking (booking service)");
  }
};

export const deleteBooking = async (id: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.delete(bookings).where(eq(bookings.id, id));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete booking (booking service)");
  }
};

export const deleteBookingByUserAndEvent = async (userId: number, eventId: number) => {
  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const result = await db.delete(bookings).where(
      and(eq(bookings.userId, userId), eq(bookings.eventId, eventId))
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete booking by user and event (booking service)");
  }
};
