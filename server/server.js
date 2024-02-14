import express from "express";
import userRoutes from "./routes/users.js";
import claimsRoutes from "./routes/claims.js";
import policiesRoutes from "./routes/policies.js";
import cors from "cors";
// import connectDBs from "./dbConnections/dbconnects.js";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const app = express();
// connect databases
// connectDBs();

// middlewares
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/claims", claimsRoutes);
app.use("/policies", policiesRoutes);

app.get("/", (req, res) => res.send("Hey, this is a CMS response!"));

const serverPort = process.env.SERVER_PORT || 6000;
app.listen(serverPort, () =>
  console.log(`server listening on port ${serverPort}`)
);
