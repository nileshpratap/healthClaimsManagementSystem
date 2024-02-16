import express from "express";
import {
  createClaim,
  showClaims,
  showClaimsofPolicy,
  showClaim,
  updateClaim,
  cancelClaim,
} from "../controllers/claims.js";

const router = express.Router();

// create routes
// by user
router.post("/create", createClaim);

// read routes
// by user/admin/HEmp
// show all claims related to x
router.get("/showAll", showClaims);
// show all claims related to x's y policy
router.get("/showAllforPolicy", showClaimsofPolicy);
// show claim y related to x
router.get("/show", showClaim);

// update routes
// by user/admin/HEmp
router.patch("/update", updateClaim);

// delete routes
// by user
router.delete("/delete", cancelClaim);

export default router;
