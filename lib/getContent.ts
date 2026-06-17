import { connectDB } from "./mongodb";
import { SiteContent } from "./models/SiteContent";

export async function getContent<T>(section: string): Promise<T | null> {
  try {
    await connectDB();
    const doc = await SiteContent.findOne({ section }).lean();
    if (!doc) return null;
    return (doc as { data: T }).data;
  } catch {
    return null;
  }
}
