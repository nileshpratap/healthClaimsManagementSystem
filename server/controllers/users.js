// import { client } from "../dbConnections/dbconnects.js";
import { prisma } from "../server.js";
import jwt from "jsonwebtoken";

// controllers for users
import {
  isEmailValid,
  isid,
  containsOnlyDigits,
  containsOnlyAlphabets,
  isgoodpassword,
  isAdult,
} from "../validations/validations.js";
// controllers for customers

export const getOneUserbyAdmin = async (req, res) => {
  const UID = req.params.UID;

  const founduser = await prisma.customers.findFirst({ where: { UID } });
  return res.status(200).json({
    msg: "found customer deteails",
    user: founduser,
  });
};
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

    // checking if customer already exists

    try {
      const foundCustomer = await prisma.customers.findFirst({
        where: {
          OR: [
            {
              UID: uid,
            },
            {
              Email: email,
            },
          ],
        },
      });
      if (foundCustomer) {
        return res.status(409).json({
          msg: "customer already exists, please login if this is your UID or Email",
          "Type of user": userType,
        });
      }

      // customer does not exist already, push the details into the DB
      // password hashing
      const saltRound = 3;
      const hash_password = await password;
      // now pushing the details
      const newCustomer = await prisma.customers.create({
        data: {
          UID: uid,
          Name: cname,
          Email: email,
          Password: hash_password,
          HealthCondition: healthCondition,
          DOB: dob,
        },
      });
      delete newCustomer.Password;
      const token = jwt.sign(newCustomer, process.env.ACCESS_TOKEN_SECRET);

      return res.status(200).json({
        msg: "registered the customer",
        "Type of user": userType,
        "registered user": newCustomer,
        token,
      });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  } else {
    return res.status(400).json({
      msg: "customer type invalid",
      "Type of user": userType,
    });
  }
};
export const registerAdmin_HEmp = async (req, res) => {
  // use postgresql
  try {
    const userType = req.query.type;
    const requser = req.body;
    if (userType === "admin") {
      const { EID, cname, email, password } = req.body;
      if (!EID || !cname || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
      //validating all fields
      // EID
      // length should be 16 and only digits
      const idresp = isid(res, EID);
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

      // password hashing
      const saltRound = 3;
      const hash_password = password;

      // validated the inputs, register the admin
      try {
        const foundAdmin = await prisma.admins.findFirst({
          where: {
            OR: [
              {
                EID: EID,
              },
              {
                Email: email,
              },
            ],
          },
        });
        if (foundAdmin) {
          return res.status(409).json({
            msg: "admin already exists, please login if this is your EID or Email",
            "Type of user": userType,
          });
        }

        const newAdmin = await prisma.admins.create({
          data: {
            EID: EID,
            Name: cname,
            Email: email,
            Password: hash_password,
          },
        });
        delete newAdmin.Password;
        const token = jwt.sign(newAdmin, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({
          msg: "registered the admin",
          "Type of user": userType,
          "registered Admin": newAdmin,
          token,
        });
      } catch (err) {
        return res.status(404).json({ message: err.message });
      }
    } else if (userType === "HEmp") {
      const { uid, uhid, cname, email, password } = req.body;
      if (!uid || !uhid || !cname || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
      //validating all fields
      // uid
      // length should be 16 and only digits
      const idresp = isid(res, uid);
      if (idresp !== true) return idresp;

      // uhid
      // length should be less than and only digits
      const hidresp = containsOnlyDigits(res, uhid);
      if (idresp !== true) return idresp;
      if (uhid.length > 6 || Number(uhid) < 1 || Number(uhid) > 100000) {
        return res.status(409).json({
          message: "Hospital id must be in 1 to 100000",
        });
      }

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

      // validated the inputs, register the admin
      try {
        const foundHEmp = await prisma.hEmps.findFirst({
          where: {
            OR: [
              {
                HEID: uid,
              },
              {
                Email: email,
              },
            ],
          },
        });
        if (foundHEmp) {
          return res.status(409).json({
            msg: "HEmp already exists, please login if this is your UID or Email",
            "Type of user": userType,
          });
        }
        const saltRound = 3;
        const hash_password = password;
        const newHEmp = await prisma.hEmps.create({
          data: {
            HEID: uid,
            HID: uhid,
            Name: cname,
            Email: email,
            Password: hash_password,
          },
        });
        delete newHEmp.Password;
        const token = jwt.sign(newHEmp, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({
          msg: "registered the Hospital Employee",
          "Type of user": userType,
          "registered Hospital Employee": newHEmp,
          token,
        });
      } catch (err) {
        return res.status(404).json({ message: err.message });
      }
      // res.status(200).json({
      //   msg: "welcome HEmp",
      //   "Type of user": userType,
      // });
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
export const login = async (req, res) => {
  const userType = req.query.type;
  const { email, password } = req.body;
  const userTypeToTableName = {
    customer: "Customers",
    admin: "Admins",
    HEmp: "HEmps",
  };

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // checking userType validity
  const userTypes = ["customer", "admin", "HEmp"];
  const isValidUserType = userTypes.indexOf(userType) !== -1;
  if (!isValidUserType) {
    res.status(400).json({
      msg: "customer type invalid",
      "Type of user": userType,
    });
  }

  //validating email
  // email
  if (isEmailValid(email) === false) {
    return res.status(409).json({
      message: "Please enter a valid email",
    });
  }

  try {
    // finding customer in the db with details in the request
    const foundUser = await prisma[
      userTypeToTableName[`${userType}`]
    ].findUnique({
      where: {
        Email: email,
      },
    });
    if (!foundUser) {
      return res.status(404).json({
        msg: "This email is not yet registered, Please register!",
        "Type of user": userType,
      });
    } else {
      const token = jwt.sign(foundUser, process.env.ACCESS_TOKEN_SECRET);

      if (password === foundUser.Password) {
        return res.status(200).json({
          msg: `Logged in the ${userType}`,
          "Type of user": userType,
          [`logged in ${userType}`]: foundUser,
          token,
        });
      } else {
        return res.status(401).json({
          msg: "Incorrect Password, Try Again!",
          "Type of user": userType,
        });
      }
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
