import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

const databaseUrl = process.env.DATABASE_URL;
let db: ReturnType<typeof drizzle> | null = null;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

if (!db) {
  // Shared DB pool + Drizzle ORM instance
  db = drizzle(databaseUrl);
}

export { db };
