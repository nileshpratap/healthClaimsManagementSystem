import express from "express";
import {
  createPolicybyUser,
  getUserPolicies,
  getUserPolicybyId,
  getPoliciesAdmin_HE,
  getPolicyAdmin_HE,
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
router.get("/showAllforAdmin_HE/:id", getPoliciesAdmin_HE);
router.get("/showforAdmin_HE/:id/:pid", getPolicyAdmin_HE);

// update
router.patch("/update/:aid/:pid", updatePolicybyAdmin);

// delete
router.delete("/delete/:aid/:pid", deletePolicybyAdmin);

export default router;
