import express from "express";
import {
  registerCustomer,
  registerAdmin_HEmp,
  loginCustomer,
  login,
  updateCustomerDetails,
  updateAdmin_HEmp_Details,
  updateCustomerDetailsbyAdmin,
} from "../controllers/users.js";

const router = express.Router();

// create routes
// register a user
router.post("/registerCustomer", registerCustomer);
router.post("/register", registerAdmin_HEmp);

// read routes
// login
router.get("/loginCustomer/:uid", loginCustomer);
// login for admin or HE based on query parameter
router.get("/login/:id", login);

// update
// update customer profile data based on uid
router.patch("/updateCustomer/:uid", updateCustomerDetails);
// update customer profile data based on uid by admin
router.patch("/updateCustomerbyAdmin/:uid/:aid", updateCustomerDetailsbyAdmin);
// update admin/HEmp profile data based on id
router.patch("/update/:id", updateAdmin_HEmp_Details);

export default router;

//create
//read
//update
//delete
