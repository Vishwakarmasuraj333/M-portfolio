import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";
import { isAuthenticated } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
    }

    const db = await connectDB();
    if (!db) {
      // Local development mock check when database connection is missing
      if (username === "admin" && password === "admin-mamta-2026") {
        const response = NextResponse.json({ success: true, message: "Logged in successfully (Mock Mode)" });
        response.cookies.set("token", "mock-jwt-token-mamta", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: "/",
        });
        return response;
      }
      return NextResponse.json({ error: "Invalid credentials (Mock Mode)" }, { status: 401 });
    }

    // Seed default admin account if collection is empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash("admin-mamta-2026", salt);
      await User.create({
        username: "admin",
        passwordHash,
        role: "admin",
      });
      console.log("Seeded default admin account user 'admin' with password 'admin-mamta-2026'");
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
    });

    const response = NextResponse.json({ success: true, message: "Logged in successfully" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!isAuthenticated(req as any)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newPassword } = await req.json();
    if (!newPassword) {
      return NextResponse.json({ error: "Missing new password" }, { status: 400 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, message: "Password updated successfully (Mock Mode)" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Update password of the first admin account
    const updated = await User.findOneAndUpdate({ role: "admin" }, { passwordHash }, { new: true });
    if (!updated) {
      await User.create({
        username: "admin",
        passwordHash,
        role: "admin",
      });
    }

    return NextResponse.json({ success: true, message: "Admin password updated successfully" });
  } catch (error: any) {
    console.error("Change Password PUT error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
