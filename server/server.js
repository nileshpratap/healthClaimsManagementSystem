import express from "express";
import userRoutes from "./routes/users.js";
import cors from "cors";

const app = express();

// middlewares
app.use(cors());
app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("Hey, this is a CMS response!"));

app.listen(5000, () => console.log("server listening on port 5000!"));
