import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/lib/models/Lead";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const plan = searchParams.get("plan");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (plan) query.plan = plan;
    if (search) {
      query.$or = [
        { restaurantName: { $regex: search, $options: "i" } },
        { ownerName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).lean();
    const total = await Lead.countDocuments({});
    const newCount = await Lead.countDocuments({ status: "new" });

    return NextResponse.json({ leads, total, newCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch leads." }, { status: 500 });
  }
}
