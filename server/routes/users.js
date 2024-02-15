import express from "express";
import {
  registerCustomer,
  registerAdmin_HEmp,
  login,
  updateCustomerDetails,
  updateAdmin_HEmp_Details,
  updateCustomerDetailsbyAdmin,
} from "../controllers/users.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

// create routes
// register a user
router.post("/registerCustomer", registerCustomer);
router.post("/register", registerAdmin_HEmp);

// read routes
// login
router.get("/login", login);

// update
// update customer profile data based on uid
router.patch("/updateCustomer/", updateCustomerDetails);
// update customer profile data based on uid by admin
router.patch("/updateCustomerbyAdmin/:uid/:aid", updateCustomerDetailsbyAdmin);
// update admin/HEmp profile data based on id
router.patch("/update/:id", updateAdmin_HEmp_Details);

export default router;

//create
//read
//update
//delete
