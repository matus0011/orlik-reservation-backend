import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const globalRoles: string[] = ["USER", "ADMIN", "SUPER_ADMIN"];

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 200 }).unique(),
  globalRole: varchar("global_role", { length: 50 }).notNull().default("USER"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
  otpSecret: varchar("otp_secret", { length: 255 }),
});

export const teams = mysqlTable("teams", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 150 }).notNull(),
  inviteCode: varchar("invite_code", { length: 50 }).notNull(),
  createdBy: int("created_by")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const events = mysqlTable("events", {
  id: int("id").primaryKey().autoincrement(),
  teamId: int("team_id")
    .references(() => teams.id)
    .notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  limitPlayers: int("limit_players").notNull().default(0),
  createdBy: int("created_by")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const memberships = mysqlTable("memberships", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .references(() => users.id)
    .notNull(),
  teamId: int("team_id")
    .references(() => teams.id)
    .notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const bookings = mysqlTable("bookings", {
  id: int("id").primaryKey().autoincrement(),
  eventId: int("event_id")
    .references(() => events.id)
    .notNull(),
  userId: int("user_id")
    .references(() => users.id)
    .notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertTeam = typeof teams.$inferInsert;
export type SelectTeam = typeof teams.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;
export type SelectEvent = typeof events.$inferSelect;
export type InsertMembership = typeof memberships.$inferInsert;
export type SelectMembership = typeof memberships.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;
export type SelectBooking = typeof bookings.$inferSelect;
