import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/lib/models/Lead";
import { getAdminSession } from "@/lib/auth";

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const VALID_STATUSES = new Set(["new", "contacted", "active", "closed"]);
const VALID_PLANS = new Set(["starter", "growth", "enterprise"]);

export async function GET(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const plan = searchParams.get("plan");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = {};
    if (status && VALID_STATUSES.has(status)) query.status = status;
    if (plan && VALID_PLANS.has(plan)) query.plan = plan;
    if (search) {
      const safe = escapeRegex(search.slice(0, 100));
      query.$or = [
        { restaurantName: { $regex: safe, $options: "i" } },
        { ownerName: { $regex: safe, $options: "i" } },
        { email: { $regex: safe, $options: "i" } },
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).lean();
    const total = await Lead.countDocuments({});
    const newCount = await Lead.countDocuments({ status: "new" });

    return NextResponse.json({ leads, total, newCount });
  } catch {
    return NextResponse.json({ error: "Failed to fetch leads." }, { status: 500 });
  }
}
