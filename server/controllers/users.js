// controllers for users
import { usersData } from "../data/users.js";

// controllers for customers
// create
export const registerCustomer = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "customer") {
      res.status(200).json({
        msg: "welcome customer",
        "Type of user": userType,
      });
    } else if (userType === "admin") {
      res.status(200).json({
        msg: "welcome Admin",
        "Type of user": userType,
      });
    } else if (userType === "HEmp") {
      res.status(200).json({
        msg: "welcome HEmp",
        "Type of user": userType,
      });
    } else {
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// read
export const loginCustomer = async (req, res) => {};

// update

// delete

// create
// read
// update
// delete
