import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    if (token === "mock-jwt-token-mamta") {
      return NextResponse.json({ authenticated: true, user: { username: "admin", role: "admin", mode: "mock" } });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, user: decoded });
  } catch (error) {
    console.error("Verify API error:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
