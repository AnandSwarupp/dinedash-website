import { pgTable, text, integer, jsonb, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const blogStatusEnum = pgEnum("blog_status", ["draft", "published"]);
export const contactStatusEnum = pgEnum("contact_status", ["new", "read", "replied"]);
export const leadStatusEnum = pgEnum("lead_status", ["new", "contacted", "active", "closed"]);

export const blogs = pgTable("blogs", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  authorRole: text("author_role"),
  category: text("category").notNull(),
  tags: text("tags").array().notNull().default([]),
  coverImage: text("cover_image"),
  status: blogStatusEnum("status").notNull().default("draft"),
  readingTime: integer("reading_time"),
  publishedAt: text("published_at"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  restaurantName: text("restaurant_name"),
  phone: text("phone"),
  status: contactStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const leads = pgTable("leads", {
  id: text("id").primaryKey(),
  restaurantName: text("restaurant_name").notNull(),
  ownerName: text("owner_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  numberOfTables: text("number_of_tables"),
  plan: text("plan").notNull().default("starter"),
  message: text("message"),
  status: leadStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const siteContent = pgTable("site_content", {
  section: text("section").primaryKey(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
