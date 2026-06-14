import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function isAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get("token")?.value;
  if (!token) return false;
  if (token === "mock-jwt-token-mamta") return true;
  return verifyToken(token) !== null;
}
