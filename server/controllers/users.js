// controllers for users
import { usersData } from "../data/users.js";

// controllers for customers
// create
export const registerCustomer = async (req, res) => {
  // use mongodb
  try {
    const userType = req.query.type;
    if (userType === "customer") {
      res.status(200).json({
        msg: "welcome customer",
        "Type of user": userType,
      });
    } else {
      res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const registerAdmin_HEmp = async (req, res) => {
  // use postgresql
  try {
    const userType = req.query.type;
    if (userType === "admin") {
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
      res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// read
export const loginCustomer = async (req, res) => {
  // use mongoDB
  const userType = req.query.type;
  try {
    if (userType === "customer") {
      res.status(200).json({
        msg: "logged you in customer",
        "Type of user": userType,
      });
    } else {
      res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  // use postgresql
  const userType = req.query.type;
  try {
    if (userType === "admin") {
      res.status(200).json({
        msg: "logged you in admin",
        "Type of user": userType,
      });
    } else if (userType === "HEmp") {
      res.status(200).json({
        msg: "logged you in HEmp",
        "Type of user": userType,
      });
    } else {
      res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

// update
// customer details update by customer
export const updateCustomerDetails = async (req, res) => {
  // use mongoDB
  const userType = req.query.type;
  try {
    if (userType === "customer") {
      res.status(200).json({
        msg: "updated customer profile details",
        "Type of user": userType,
      });
    } else {
      res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};
// customer details update by admin
export const updateCustomerDetailsbyAdmin = async (req, res) => {
  // use mongoDB
  const userType = req.query.type;
  try {
    if (userType === "admin") {
      res.status(200).json({
        msg: "updated customer profile details by admin",
        "Type of user": userType,
      });
    } else {
      res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

// update admin/HEmp details by admin/HEmp
export const updateAdmin_HEmp_Details = async (req, res) => {
  // use postgresql
  const userType = req.query.type;
  try {
    if (userType === "admin") {
      res.status(200).json({
        msg: "updated admin details",
        "Type of user": userType,
      });
    } else if (userType === "HEmp") {
      res.status(200).json({
        msg: "updated HEmp details",
        "Type of user": userType,
      });
    } else {
      res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

// delete
// no delete routes here
