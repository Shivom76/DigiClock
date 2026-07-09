const jwt = require("jsonwebtoken");
const User = require("../models/User");

// AUTHENTICATION — verifies the JWT sent in the Authorization header and
// attaches the corresponding user to req.user. Any route using this must
// be called with `Authorization: Bearer <token>`.
const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized — no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // password is excluded here since the schema field has select: false
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized — user no longer exists" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized — invalid or expired token" });
  }
};

// AUTHORIZATION — restricts a route to specific roles, e.g. authorize("admin").
// Must run after `protect` so req.user is already populated.
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden — insufficient permissions" });
    }
    next();
  };
};

module.exports = { protect, authorize };
