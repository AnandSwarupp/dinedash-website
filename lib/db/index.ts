import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import * as externalSchema from "./externalSchema";

const DATABASE_URL = process.env.DATABASE_URL!;

if (!DATABASE_URL) {
  throw new Error("Please define DATABASE_URL in .env.local");
}

const sql = neon(DATABASE_URL);

export const db = drizzle(sql, { schema: { ...schema, ...externalSchema } });
