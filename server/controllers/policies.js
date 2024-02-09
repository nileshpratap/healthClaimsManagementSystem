// controllers for policies

// create
// policy creation only by admin
export const createPolicybyAdmin = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "admin") {
      // take a decision to create a policy
      res.status(200).json({
        msg: "Policy created",
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

// read functions by user
// showing all policies of a user to the user
export const getUserPolicies = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "user") {
      //   get user's policies from postgresql and return
      res.status(200).json({
        msg: "Policies of a user",
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
// showing specific policy of a user to the user
export const getUserPolicybyId = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "user") {
      //   get user's policy from postgresql and return
      res.status(200).json({
        msg: "Policy of a user",
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

// read functions by admin
// read all policies that admin/HE is involved in to the admin/HEmp
export const getPoliciesAdmin_HE = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "admin") {
      //   get all policies that admin is involved in.
      res.status(200).json({
        msg: "Policies related to admin",
        "Type of user": userType,
      });
    } else if (userType === "HEmp") {
      res.status(200).json({
        msg: "Policies related to  HEmp",
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
// read specific policy that admin/HE is involved in to the admin/HEmp
export const getPolicyAdmin_HE = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "admin") {
      //   get all policies that admin is involved in.
      res.status(200).json({
        msg: "Policy x accessed by Admin",
        "Type of user": userType,
      });
    } else if (userType === "HEmp") {
      res.status(200).json({
        msg: "Policy x accessed by HEmp",
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
// update policy details by admin
export const updatePolicybyAdmin = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "admin") {
      // can he update the policy? yes, then do it.
      res.status(200).json({
        msg: "Policy updated",
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
// delete policy by admin
export const deletePolicybyAdmin = async (req, res) => {
  try {
    const userType = req.query.type;
    if (userType === "admin") {
      // policy delete by admin
      res.status(200).json({
        msg: "Policy deleted",
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
