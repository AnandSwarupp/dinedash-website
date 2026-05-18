import { Schema, model, models } from "mongoose";

export interface IContact {
  _id: string;
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  restaurantName?: string;
  phone?: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

const ContactSchema = new Schema<IContact>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    restaurantName: String,
    phone: String,
    status: { type: String, enum: ["new", "read", "replied"], default: "new" },
    createdAt: { type: String, required: true },
  },
  { timestamps: true }
);

export const Contact = models.Contact || model<IContact>("Contact", ContactSchema);
