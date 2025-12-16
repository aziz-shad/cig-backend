import mongoose from "mongoose";
import "colors";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI as string;
    if (!uri) {
      throw new Error("MONGO_URI missing in environment");
    }

    const DB_NAME = process.env.CIG_DB_NAME as string;
    if (!DB_NAME) {
      throw new Error("CIG_DB_NAME missing in environment");
    }

    const conn = await mongoose.connect(uri, { dbName: DB_NAME });
    console.log(
      `MongoDB successfully connected : ${conn.connection.db?.databaseName}`
        .underline.cyan
    );
  } catch (error) {
    console.error("Mongo connection error", error);
  }
};

export default connectDB;
