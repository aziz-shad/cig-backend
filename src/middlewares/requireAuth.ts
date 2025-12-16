import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../utils/auth.ts";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Ask Better Auth to read the session from cookies/headers
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    // No session -> not authenticated
    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Attach user and session to the request object
    // For now we keep the type loose; later we can tighten this with TypeScript types
    (req as any).user = session.user;
    (req as any).authSession = session.session;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Error in requireAuth middleware", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
