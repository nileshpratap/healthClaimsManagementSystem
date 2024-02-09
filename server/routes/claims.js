import express from "express";
import {
  createClaim,
  showClaims,
  showClaimsofPolicy,
  showClaim,
  updateClaim,
  deleteClaim,
} from "../controllers/claims.js";

const router = express.Router();

// create routes
// by user or HEmp
router.post("/create/:uid/:pid", createClaim);

// read routes
// by user/admin/HEmp
// show all claims related to x
router.get("/showAll/:id/", showClaims);
// show all claims related to x's y policy
router.get("/showAll/:id/:pid", showClaimsofPolicy);
// show claim y related to x
router.get("/show/:id/:cid", showClaim);

// update routes
// by user/admin/HEmp
router.put("/update/:id/:cid", updateClaim);

// delete routes
// by user
router.delete("delete/:uid/:pid/:cid", deleteClaim);

export default router;
