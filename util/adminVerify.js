const jwt = require("jsonwebtoken");

const adminVerify = (req, res, next) => {
  const token = req.headers["token"];

  // Check if token is provided
  if (!token) return res.status(401).send("No token provided!");

  // Check if token is valid
  jwt.verify(token, "SECRET", (err, decoded) => {
    if (err) return err;
    // Check if user is admin
    if (!decoded.admin) return res.status(403).send("You are NOT an admin!");
    req.userData = {
      userId: decoded.userId,
    };
    next();
  });
};

module.exports = adminVerify;
