// controllers for claims
import { prisma } from "../server.js";
import { checkUserValidity } from "./policies.js";
// create
// by user
export const createClaim = async (req, res) => {
  try {
    // create a claim in postgresql
    const userType = req.query.type;
    if (userType === "customer") {
      const { UID, Email } = req.user;
      const { PID, CAmt } = req.body;

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

      // finding policy by PID
      const policy = await prisma.policies.findUnique({
        where: {
          PID: PID,
        },
      });
      if (!policy) {
        return res.status(404).json({
          msg: "Policy doesn't exists",
          "Type of user": userType,
        });
      }
      if (policy.UID !== UID) {
        return res.status(404).json({
          msg: "Policy doesn't belong to you",
          "Type of user": userType,
        });
      }

      // the claim Req amount should be <= PBalance

      if (CAmt > policy["PBalance"]) {
        return res.status(401).json({
          msg: "Claim can't be created, amount is more than the policy balance",
          "Type of user": userType,
        });
      }
      // create a claim row and add an item in policies's Claims array
      const createdClaim = await prisma.claims.create({
        data: {
          PID,
          UID,
          CAmt,
        },
      });

      // update policy row
      const updatedPolicy = await prisma.policies.update({
        where: { PID },
        data: {
          Claims: {
            push: createdClaim.CID,
          },
        },
      });
      return res.status(200).json({
        msg: "claim created by customer",
        "Type of user": userType,
        createdClaim,
      });
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

// read
// show all claims related to customer
export const showClaims = async (req, res) => {
  // use postgresql
  const userType = req.query.type;
  try {
    if (userType === "customer") {
      const { UID, Email } = req.body;

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

      const claims = await prisma.claims.findMany({
        where: {
          UID,
        },
      });

      if (!claims) {
        return res.status(400).json({
          msg: "no claims found for this user",
          "Type of user": userType,
        });
      }
      return res.status(200).json({
        msg: "all claims related to customer",
        "Type of user": userType,
        claims,
      });
    } else if (userType === "admin") {
      const { EID, Email } = req.body;

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

      const claims = await prisma.claims.findMany({
        where: {
          EID,
        },
      });

      if (!claims) {
        return res.status(400).json({
          msg: "No claims found for this admin",
          "Type of user": userType,
        });
      }
      return res.status(200).json({
        msg: "All claims related to admin",
        "Type of user": userType,
        claims,
      });
    } else {
      return res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

// show all claims related to x's y policy
export const showClaimsofPolicy = async (req, res) => {
  // use postgresql
  const userType = req.query.type;
  try {
    if (userType === "customer") {
      const { UID, Email, PID } = req.body;

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

      const claims = await prisma.claims.findMany({
        where: {
          AND: {
            UID,
            PID,
          },
        },
      });

      if (!claims) {
        return res.status(400).json({
          msg: "no claims found for this policy",
          "Type of user": userType,
        });
      }
      return res.status(200).json({
        msg: "all claims related to policy",
        "Type of user": userType,
        claims,
      });
    } else if (userType === "admin") {
      const { EID, Email, PID } = req.body;
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
      const customer = UserValidity.user;

      const claims = await prisma.claims.findMany({
        where: {
          AND: {
            EID,
            PID,
          },
        },
      });

      if (!claims) {
        return res.status(400).json({
          msg: "no claims found for this policy",
          "Type of user": userType,
        });
      }
      return res.status(200).json({
        msg: "all claims related to policy",
        "Type of user": userType,
        claims,
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

// show claim y related to x
export const showClaim = async (req, res) => {
  // use postgresql
  const userType = req.query.type;
  try {
    if (userType === "customer") {
      res.status(200).json({
        msg: "showing claim related to the customer",
        "Type of user": userType,
      });
    } else if (userType === "admin") {
      res.status(200).json({
        msg: "showing claim related to the admin",
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
// by user/admin/HEmp
export const updateClaim = async (req, res) => {
  // use postgresql and mongoDB
  try {
    const userType = req.query.type;
    if (userType === "customer") {
      const { CID, UID, Email, PID, CAmt } = req.body;
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

      let claim = await prisma.claims.findMany({
        where: {
          AND: {
            CID,
            UID,
            PID,
          },
        },
      });

      if (claim.length === 0) {
        return res.status(400).json({
          msg: "no claims found for given details",
          "Type of user": userType,
        });
      }
      claim = claim[0];
      if (claim.Status === "Under Review") {
        // check if the policy balance is < CAmt
        const policy = await prisma.policies.findFirst({ where: { PID } });
        if (policy && policy["PBalance"] - claim.CAmt < CAmt) {
          return res.status(400).json({
            msg: "claim amount is higher than your policy balance",
            "Type of user": userType,
          });
        }

        // update the claim's CAmt
        const updatedClaim = await prisma.claims.update({
          where: { CID },
          data: {
            CAmt,
          },
        });
        return res.status(200).json({
          msg: "Claim updated by customer",
          "Type of user": userType,
          updatedClaim,
        });
      } else {
        return res.status(400).json({
          msg: `claim status is ${claim.Status}, so can't do this operation`,
          "Type of user": userType,
        });
      }
      // customer can update just CAMT
      // check user validity
      // find claim and match UID
      // if the status is approved:
      // then update and change the status and balance amount
      // if the status is pending
      // then just update the CAmt
    } else if (userType === "admin") {
      // check the req.status value
      // admin can just update the status to approved if :
      // 1.req.status is approve
      // also change the policy balance

      const { CID, EID, Email, PID, action } = req.body;
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

      let claim = await prisma.claims.findMany({
        where: {
          AND: {
            CID,
            EID,
            PID,
          },
        },
      });
      if (claim.length === 0) {
        return res.status(400).json({
          msg: "no claims found for given details",
          "Type of user": userType,
        });
      }
      claim = claim[0];
      if (
        claim.Status === "Under Review" &&
        (action === "approve" || action === "decline")
      ) {
        // check if the policy balance is < CAmt
        const policy = await prisma.policies.findFirst({ where: { PID } });
        if (!policy) {
          return res.status(400).json({
            msg: "policy not found",
            "Type of user": userType,
          });
        }
        // decline the claim
        if (action === "decline") {
          const updatedClaim = await prisma.claims.update({
            where: { CID },
            data: {
              Status: "declined",
            },
          });
          return res.status(200).json({
            msg: "Claim declined by admin",
            "Type of user": userType,
            updatedClaim,
          });
        }

        const newPBalance = policy["PBalance"] - claim.CAmt;
        if (newPBalance < 0) {
          return res.status(400).json({
            msg: "claim amount is higher than your policy balance",
            "Type of user": userType,
          });
        }
        const updatedPolicy = await prisma.policies.update({
          where: { PID },
          data: {
            PBalance: newPBalance,
          },
        });
        const updatedClaim = await prisma.claims.update({
          where: { CID },
          data: {
            Status: "approved",
          },
        });
        return res.status(200).json({
          msg: "Claim updated by admin",
          "Type of user": userType,
          updatedClaim,
        });
      } else {
        return res.status(400).json({
          msg: `claim status is ${claim.Status}, so can't do this operation`,
          "Type of user": userType,
        });
      }

      // res.status(200).json({
      //   msg: "Claim updated by admin",
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

// delete
// delete a claim by customer
export const cancelClaim = async (req, res) => {
  try {
    // change claim status to cancelled
    const userType = req.query.type;
    if (userType === "customer") {
      const { CID, UID, Email, PID } = req.body;
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

      let claim = await prisma.claims.findMany({
        where: {
          AND: {
            CID,
            UID,
            PID,
          },
        },
      });
      if (claim.length === 0) {
        return res.status(400).json({
          msg: "no claims found for given details",
          "Type of user": userType,
        });
      }
      claim = claim[0];
      if (claim.Status !== "Under Review") {
        return res.status(400).json({
          msg: "claim can be deleted only if it is under review",
          "Type of user": userType,
        });
      }
      const policy = await prisma.policies.findUnique({ where: { PID } });
      const newpclaims = policy.Claims.filter((c) => {
        return c !== CID;
      });
      const updatedPolicy = await prisma.policies.update({
        where: { PID },
        data: { Claims: newpclaims },
      });
      const deletedClaim = await prisma.claims.delete({ where: { CID } });

      return res.status(200).json({
        msg: "Claim Deleted",
        "Type of user": userType,
        deletedClaim,
      });
    } else {
      res.status(400).json({
        msg: "customer type invalid",
        "Type of user": userType,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
