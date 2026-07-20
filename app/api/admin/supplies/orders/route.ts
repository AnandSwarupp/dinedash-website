import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, eq, ilike, inArray, or, SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { supplyOrders, restaurants, customers, restaurantTables } from "@/lib/db/externalSchema";
import { isSuppliesAuthorized } from "@/lib/supplyAuth";

const VALID_STATUSES = new Set(["pending", "paid", "cancelled"]);

export async function GET(req: NextRequest) {
  if (!(await isSuppliesAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10) || 20));
    const status = searchParams.get("status");
    const restaurantId = searchParams.get("restaurantId");
    const search = searchParams.get("search");

    const conditions: SQL[] = [];
    if (status && VALID_STATUSES.has(status)) conditions.push(eq(supplyOrders.status, status));
    if (restaurantId) conditions.push(eq(supplyOrders.restaurantId, restaurantId));
    if (search) {
      const term = `%${search.slice(0, 100)}%`;
      const matches = await db
        .select({ id: restaurants.id })
        .from(restaurants)
        .where(or(ilike(restaurants.name, term), ilike(restaurants.address, term)));
      const ids = matches.map((m) => m.id);
      if (ids.length === 0) {
        return NextResponse.json({ items: [], page, pageSize, total: 0, totalPages: 0 });
      }
      conditions.push(inArray(supplyOrders.restaurantId, ids));
    }

    const where = conditions.length ? and(...conditions) : undefined;

    const [orders, [{ value: total }]] = await Promise.all([
      db
        .select()
        .from(supplyOrders)
        .where(where)
        .orderBy(desc(supplyOrders.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ value: count() }).from(supplyOrders).where(where),
    ]);

    const restaurantIds = [...new Set(orders.map((o) => o.restaurantId))];
    const allTableIds = [...new Set(orders.flatMap((o) => o.tableIds || []))];

    const [restaurantRows, tableRows] = await Promise.all([
      restaurantIds.length
        ? db.select().from(restaurants).where(inArray(restaurants.id, restaurantIds))
        : Promise.resolve([]),
      allTableIds.length
        ? db.select().from(restaurantTables).where(inArray(restaurantTables.id, allTableIds))
        : Promise.resolve([]),
    ]);

    const ownerIds = [...new Set(restaurantRows.map((r) => r.ownerId))];
    const ownerRows = ownerIds.length
      ? await db.select().from(customers).where(inArray(customers.id, ownerIds))
      : [];

    const restaurantById = new Map(restaurantRows.map((r) => [r.id, r]));
    const ownerById = new Map(ownerRows.map((c) => [c.id, c]));
    const tableById = new Map(tableRows.map((t) => [t.id, t]));

    const items = orders.map((o) => {
      const restaurant = restaurantById.get(o.restaurantId);
      const owner = restaurant ? ownerById.get(restaurant.ownerId) : undefined;
      return {
        id: o.id,
        status: o.status,
        itemName: o.itemName,
        quantity: o.quantity,
        unitPricePence: o.unitPricePence,
        totalPence: o.totalPence,
        currencyCode: o.currencyCode,
        tables: (o.tableIds || []).flatMap((tid) => {
          const t = tableById.get(tid);
          if (!t) return [];
          return [{
            tableId: t.id,
            tableNumber: Number(t.tableNumber),
            capacity: t.capacity,
            qrValue: t.qrCode,
          }];
        }),
        checkoutQrValue: null,
        startTimerQrValue: null,
        createdAt: o.createdAt,
        paidAt: o.paidAt,
        deliveredAt: o.deliveredAt,
        restaurant: restaurant
          ? {
              id: restaurant.id,
              name: restaurant.name,
              address: restaurant.address,
              phone: restaurant.phone,
              country: restaurant.country,
              email: owner?.email ?? null,
            }
          : null,
      };
    });

    return NextResponse.json({
      items,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch supply orders." }, { status: 500 });
  }
}
