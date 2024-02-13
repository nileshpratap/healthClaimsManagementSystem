// controllers for users
import { db } from "../data/users.js";
import {
  isEmailValid,
  containsOnlyDigits,
  containsOnlyAlphabets,
  isgoodpassword,
} from "../validations/validations.js";
// controllers for customers

export const registerCustomer = async (req, res) => {
  try {
    const userType = req.query.type;
    const { uid, fname, email, password, dob } = req.body;

    if (userType === "customer") {
      const requser = req.body;
      if (!uid || !fname || !email || !password || !dob) {
        return res.status(400).json({ message: "All fields are required." });
      }

      //validating all fields
      // email
      if (isEmailValid(email) === false) {
        return res.status(409).json({
          message: "Please enter a valid email",
        });
      }

      // uid
      // length should be 16 and only digits
      if (uid.length !== 16 || !containsOnlyDigits(uid)) {
        return res.status(409).json({
          message: "Please enter a valid UID",
        });
      }

      // fname
      if (!containsOnlyAlphabets(fname)) {
        return res.status(409).json({
          message: "Your name should only consist alphabets",
        });
      }

      // password
      if (!isgoodpassword(password)) {
        return res.status(409).json({
          message: "Password needs to be 6 characters at minimun",
        });
      }

      // dob
      const dateObject = new Date(dob);
      if (isNaN(dateObject.getTime())) {
        return res.status(409).json({
          message: "Invalid date string",
        });
      } else {
        const timeDifference = Date.now() - dateObject.getTime();
        // Calculate the number of milliseconds in 18 years
        const eighteenYearsInMillis = 18 * 365 * 24 * 60 * 60 * 1000;
        if (timeDifference <= 0) {
          return res.status(409).json({
            message: "Date can't be in the future",
          });
        }
        if (timeDifference < eighteenYearsInMillis) {
          return res.status(409).json({
            message: "Your age is less than 18, You can't register",
          });
        }
      }

      //checking if user is unique
      // Check for existing user with the same username
      const existingUser = db.users.find((user) => user.uid === uid);
      if (existingUser) {
        return res.status(409).json({
          message:
            "User already exists, please login if the uid entered is yours",
        });
      } else {
        // adding the user to our db
        db.users.push(requser);
        return res.status(200).json({
          msg: "welcome customer",
          "Type of user": userType,
          "details received": requser,
        });
      }
    } else {
      return res.status(400).json({
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
  const userType = req.query.type;
  const { email, password } = req.body;
  try {
    if (userType === "customer") {
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
      //validating all fields
      // email
      function isEmailValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
      if (isEmailValid(email) === false) {
        return res.status(409).json({
          message: "Please enter a valid email",
        });
      }
      // password
      if (password.length < 6) {
        return res.status(409).json({
          message: "invalid password, length must be 6 character at minimun",
        });
      }

      const user = db.users.find((user) => user.email === email);

      if (user) {
        if (user.password !== password) {
          return res.status(400).json({
            msg: "Password doesn't matches with actual password",
            "Type of user": userType,
          });
        }
        res.status(200).json({
          msg: "customer logged in",
          "Type of user": userType,
          "user details": user,
        });
      } else {
        return res.status(400).json({
          msg: "user not found with this email",
          "Type of user": userType,
        });
      }
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
