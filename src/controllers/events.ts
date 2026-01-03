import type { Context } from "hono";
import type { InsertEvent } from "../lib/db/schema.js";
import {
  createEvent as createEventService,
  getEvents as getEventsService,
  updateEvent as updateEventService,
  deleteEvent as deleteEventService,
  getEventsByUserId as getEventsByUserIdService,
} from "../services/events.js";

export const getEvents = async (c: Context) => {
  try {
    const teams = await getEventsService();
    return c.json({ success: true, data: teams });
  } catch (error) {
    return c.json({ error: "Failed to get events" }, 500);
  }
};

export const createEvent = async (c: Context) => {
  try {
    const validatedData = await c.req.json();
    const getLoggedInUserId = c.get("user")?.id;

    const result = await createEventService({
      ...validatedData,
      createdBy: Number(getLoggedInUserId),
    });

    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ error: "Failed to create event" }, 500);
  }
};

export const updateEvent = async (c: Context) => {
  try {
    const validatedData = await c.req.json();
    const result = await updateEventService({
      id: Number(c.req.param("id")),
      ...validatedData,
    });
    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ error: "Failed to update event" }, 500);
  }
};

export const deleteEvent = async (c: Context) => {
  try {
    const result = await deleteEventService(Number(c.req.param("id")));
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to delete event" }, 500);
  }
};

export const getEventsByUserId = async (c: Context) => {
  try {
    const userId = Number(c.req.param("userId"));
    const events = await getEventsByUserIdService(userId);
    return c.json({ success: true, data: events });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to get events by user ID" }, 500);
  }
};
