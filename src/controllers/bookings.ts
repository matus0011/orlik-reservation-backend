import type { Context } from "hono";
import type { InsertBooking } from "../lib/db/schema.js";
import {
  createBooking as createBookingService,
  getBookings as getBookingsService,
  getBooking as getBookingService,
  getBookingsByUserId as getBookingsByUserIdService,
  getBookingsByEventId as getBookingsByEventIdService,
  updateBooking as updateBookingService,
  deleteBooking as deleteBookingService,
  deleteBookingByUserAndEvent as deleteBookingByUserAndEventService,
} from "../services/bookings.js";

export const getBookings = async (c: Context) => {
  try {
    const bookings = await getBookingsService();
    return c.json({ success: true, data: bookings });
  } catch (error) {
    return c.json({ error: "Failed to get bookings" }, 500);
  }
};

export const getBooking = async (c: Context) => {
  try {
    const booking = await getBookingService(Number(c.req.param("id")));
    if (!booking) {
      return c.json({ error: "Booking not found" }, 404);
    }
    return c.json({ success: true, data: booking });
  } catch (error) {
    return c.json({ error: "Failed to get booking" }, 500);
  }
};

export const getBookingsByUserId = async (c: Context) => {
  try {
    const userId = Number(c.req.param("userId"));
    const bookings = await getBookingsByUserIdService(userId);
    return c.json({ success: true, data: bookings });
  } catch (error) {
    return c.json({ error: "Failed to get bookings by user ID" }, 500);
  }
};

export const getBookingsByEventId = async (c: Context) => {
  try {
    const eventId = Number(c.req.param("eventId"));
    const bookings = await getBookingsByEventIdService(eventId);
    return c.json({ success: true, data: bookings });
  } catch (error) {
    return c.json({ error: "Failed to get bookings by event ID" }, 500);
  }
};

export const createBooking = async (c: Context) => {
  try {
    const validatedData = await c.req.json();
    const result = await createBookingService(validatedData);
    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ error: "Failed to create booking" }, 500);
  }
};

export const updateBooking = async (c: Context) => {
  try {
    const validatedData = await c.req.json();
    const result = await updateBookingService({
      id: Number(c.req.param("id")),
      ...validatedData,
    });
    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ error: "Failed to update booking" }, 500);
  }
};

export const deleteBooking = async (c: Context) => {
  try {
    const result = await deleteBookingService(Number(c.req.param("id")));
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to delete booking" }, 500);
  }
};

export const deleteBookingByUserAndEvent = async (c: Context) => {
  try {
    const userId = Number(c.req.param("userId"));
    const eventId = Number(c.req.param("eventId"));
    const result = await deleteBookingByUserAndEventService(userId, eventId);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to delete booking by user and event" }, 500);
  }
};

// Admin endpoint to remove any user from an event
export const adminDeleteBooking = async (c: Context) => {
  try {
    const currentUser = c.get("user");
    // Only admins can delete bookings
    if (
      currentUser.globalRole !== "ADMIN" &&
      currentUser.globalRole !== "SUPER_ADMIN"
    ) {
      return c.json({ error: "Access denied. Admin rights required." }, 403);
    }
    const userId = Number(c.req.param("userId"));
    const eventId = Number(c.req.param("eventId"));
    const result = await deleteBookingByUserAndEventService(userId, eventId);
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to delete booking" }, 500);
  }
};
