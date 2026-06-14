import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/lib/models/Contact";
import { isAuthenticated } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const db = await connectDB();
    if (!db) {
      // Mock update
      return NextResponse.json({ success: true, message: "Message marked as read (Mock Mode)" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, { read: body.read }, { new: true });
    if (!updatedContact) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, contact: updatedContact, message: "Message updated successfully" });
  } catch (error: any) {
    console.error("Contact PUT error:", error);
    return NextResponse.json({ error: error.message || "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const db = await connectDB();
    if (!db) {
      // Mock delete
      return NextResponse.json({ success: true, message: "Message deleted (Mock Mode)" });
    }

    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Message deleted successfully" });
  } catch (error: any) {
    console.error("Contact DELETE error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete message" }, { status: 500 });
  }
}
