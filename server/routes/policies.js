import express from "express";
import {
  createPolicybyUser,
  getUserPolicies,
  getUserPolicybyId,
  getPoliciesAdmin,
  getPolicyAdmin,
  updatePolicybyAdmin,
  deletePolicybyAdmin,
} from "../controllers/policies.js";
const router = express.Router();

// create
router.post("/create", createPolicybyUser);

// read
// by user
router.get("/showAllforUser", getUserPolicies);
router.get("/showforUser", getUserPolicybyId);
// by admin
router.get("/showAllforAdmin", getPoliciesAdmin);
router.get("/showforAdmin", getPolicyAdmin);

// update
router.patch("/update", updatePolicybyAdmin);

// delete
router.delete("/delete", deletePolicybyAdmin);

export default router;
