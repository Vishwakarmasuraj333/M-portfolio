import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_super_secret_jwt_key_mamta_2026_space";

export function signToken(payload: { userId: string; username: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; username: string; role: string };
  } catch (error) {
    console.error("JWT Verification error:", error);
    return null;
  }
}
export { JWT_SECRET };
