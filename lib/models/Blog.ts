import { Schema, model, models } from "mongoose";

export interface IBlog {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole?: string;
  category: string;
  tags: string[];
  coverImage?: string;
  status: "draft" | "published";
  readingTime?: number;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

const BlogSchema = new Schema<IBlog>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    authorRole: String,
    category: { type: String, required: true },
    tags: [String],
    coverImage: String,
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    readingTime: Number,
    publishedAt: String,
  },
  { timestamps: true }
);

export const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
