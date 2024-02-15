// controllers for policies
import { prisma } from "../server.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { type } from "os";

// create
// policy creation only by admin

export const checkUserValidity = async (dbname, id, mail, res, userType) => {
  // finding customer in the db with details in the request
  const foundUser = await prisma[dbname].findUnique({
    where: { UID: id },
  });

  if (!foundUser) {
    return res.status(404).json({
      msg: "Invalid user ID",
      "Type of user": userType,
    });
  } else {
    if (foundUser.Email !== mail) {
      return res.status(404).json({
        msg: "can't create a policy, your id and email don't match",
        "Type of user": userType,
      });
    } else {
      return { type: true, user: foundUser };
    }
  }
};

export const createPolicybyUser = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "customer") {
      // check if the customer is valid

      const { UID, Email, StartDate, EndDate, PAmount } = req.body;

      const UserValidity = await checkUserValidity(
        "customers",
        UID,
        Email,
        res,
        userType
      );
      if (UserValidity.type !== true) {
        return UserValidity;
      }
      const customer = UserValidity.user;
      // we got the user now add a policy row
      const createdPolicy = await prisma.policies.create({
        data: {
          UID,
          StartDate,
          EndDate,
          PAmount,
        },
      });
      const pid = createdPolicy.PID.toString();
      // update user row by adding a policy id in the table
      const updatedUser = await prisma.customers.update({
        where: { UID },
        data: {
          PIDs: {
            push: pid,
          },
        },
      });
      return res.status(200).json({
        msg: "created policy for the customer in the db",
        "Type of user": userType,
        "updated user": updatedUser,
      });
    } else {
      return res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// read functions by user
// showing all policies of a user to the user
export const getUserPolicies = async (req, res) => {
  try {
    const userType = req.query.type;
    const { UID, Email } = req.body;

    if (userType === "customer") {
      //  get user's policies from postgresql and return as a response

      // validate the req details

      // check user validity
      const UserValidity = await checkUserValidity(
        "customers",
        UID,
        Email,
        res
      );
      if (UserValidity.type !== true) {
        return UserValidity;
      }
      const customer = UserValidity.user;
      // get his pids & get the details of all of his policies and return
      let policies = await Promise.all(
        customer.PIDs.map(async (pid) => {
          const pDetails = await prisma.policies.findUnique({
            where: {
              PID: parseInt(pid),
            },
          });
          console.log(pDetails);
          return pDetails;
        })
      );
      return res.status(200).json({
        msg: "Policies of a user",
        "Type of user": userType,
        policies,
      });
    } else {
      return res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
// showing specific policy of a user to the user
export const getUserPolicybyId = async (req, res) => {
  try {
    const userType = req.query.type;
    const { UID, Email, PID } = req.body;
    if (userType === "customer") {
      //   get user's policy from postgresql and return

      // check user validity
      const UserValidity = await checkUserValidity(
        "customers",
        UID,
        Email,
        res
      );
      if (UserValidity.type !== true) {
        return UserValidity;
      }
      const customer = UserValidity.user;

      // check if the policy belongs to user

      if (customer.PIDs.indexOf(PID.toString()) === -1) {
        return res.status(404).json({
          msg: "this PID doesn't belong to you",
          "Type of user": userType,
        });
      }

      // get the details of all of his policies and return as response
      const policy = await prisma.policies.findUnique({
        where: {
          PID: parseInt(PID),
        },
      });
      console.log(policy);

      return res.status(200).json({
        msg: "Policy of a user",
        "Type of user": userType,
        UID: customer.UID,
        policy,
      });
    } else {
      return res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

// read functions by admin
// read all policies that admin/HE is involved in to the admin/HEmp
export const getPoliciesAdmin_HE = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "admin") {
      //   get all policies that admin is involved in.
      return res.status(200).json({
        msg: "Policies related to admin",
        "Type of user": userType,
      });
    } else if (userType === "HEmp") {
      return res.status(200).json({
        msg: "Policies related to HEmp",
        "Type of user": userType,
      });
    } else {
      return res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: err.message });
  }
};
// read specific policy that admin/HE is involved in to the admin/HEmp
export const getPolicyAdmin_HE = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "admin") {
      //   get all policies that admin is involved in.
      return res.status(200).json({
        msg: "Policy x accessed by Admin",
        "Type of user": userType,
      });
    } else if (userType === "HEmp") {
      return res.status(200).json({
        msg: "Policy x accessed by HEmp",
        "Type of user": userType,
      });
    } else {
      return res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: err.message });
  }
};

// update
// update policy details by admin
export const updatePolicybyAdmin = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "admin") {
      // can he update the policy? yes, then do it.
      return res.status(200).json({
        msg: "Policy updated",
        "Type of user": userType,
      });
    } else {
      return res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: err.message });
  }
};

// delete
// delete policy by admin
export const deletePolicybyAdmin = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "admin") {
      // policy delete by admin
      return res.status(200).json({
        msg: "Policy deleted",
        "Type of user": userType,
      });
    } else {
      return res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: err.message });
  }
};
