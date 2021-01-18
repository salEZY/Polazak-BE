const jwt = require("jsonwebtoken");

const userVerify = (req, res, next) => {
  const token = req.headers["token"];

  // Check if token is provided
  if (!token) return res.status(401).send("No token provided!");

  // Check if token is valid
  jwt.verify(token, "SECRET", (err, decoded) => {
    if (err) return err;
    req.userData = {
      userId: decoded.userId,
    };
    next();
  });
};

module.exports = userVerify;
