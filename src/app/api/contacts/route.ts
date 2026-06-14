import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/lib/models/Contact";
import { isAuthenticated } from "@/lib/auth";

const defaultContacts = [
  {
    _id: "seed-c1",
    name: "Alex Rivera",
    email: "alex@agency.design",
    subject: "Collaboration on Next.js 16 Web Project",
    message: "Hey Mamta! Saw your space portfolio and I am absolutely blown away by the responsive layout and custom girl developer SVG. We have a high-end agency project that needs custom WordPress work. Let's hop on a call next week!",
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    _id: "seed-c2",
    name: "Elena Rostova",
    email: "elena.r@ai-labs.co",
    subject: "Web Developer Position Opening",
    message: "Hi Mamta, I am a technical recruiter at Web Solutions. We're looking for someone who specializes in WordPress, PHP, and responsive styling. Your portfolio showcases exactly what we need. Please send over your resume!",
    read: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  }
];

export async function GET(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json(defaultContacts);
    }

    // Seed if empty
    const count = await Contact.countDocuments();
    if (count === 0) {
      const seedData = defaultContacts.map(({ _id, ...rest }) => rest);
      await Contact.insertMany(seedData);
    }

    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error: any) {
    console.error("Contacts GET error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch contact messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = await connectDB();
    if (!db) {
      // Mock mode submission success
      return NextResponse.json({ success: true, message: "Message sent successfully (Mock Mode)" });
    }

    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({ success: true, contact: newContact, message: "Message sent successfully" });
  } catch (error: any) {
    console.error("Contacts POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to send message" }, { status: 500 });
  }
}
