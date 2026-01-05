import { unique } from "drizzle-orm/cockroach-core";
import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
  index,
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
  inviteCode: varchar("invite_code", { length: 50 }).notNull().unique(),
  createdBy: int("created_by")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const events = mysqlTable(
  "events",
  {
    id: int("id").primaryKey().autoincrement(),
    teamId: int("team_id")
      .references(() => teams.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    limitPlayers: int("limit_players").notNull().default(0),
    createdBy: int("created_by")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_events_team_id").on(table.teamId),
    index("idx_events_created_by").on(table.createdBy),
  ]
);

export const memberships = mysqlTable(
  "memberships",
  {
    id: int("id").primaryKey().autoincrement(),
    userId: int("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    teamId: int("team_id")
      .references(() => teams.id, { onDelete: "cascade" })
      .notNull(),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (table) => [
    unique("unique_user_team").on(table.userId, table.teamId),
    index("idx_memberships_user_id").on(table.userId),
    index("idx_memberships_team_id").on(table.teamId),
  ]
);

export const bookings = mysqlTable(
  "bookings",
  {
    id: int("id").primaryKey().autoincrement(),
    eventId: int("event_id")
      .references(() => events.id, { onDelete: "cascade" })
      .notNull(),
    userId: int("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (table) => [
    unique("unique_user_event").on(table.eventId, table.userId),
    index("idx_bookings_event_id").on(table.eventId),
    index("idx_bookings_user_id").on(table.userId),
  ]
);

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
