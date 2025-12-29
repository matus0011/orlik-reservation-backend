import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "../middlewares/auth.js";
import {
  getBookings,
  getBooking,
  getBookingsByUserId,
  getBookingsByEventId,
  createBooking,
  updateBooking,
  deleteBooking,
  deleteBookingByUserAndEvent,
} from "../controllers/bookings.js";

const bookingRoutes = new Hono();

bookingRoutes.use("*", authMiddleware);

bookingRoutes.get("/", getBookings);

bookingRoutes.get(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  getBooking
);

bookingRoutes.get(
  "/user/:userId",
  zValidator("param", z.object({ userId: z.string() })),
  getBookingsByUserId
);

bookingRoutes.get(
  "/event/:eventId",
  zValidator("param", z.object({ eventId: z.string() })),
  getBookingsByEventId
);

bookingRoutes.post(
  "/",
  zValidator(
    "json",
    z.object({
      eventId: z.number().min(1),
      userId: z.number().min(1),
    })
  ),
  createBooking
);

bookingRoutes.put(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  updateBooking
);

bookingRoutes.delete(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  deleteBooking
);

bookingRoutes.delete(
  "/user/:userId/event/:eventId",
  zValidator("param", z.object({ userId: z.string(), eventId: z.string() })),
  deleteBookingByUserAndEvent
);

export default bookingRoutes;
