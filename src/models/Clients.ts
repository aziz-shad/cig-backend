import { Schema, model } from "mongoose";

type ClientType = {
  first_name: String;
  last_name: String;
  email: String;
  age: Number;
  isActive: Boolean;
};

const clientSchema = new Schema<ClientType>({
  first_name: {
    type: String,
    required: true,
    minLength: [2, "min length is 2 chars"],
    maxLength: 50,
  },
  last_name: {
    type: String,
    required: true,
    minLength: [2, "min length is 2 chars"],
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please use a valid email",
    ],
  },
  age: { type: Number },
  isActive: { type: Boolean, default: true },
});

export const Client = model<ClientType>("Client", clientSchema);
