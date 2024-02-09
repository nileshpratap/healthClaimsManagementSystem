import mongoose from "mongoose";
import dotenv from "dotenv";

// config dotenv
dotenv.config();

mongoose.set("strictQuery", true);
const url = process.env.MONGO_URL;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB Connected.");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
const connectPostgres = async () => {};

const connectDBs = async () => {
  console.log("connecting DBs");
  connectMongoDB();
  connectPostgres();
};

export default connectDBs;
