import express from "express";
import { registerCustomer, loginCustomer } from "../controllers/users.js";

const router = express.Router();

// create routes
router.get("/register", registerCustomer);

// read routes
router.get("/login", loginCustomer);

// update routes

// delete routes

export default router;
