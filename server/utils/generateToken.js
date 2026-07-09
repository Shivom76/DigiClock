const jwt = require("jsonwebtoken");

/**
 * Generates a signed JSON Web Token containing the user's MongoDB ID
 * @param {string} id - The MongoDB _id of the user/operator
 */
const generateToken = (user) => {
  return jwt.sign({ id:user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token remains valid for 30 days
  });
};

// Exporting as a named property on an object
module.exports = { generateToken };