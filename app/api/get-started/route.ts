import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { rateLimit, getIp, isLocalhostDev } from "@/lib/rateLimit";

const VALID_PLANS = new Set(["starter", "growth", "enterprise"]);

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!isLocalhostDev(ip)) {
    const { allowed, retryAfter } = rateLimit(ip, 3, 10 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait before trying again." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }
  }

  try {
    const body = await req.json();
    const { restaurantName, ownerName, email, phone, numberOfTables, plan, message } = body;

    if (!restaurantName || !ownerName || !email) {
      return NextResponse.json(
        { error: "Restaurant name, your name, and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const safePlan = VALID_PLANS.has(String(plan)) ? String(plan) : "starter";

    const [lead] = await db
      .insert(leads)
      .values({
        id: `lead_${randomUUID()}`,
        restaurantName: String(restaurantName).trim().slice(0, 200),
        ownerName: String(ownerName).trim().slice(0, 100),
        email: String(email).trim().slice(0, 200),
        phone: phone ? String(phone).trim().slice(0, 50) : undefined,
        numberOfTables: String(numberOfTables || "unknown").trim().slice(0, 50),
        plan: safePlan,
        message: message ? String(message).trim().slice(0, 1000) : undefined,
        status: "new",
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Welcome to DineDash! We'll email you setup instructions within 24 hours.",
      id: lead.id,
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
