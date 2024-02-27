import express from "express";
import userRoutes from "./routes/users.js";
import claimsRoutes from "./routes/claims.js";
import policiesRoutes from "./routes/policies.js";
import cors from "cors";
import { authenticate } from "./middlewares/auth.js";
// import connectDBs from "./dbConnections/dbconnects.js";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const app = express();
// connect databases
// connectDBs();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://health-claims-management-system.vercel.app",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Enable preflight requests for all routes
app.options("*", cors());

app.use("/users", userRoutes);
app.use("/claims", authenticate, claimsRoutes);
app.use("/policies", authenticate, policiesRoutes);

app.get("/", (req, res) => res.send("Hey, this is a CMS response!"));
// Define default route
app.get("*", (req, res) => {
  res.status(404).send("Path not found");
});

const serverPort = process.env.SERVER_PORT || 6000;
app.listen(serverPort, () => {
  console.log(`server listening on port ${serverPort}`);
});

// assign every policy a admin and user based on some calculations
// assigning these values for all the policies for now
const updateAllPolicies = async () => {
  // console.log("updating all policies");
  try {
    const allPolicies = await prisma.policies.findMany();
    let PIDs = [];

    // Update logic here
    const updatedPolicies = await Promise.all(
      allPolicies.map(async (policy) => {
        // Your update logic for each policy
        // Example: Updating a specific column for each policy
        PIDs.push(policy.PID);
        return prisma.policies.update({
          where: { PID: policy.PID },
          data: { EID: "1234123412341234", HEID: "3234123412341234" },
        });
      })
    );
    const updatedAdmin = await prisma.admins.update({
      where: { EID: "1234123412341234" },
      data: { Policies: PIDs },
    });

    // console.log("Updated policies:", updatedPolicies);
  } catch (error) {
    console.error("Error updating policies:", error);
  }
};
// updateAllPolicies();

// Run the update function at 5-minute intervals
setInterval(updateAllPolicies, 2 * 60 * 1000); // 2 minutes in milliseconds
