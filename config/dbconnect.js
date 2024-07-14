import mongoose from "mongoose";
import { DB_URL } from "./index.js";

async function DB_Connect() {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to database.", err);
    });
    await mongoose.connect(DB_URL, {
      dbName: "ecommerce",
      bufferCommands: false,
    });
  } catch (error) {
    console.error("Failed to connect to database.", error);
    process.exit(1);
  }
  mongoose.connect(DB_URL);
}

export default DB_Connect;
