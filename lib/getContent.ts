import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";

export async function getContent<T>(section: string): Promise<T | null> {
  try {
    const [row] = await db.select().from(siteContent).where(eq(siteContent.section, section)).limit(1);
    if (!row) return null;
    return row.data as T;
  } catch {
    return null;
  }
}
