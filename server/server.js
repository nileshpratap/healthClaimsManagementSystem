import express from "express";
import userRoutes from "./routes/users.js";
import claimsRoutes from "./routes/claims.js";
import policiesRoutes from "./routes/policies.js";
import cors from "cors";
import { authenticate } from "./middlewares/auth.js";
// import connectDBs from "./dbConnections/dbconnects.js";
import { PrismaClient } from "@prisma/client";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" assert { type: "json" };

// prometheus monitoring and exposing it on a route
import promclient from "prom-client";

const collectDefaultMetrics = promclient.collectDefaultMetrics;
collectDefaultMetrics({ register: promclient.register });

export const prisma = new PrismaClient();

const app = express();
// connect databases
// connectDBs();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.use(pino);
// Enable preflight requests for all routes
app.options("*", cors());

app.use("/users", userRoutes);
app.use("/claims", authenticate, claimsRoutes);
app.use("/policies", authenticate, policiesRoutes);

app.get("/", (req, res) => res.send("Hey, this is a CMS response!"));
// Define default route

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

// prometheus route
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", promclient.register.contentType);
  const metrics = await promclient.register.metrics();
  res.send(metrics);
});

app.get("*", (req, res) => {
  res.status(404).send("Path not found");
});
