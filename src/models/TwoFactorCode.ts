import mongoose from "mongoose";

const TwoFactorCodeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { collection: "twoFactorCodes" }
);

export default mongoose.model("TwoFactorCode", TwoFactorCodeSchema);
