import { timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";
import { getAdminSession } from "@/lib/auth";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/**
 * Accepts either the X-Admin-Key header (for external/server-to-server callers)
 * or the same admin session cookie used by the rest of /admin (for our own dashboard UI).
 */
export async function isSuppliesAuthorized(req: NextRequest): Promise<boolean> {
  const key = req.headers.get("x-admin-key");
  const expectedKey = process.env.SUPPLIES_ADMIN_KEY;
  if (key && expectedKey && safeEqual(key, expectedKey)) return true;

  const session = await getAdminSession();
  return !!session;
}
