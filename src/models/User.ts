import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String, unique: true, sparse: true },
    emailVerified: { type: Date },
    image: { type: String },
    banned: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

export default mongoose.model("User", UserSchema);
