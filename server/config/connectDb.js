import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not configured");
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured");
    await mongoose.connect(process.env.MONGO_URI);
    console.info("MongoDB connected successfully");
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }

};


export default connectDb;