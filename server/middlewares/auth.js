import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(404)
      .json({ msg: "please login or register in order to make this request!" });
  }
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(403).json({
      msg: "please login or register ethically in order to make this request!",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        msg: "please login or register properly in order to make this request as your token is invalid",
      });
    }
    req.user = user;
    next();
  });
};
