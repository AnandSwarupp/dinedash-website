import { NextRequest, NextResponse } from "next/server";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { supplyOrders, restaurantTables } from "@/lib/db/externalSchema";
import { isSuppliesAuthorized } from "@/lib/supplyAuth";
import { sendMail } from "@/lib/mailer";
import { buildQrCardBuffer } from "@/lib/qrCard";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  if (!(await isSuppliesAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { orderId } = await params;
    const body = await req.json();
    const { to, subject, message } = body;

    if (!to || !EMAIL_REGEX.test(String(to))) {
      return NextResponse.json({ error: "A valid recipient email is required." }, { status: 400 });
    }
    if (!message || !String(message).trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const [order] = await db.select().from(supplyOrders).where(eq(supplyOrders.id, orderId)).limit(1);
    if (!order) {
      return NextResponse.json({ error: "Supply order not found" }, { status: 404 });
    }

    const tableIds = order.tableIds || [];
    const tables = tableIds.length
      ? await db.select().from(restaurantTables).where(inArray(restaurantTables.id, tableIds))
      : [];

    const attachments = await Promise.all(
      tables.map(async (t) => ({
        filename: `table-${t.tableNumber}-qr.png`,
        content: await buildQrCardBuffer(t.qrCode, t.tableNumber, t.capacity),
      }))
    );

    await sendMail({
      to: String(to).trim(),
      subject: subject ? String(subject).trim() : `Your DineDash supply order: ${order.itemName}`,
      text: String(message).trim(),
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
