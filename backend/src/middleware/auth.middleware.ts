import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export interface AuthRequest extends Request {
  userId?: number;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

  if (!payload) {
    res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    return;
  }

  req.userId = payload.userId;
  next();
}

