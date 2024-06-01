import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const mongodbconnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    // console.log(mongodbconnectionInstance); --> Instance returned when the db is connected
    console.log(
      `\n MongoDB connected! DB Host: ${mongodbconnectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection failed: ", error);
    process.exit(1)
  }
}