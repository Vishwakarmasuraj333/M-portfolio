import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Gallery from "@/lib/models/Gallery";
import { isAuthenticated } from "@/lib/auth";

const defaultGallery = [
  {
    _id: "seed-g1",
    title: "Cinematic Space Nebula UI Design",
    category: "Designs",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "seed-g2",
    title: "Quantum Computer Concept Concept Art",
    category: "AI Art",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "seed-g3",
    title: "AWS Certified Solutions Architect",
    category: "Certifications",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "seed-g4",
    title: "Futuristic Ergonomic Setup Workspace",
    category: "Workspace",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  }
];

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(defaultGallery);
    }

    // Seed default gallery if database is connected but empty
    const count = await Gallery.countDocuments();
    if (count === 0) {
      const seedData = defaultGallery.map(({ _id, ...rest }) => rest);
      await Gallery.insertMany(seedData);
    }

    const galleryItems = await Gallery.find({}).sort({ createdAt: -1 });
    return NextResponse.json(galleryItems);
  } catch (error: any) {
    console.error("Gallery GET error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, category, image } = body;

    if (!title || !category || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = await connectDB();
    if (!db) {
      // Mock mode create
      const mockGallery = {
        _id: "mock-g-" + Math.random().toString(36).substring(2, 9),
        title,
        category,
        image,
        createdAt: new Date().toISOString(),
      };
      return NextResponse.json({ success: true, gallery: mockGallery, message: "Gallery item added (Mock Mode)" });
    }

    const newGalleryItem = await Gallery.create({
      title,
      category,
      image,
    });

    return NextResponse.json({ success: true, gallery: newGalleryItem, message: "Gallery item created successfully" });
  } catch (error: any) {
    console.error("Gallery POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to add gallery item" }, { status: 500 });
  }
}
