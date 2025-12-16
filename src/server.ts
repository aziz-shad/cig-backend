import connectDB from "./db/index.ts";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "colors";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./utils/index.ts";
import { errorHandler, notFoundHandler } from "./middlewares/index.ts";
import clientRoute from "./routes/clientsRoute.ts";
import invoicesRoute from "./routes/invoicesRoute.ts";
import reportRoute from "./routes/reportsRoute.ts";

dotenv.config();
connectDB();
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Better Auth handler on /api/auth
// Important: this comes BEFORE express.json
app.all("/api/auth/*spalt", toNodeHandler(auth));

// JSON body parser (Better Auth will be inserted before this later)
app.use(express.json());

// Simple root route
app.get("/", (_req, res) => {
  res.send("Welcome to Clients Invoice Generation!!!!");
});

app.get("/api/me", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      return res.status(401).json({ user: null });
    }

    return res.json({
      user: session.user,
      session: {
        id: session.session.id,
        expiresAt: session.session.expiresAt,
      },
    });
  } catch (error) {
    console.log("Error in /api/me", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/api/clients", clientRoute);
app.use("/api/invoices", invoicesRoute);
app.use("/api/reports", reportRoute);

//app.use("*splat", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.magenta);
});
