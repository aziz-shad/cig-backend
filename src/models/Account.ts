import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    accessToken: { type: String },
    refreshToken: { type: String },
    expiresAt: { type: Number },
    tokenType: { type: String },
    scope: { type: String },
  },
  { collection: "accounts" }
);

export default mongoose.model("Account", AccountSchema);
