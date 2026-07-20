import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { supplyOrders } from "@/lib/db/externalSchema";
import { isSuppliesAuthorized } from "@/lib/supplyAuth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  if (!(await isSuppliesAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { orderId } = await params;

    let delivered = true;
    try {
      const body = await req.json();
      if (typeof body?.delivered === "boolean") delivered = body.delivered;
    } catch {
      // no body — default to { delivered: true }
    }

    const [order] = await db
      .update(supplyOrders)
      .set({ deliveredAt: delivered ? new Date() : null })
      .where(eq(supplyOrders.id, orderId))
      .returning();

    if (!order) {
      return NextResponse.json({ error: "Supply order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Failed to update supply order." }, { status: 500 });
  }
}
