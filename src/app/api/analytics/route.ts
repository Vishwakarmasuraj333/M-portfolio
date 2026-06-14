import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Analytics from "@/lib/models/Analytics";
import { isAuthenticated } from "@/lib/auth";

// Pre-seeded statistics for demonstration when DB is not configured
const defaultAnalyticsSummary = {
  totalViews: 12480,
  deviceStats: [
    { name: "Desktop", value: 72 },
    { name: "Mobile", value: 22 },
    { name: "Tablet", value: 6 }
  ],
  countryStats: [
    { name: "United States", value: 42 },
    { name: "India", value: 28 },
    { name: "Germany", value: 12 },
    { name: "United Kingdom", value: 10 },
    { name: "Others", value: 8 }
  ],
  recentViews: [
    { path: "/", device: "Desktop", country: "United States", timestamp: new Date(Date.now() - 60000 * 2).toISOString() },
    { path: "/blog", device: "Mobile", country: "India", timestamp: new Date(Date.now() - 60000 * 15).toISOString() },
    { path: "/", device: "Desktop", country: "Germany", timestamp: new Date(Date.now() - 60000 * 45).toISOString() },
    { path: "/admin", device: "Desktop", country: "United States", timestamp: new Date(Date.now() - 3600000 * 2).toISOString() }
  ]
};

export async function GET(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json(defaultAnalyticsSummary);
    }

    // Seed some mock analytics logs if empty
    const count = await Analytics.countDocuments();
    if (count === 0) {
      const paths = ["/", "/blog", "/gallery", "/admin"];
      const devices = ["Desktop", "Mobile", "Tablet"];
      const countries = ["United States", "India", "Germany", "United Kingdom", "Canada", "Australia"];
      
      const seedLogs = [];
      for (let i = 0; i < 50; i++) {
        seedLogs.push({
          path: paths[Math.floor(Math.random() * paths.length)],
          device: devices[Math.floor(Math.random() * devices.length)],
          country: countries[Math.floor(Math.random() * countries.length)],
          referrer: i % 2 === 0 ? "https://github.com" : "https://google.com",
          timestamp: new Date(Date.now() - (Math.random() * 7 * 24 * 3600 * 1000)),
        });
      }
      await Analytics.insertMany(seedLogs);
    }

    const totalViews = await Analytics.countDocuments();
    
    // Aggregate device counts
    const deviceAggregate = await Analytics.aggregate([
      { $group: { _id: "$device", count: { $sum: 1 } } }
    ]);
    const deviceStats = deviceAggregate.map(item => ({
      name: item._id || "Desktop",
      value: Math.round((item.count / totalViews) * 100)
    }));

    // Aggregate country counts
    const countryAggregate = await Analytics.aggregate([
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    const countryStats = countryAggregate.map(item => ({
      name: item._id || "Unknown",
      value: Math.round((item.count / totalViews) * 100)
    }));

    const recentViews = await Analytics.find({}).sort({ timestamp: -1 }).limit(10);

    return NextResponse.json({
      totalViews,
      deviceStats: deviceStats.length ? deviceStats : defaultAnalyticsSummary.deviceStats,
      countryStats: countryStats.length ? countryStats : defaultAnalyticsSummary.countryStats,
      recentViews
    });
  } catch (error: any) {
    console.error("Analytics GET error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch analytics" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { path, country, device, referrer } = body;

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, message: "Logged hit (Mock Mode)" });
    }

    await Analytics.create({
      path: path || "/",
      country: country || "Unknown",
      device: device || "Desktop",
      referrer: referrer || "",
    });

    return NextResponse.json({ success: true, message: "Page view logged successfully" });
  } catch (error: any) {
    console.error("Analytics POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to log page view" }, { status: 500 });
  }
}
