// controllers for claims

// create
// by user or HEmp
export const createClaim = async (req, res) => {
  try {
    // create a claim in postgresql
    const userType = req.query.type;
    if (userType === "customer") {
      res.status(200).json({
        msg: "claim created by customer",
        "Type of user": userType,
      });
    } else if (userType === "HEmp") {
      res.status(200).json({
        msg: "claim created by HEmp",
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

// read
// show all claims related to x
export const showClaims = async (req, res) => {
  // use postgresql
  const userType = req.query.type;
  try {
    if (userType === "customer") {
      res.status(200).json({
        msg: "all claims related to customer",
        "Type of user": userType,
      });
    } else if (userType === "admin") {
      res.status(200).json({
        msg: "all claims related to admin",
        "Type of user": userType,
      });
    } else if (userType === "HEmp") {
      res.status(200).json({
        msg: "lall claims related to HEmp",
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

// show all claims related to x's y policy
export const showClaimsofPolicy = async (req, res) => {
  // use postgresql
  const userType = req.query.type;
  try {
    if (userType === "customer") {
      res.status(200).json({
        msg: "all claims of the policy to the customer",
        "Type of user": userType,
      });
    } else if (userType === "admin") {
      res.status(200).json({
        msg: "all claims of the policy to the admin",
        "Type of user": userType,
      });
    } else if (userType === "HEmp") {
      res.status(200).json({
        msg: "all claims of the policy to the HEmp",
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
    } else if (userType === "HEmp") {
      res.status(200).json({
        msg: "showing claim related to the HEmp",
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
      res.status(200).json({
        msg: "Claim updated by customer",
        "Type of user": userType,
      });
    } else if (userType === "admin") {
      res.status(200).json({
        msg: "Claim updated by admin",
        "Type of user": userType,
      });
    } else if (userType === "HEmp") {
      res.status(200).json({
        msg: "Claim updated by HEmp",
        "Type of user": userType,
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

// delete
// delete a claim by customer
export const deleteClaim = async (req, res) => {
  try {
    // delete claim from postgresql
    const userType = req.query.type;
    if (userType === "customer") {
      // policy delete by admin
      res.status(200).json({
        msg: "Claim Deleted",
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
