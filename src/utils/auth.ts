import dotenv from "dotenv";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

dotenv.config();

const uri = process.env.MONGO_URI as string;
if (!uri) {
  throw new Error("MONGO_URI is missing in environment");
}

const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL as string;
if (!BETTER_AUTH_URL) {
  throw new Error("BETTER_AUTH_URL is missing in environment");
} else {
  console.log(`Base url : ${BETTER_AUTH_URL}`);
}

const client = new MongoClient(uri);
await client.connect();
const dbName = process.env.MONGO_AUTH_DB || "authDb";
const db = dbName ? client.db(dbName) : client.db();

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL,
  apiKey: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, { client }),
  debug: true,
  emailAndPassword: {
    enabled: true,
  },
  //experimental: { joins: true },
  trustedOrigins: [process.env.FRONTEND_ORIGIN || "http://localhost:5173"],
  advanced: {
    defaultCookieAttributes: {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    },
  },
});
