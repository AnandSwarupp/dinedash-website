import mongoose, { Schema, model, models } from "mongoose";

export interface ILead {
  _id: string;
  id: string;
  restaurantName: string;
  ownerName: string;
  email: string;
  phone?: string;
  numberOfTables: string;
  plan: string;
  message?: string;
  status: "new" | "contacted" | "active" | "closed";
  createdAt: string;
}

const LeadSchema = new Schema<ILead>(
  {
    id: { type: String, required: true, unique: true },
    restaurantName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    numberOfTables: String,
    plan: { type: String, default: "starter" },
    message: String,
    status: { type: String, enum: ["new", "contacted", "active", "closed"], default: "new" },
    createdAt: { type: String, required: true },
  },
  { timestamps: true }
);

export const Lead = models.Lead || model<ILead>("Lead", LeadSchema);
