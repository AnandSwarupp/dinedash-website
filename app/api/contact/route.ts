import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schema";
import { rateLimit, getIp, isLocalhostDev } from "@/lib/rateLimit";

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
    const { name, email, subject, message, restaurantName, phone } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const [contact] = await db
      .insert(contacts)
      .values({
        id: `contact_${randomUUID()}`,
        name: String(name).trim().slice(0, 100),
        email: String(email).trim().slice(0, 200),
        subject: String(subject || "General enquiry").trim().slice(0, 200),
        message: String(message).trim().slice(0, 2000),
        restaurantName: restaurantName ? String(restaurantName).trim().slice(0, 200) : undefined,
        phone: phone ? String(phone).trim().slice(0, 50) : undefined,
        status: "new",
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
      id: contact.id,
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
