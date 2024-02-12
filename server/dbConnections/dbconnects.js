import mongoose from "mongoose";
import pg from "pg";
const { Client } = pg;
import dotenv from "dotenv";

// config dotenv
dotenv.config();

// creating a client to connect with postgres
const dbname = "HCMS DB";
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5500,
  password: "nvp65903",
  database: dbname,
});

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

const connectPostgres = async () => {
  try {
    await client.connect();
    console.log(`Connected  to Postgres DB named: ${dbname}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const connectDBs = async () => {
  console.log("establishing Server-DB connection");
  // connectMongoDB();
  connectPostgres();
};

// Export the 'client' instance as a named export
export { client };
// Export the 'connectDBs' function as the default export
export default connectDBs;
