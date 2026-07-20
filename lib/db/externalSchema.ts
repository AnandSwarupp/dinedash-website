import { pgTable, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

/**
 * These tables belong to the main DineDash app (not this website) and already
 * exist in the shared Neon database. Column definitions mirror the live schema
 * exactly. Never run drizzle-kit generate/push against this file — it's
 * excluded from drizzle.config.ts on purpose so we only ever read/write it,
 * never migrate it.
 */

export const supplyOrders = pgTable("supply_orders", {
  id: text("id").primaryKey(),
  restaurantId: text("restaurant_id").notNull(),
  supplyItemId: text("supply_item_id").notNull(),
  itemName: text("item_name").notNull(),
  unitPricePence: integer("unit_price_pence").notNull(),
  currencyCode: text("currency_code").notNull().default("EUR"),
  quantity: integer("quantity").notNull().default(1),
  tableIds: text("table_ids").array(),
  totalPence: integer("total_pence").notNull(),
  status: text("status").notNull().default("pending"),
  stripeCheckoutSessionId: text("stripe_checkout_session_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  paidAt: timestamp("paid_at"),
  deliveredAt: timestamp("delivered_at"),
});

export const restaurants = pgTable("restaurants", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address"),
  phone: text("phone"),
  country: text("country").notNull().default("GB"),
  ownerId: text("owner_id").notNull(),
});

export const customers = pgTable("customers", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  city: text("city"),
});

export const restaurantTables = pgTable("tables", {
  id: text("id").primaryKey(),
  restaurantId: text("restaurant_id").notNull(),
  tableNumber: text("table_number").notNull(),
  capacity: integer("capacity").notNull().default(4),
  qrCode: text("qr_code").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const suggestions = pgTable("suggestions", {
  id: text("id").primaryKey(),
  customerId: text("customer_id"),
  customerName: text("customer_name"),
  category: text("category").notNull().default("general"),
  suggestion: text("suggestion").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
