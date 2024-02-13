import { client } from "../dbConnections/dbconnects.js";

// controllers for users
import {
  isEmailValid,
  isid,
  containsOnlyAlphabets,
  isgoodpassword,
  isAdult,
} from "../validations/validations.js";
// controllers for customers

export const registerCustomer = async (req, res) => {
  const userType = req.query.type;
  const requser = req.body;
  const { uid, cname, email, password, healthCondition, dob } = req.body;

  if (userType === "customer") {
    const requser = req.body;
    if (!uid || !cname || !email || !password || !healthCondition || !dob) {
      return res.status(400).json({ message: "All fields are required." });
    }
    //validating all fields
    // uid
    // length should be 16 and only digits

    const idresp = isid(res, uid);
    if (idresp !== true) return idresp;

    // cname
    if (cname.length > 60 || !containsOnlyAlphabets(cname)) {
      return res.status(409).json({
        message: "Your name should only consist alphabets and length <= 60",
      });
    }
    // email
    if (isEmailValid(email) === false) {
      return res.status(409).json({
        message: "Please enter a valid email",
      });
    }

    // password
    const isgoodpasswordres = isgoodpassword(res, password);
    if (isgoodpasswordres !== true) return isgoodpasswordres;

    // dob
    const adultres = isAdult(res, dob);
    if (adultres !== true) return adultres;
  } else {
    return res.status(400).json({
      msg: "customer type invalid",
      "Type of user": userType,
    });
  }
  try {
    //checking if user is unique
    // Check for existing user with the same uid
    console.log("making select query");
    client.query(
      "SELECT * FROM Customers where UID = $1;",
      [uid],
      (dberr, dbres) => {
        if (!dberr) {
          if (dbres.rows.length !== 0) {
            return res.status(409).json({
              msg: "customer already exists, please login if this is your UID",
              "Type of user": userType,
            });
          } else {
            console.log(dbres);
          }
        }
      }
    );

    // pushing an entry into db
    client.query(
      ` INSERT INTO Customers (UID, Name, Email, Password, HealthCondition, DOB)
    VALUES
      ($1,$2,$3,$4,$5,$6)`,
      [uid, cname, email, password, healthCondition, dob],
      (dberr, dbres) => {
        if (!dberr) {
          return res.status(200).json({
            msg: "registered the customer",
            "Type of user": userType,
            "registered user": dbres.rows[0],
          });
        } else {
          return res.status(409).json({
            msg: dberr.message,
            "Type of user": userType,
          });
        }
      }
    );
  } catch (err) {
    return res.status(404).json({ message: err.message });
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
