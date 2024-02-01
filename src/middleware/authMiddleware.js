const jwt = require("jsonwebtoken");

// Middleware function to check the JWT token
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    // Redirect to signup page if token is missing
    return res.redirect("/signup");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Redirect to signup page if token is invalid
      return res.redirect("/signup");
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
