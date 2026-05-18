import { Schema, model, models } from "mongoose";

const SiteContentSchema = new Schema(
  {
    section: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const SiteContent = models.SiteContent || model("SiteContent", SiteContentSchema);
