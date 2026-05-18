import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/lib/models/Contact";

export async function POST(req: NextRequest) {
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

    await connectDB();

    const contact = await Contact.create({
      id: `contact_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: String(name).trim().slice(0, 100),
      email: String(email).trim().slice(0, 200),
      subject: String(subject || "General enquiry").trim().slice(0, 200),
      message: String(message).trim().slice(0, 2000),
      restaurantName: restaurantName ? String(restaurantName).trim().slice(0, 200) : undefined,
      phone: phone ? String(phone).trim().slice(0, 50) : undefined,
      status: "new",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
      id: contact.id,
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
