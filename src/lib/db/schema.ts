import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
  boolean,
  json,
} from "drizzle-orm/mysql-core";

export const globalRoles: string[] = ["USER", "ADMIN", "SUPER_ADMIN"];
export const statuses: string[] = ["PENDING", "CONFIRMED", "CANCELLED"];

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 200 }).unique(),
  passwordHash: varchar("password_hash", { length: 255 }),
  facebookId: varchar("facebook_id", { length: 255 }),
  avatarUrl: text("avatar_url"),
  globalRole: varchar("global_role", { length: 50 }).notNull().default("USER"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
});

export const teams = mysqlTable("teams", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 150 }).notNull(),
  inviteCode: varchar("invite_code", { length: 50 }).notNull(),
  createdBy: int("created_by").references(() => users.id),
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
  active: boolean("active").notNull().default(true),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  canAddMembers: boolean("can_add_members").notNull().default(false),
});

export const events = mysqlTable("events", {
  id: int("id").primaryKey().autoincrement(),
  teamId: int("team_id")
    .references(() => teams.id)
    .notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  limitPlayers: int("limit_players").notNull().default(0),
  fieldLocation: varchar("field_location", { length: 200 }),
  createdBy: int("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookings = mysqlTable("bookings", {
  id: int("id").primaryKey().autoincrement(),
  eventId: int("event_id")
    .references(() => events.id)
    .notNull(),
  userId: int("user_id")
    .references(() => users.id)
    .notNull(),
  status: varchar("status", { length: 20 }).notNull().default("PENDING"),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const invites = mysqlTable("invites", {
  id: int("id").primaryKey().autoincrement(),
  teamId: int("team_id")
    .references(() => teams.id)
    .notNull(),
  inviteCode: varchar("invite_code", { length: 50 }).notNull(),
  createdBy: int("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const actionLogs = mysqlTable("action_logs", {
  id: int("id").primaryKey().autoincrement(),
  actionType: varchar("action_type", { length: 100 }).notNull(),
  performedBy: int("performed_by").references(() => users.id),
  targetUser: int("target_user").references(() => users.id),
  teamId: int("team_id").references(() => teams.id),
  eventId: int("event_id").references(() => events.id),
  details: json("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userStats = mysqlTable("user_stats", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .references(() => users.id)
    .notNull(),
  teamId: int("team_id")
    .references(() => teams.id)
    .notNull(),
  year: int("year").notNull(),
  totalEventsJoined: int("total_events_joined").notNull().default(0),
  totalEventsMissed: int("total_events_missed").notNull().default(0),
  totalEventsCreated: int("total_events_created").notNull().default(0),
  totalKicks: int("total_kicks").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type InsertTeam = typeof teams.$inferInsert;
export type InsertMembership = typeof memberships.$inferInsert;
export type InsertEvent = typeof events.$inferInsert;
export type InsertBooking = typeof bookings.$inferInsert;
export type InsertInvite = typeof invites.$inferInsert;
export type InsertActionLog = typeof actionLogs.$inferInsert;
export type InsertUserStat = typeof userStats.$inferInsert;
