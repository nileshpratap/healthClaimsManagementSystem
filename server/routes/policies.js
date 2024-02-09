import express from "express";
import {
  createPolicybyAdmin,
  getUserPolicies,
  getUserPolicybyId,
  getPoliciesAdmin_HE,
  getPolicyAdmin_HE,
  updatePolicybyAdmin,
  deletePolicybyAdmin,
} from "../controllers/policies.js";
const router = express.Router();

// create
router.post("/create/", createPolicybyAdmin);

// read
// by user
router.get("/showAllforUser/:uid", getUserPolicies);
router.get("/showforUser/:uid/:pid", getUserPolicybyId);
// by admin
router.get("/showAllforAdmin_HE/:aid", getPoliciesAdmin_HE);
router.get("/showforAdmin_HE/:id/:pid", getPolicyAdmin_HE);

// update
router.put("/update/:aid/:pid", updatePolicybyAdmin);

// delete
router.delete("/delete/:aid/:pid", deletePolicybyAdmin);

export default router;
