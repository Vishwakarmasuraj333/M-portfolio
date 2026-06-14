import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Gallery from "@/lib/models/Gallery";
import { isAuthenticated } from "@/lib/auth";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const db = await connectDB();
    if (!db) {
      // Mock delete
      return NextResponse.json({ success: true, message: "Gallery item deleted (Mock Mode)" });
    }

    const deletedGalleryItem = await Gallery.findByIdAndDelete(id);
    if (!deletedGalleryItem) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Gallery item deleted successfully" });
  } catch (error: any) {
    console.error("Gallery DELETE error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete gallery item" }, { status: 500 });
  }
}
