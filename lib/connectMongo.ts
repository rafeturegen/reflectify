import mongoose from "mongoose";

export default async function connectMongo() {
  const uri = process.env.MONGO_URI;
  
  if (!uri) {
    console.error("MONGO_URI is not defined. Available environment variables:");
    throw new Error("MONGO_URI is not defined in the environment variables.");
  }

  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    await mongoose.connect(uri);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Couldn't connect to MongoDB: " + (error as Error).message);
  }
}