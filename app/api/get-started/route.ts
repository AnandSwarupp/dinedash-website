import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/lib/models/Lead";

export async function POST(req: NextRequest) {
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

    await connectDB();

    const lead = await Lead.create({
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      restaurantName: String(restaurantName).trim().slice(0, 200),
      ownerName: String(ownerName).trim().slice(0, 100),
      email: String(email).trim().slice(0, 200),
      phone: phone ? String(phone).trim().slice(0, 50) : undefined,
      numberOfTables: String(numberOfTables || "unknown").trim(),
      plan: String(plan || "starter").trim(),
      message: message ? String(message).trim().slice(0, 1000) : undefined,
      status: "new",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Welcome to DineDash! We'll email you setup instructions within 24 hours.",
      id: lead.id,
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
