import jwt from "jsonwebtoken";

const genToken = (userId) => {
  const secret = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("JWT_SECRET or JWT_SECRET_KEY missing from environment");
  }

  return jwt.sign({ userId }, secret, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
};

export default genToken;