// controllers for policies
import { constants } from "buffer";
import { prisma } from "../server.js";

// create
// policy creation only by admin

export const checkUserValidity = async (dbname, id, mail, res, userType) => {
  // finding customer in the db with details in the request
  let foundUser;

  if (dbname === "customers") {
    foundUser = await prisma[dbname].findUnique({
      where: { UID: id },
    });
  } else if (dbname === "admins") {
    foundUser = await prisma[dbname].findUnique({
      where: { EID: id },
    });
  }

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

      const { UID, Email } = req.user;
      const { StartDate, EndDate, PAmount } = req.body;

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
          PBalance: PAmount,
        },
      });
      const pid = createdPolicy.PID;
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
        createdPolicy,
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

// read functions by user
// showing all policies of a user to the user
export const getUserPolicies = async (req, res) => {
  try {
    const userType = req.query.type;
    const { UID, Email } = req.user;
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

      if (customer.PIDs.indexOf(PID) === -1) {
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
export const getPoliciesAdmin = async (req, res) => {
  try {
    const userType = req.query.type;
    const { EID, Email } = req.user;
    if (userType === "admin") {
      //   get all policies that admin is involved in.
      console.log("hi");
      const UserValidity = await checkUserValidity(
        "admins",
        EID,
        Email,
        res,
        userType
      );
      if (UserValidity.type !== true) {
        return UserValidity;
      }
      const admin = UserValidity.user;

      // scrape policie table to find all rows with EID = admin.EID.
      const adminPolicies = await prisma.policies.findMany({
        where: {
          EID: EID,
        },
      });

      return res.status(200).json({
        msg: "Policies related to admin",
        "Type of user": userType,
        adminPolicies,
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
// read specific policy that admin/HE is involved in to the admin/HEmp
export const getPolicyAdmin = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "admin") {
      //   get all policies that admin is involved in.
      return res.status(200).json({
        msg: "Policy x accessed by Admin",
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
    const { EID, Email, PID, Status } = req.body;
    if (userType === "admin") {
      //   get all policies that admin is involved in.
      const UserValidity = await checkUserValidity(
        "admins",
        EID,
        Email,
        res,
        userType
      );
      if (UserValidity.type !== true) {
        return UserValidity;
      }
      const admin = UserValidity.user;

      const updatedPolicy = await prisma.policies.update({
        where: { PID },
        data: { Status },
      });

      return res.status(200).json({
        msg: "Policies updated by admin",
        "Type of user": userType,
        updatedPolicy,
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
    const { EID, Email, PID } = req.body;
    if (userType === "admin") {
      //   get all policies that admin is involved in.
      const UserValidity = await checkUserValidity(
        "admins",
        EID,
        Email,
        res,
        userType
      );
      if (UserValidity.type !== true) {
        return UserValidity;
      }
      const admin = UserValidity.user;

      // delete the pid from user's pids column
      // update user row by adding a policy id in the table
      const policyDetails = await prisma.policies.findFirst({
        where: { PID },
      });
      if (!policyDetails) {
        return res.status(404).json({
          msg: "Policy with this PID not found, recheck your details",
          "Type of user": userType,
        });
      }
      const olduser = await prisma.customers.findFirst({
        where: { UID: policyDetails.UID },
      });
      const oldPolicies = olduser.PIDs;
      const newPolicies = oldPolicies.filter((id) => id !== PID);
      const updatedUser = await prisma.customers.update({
        where: { UID: policyDetails.UID },
        data: { PIDs: newPolicies },
      });

      const deleteResponse = await prisma.policies.delete({
        where: { PID },
      });
      return res.status(200).json({
        msg: `Policy with id ${PID} deleted by admin`,
        "Type of user": userType,
        updatedUser,
        deleteResponse,
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
