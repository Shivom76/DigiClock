const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// REGISTER — creates a new user. Password hashing happens automatically
// in the User model's pre("save") hook (bcrypt salt + hash), so the
// plaintext password is only ever held in memory for this one request.
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with that email already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user)
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN — verifies credentials with bcrypt.compare() against the stored
// hash and issues a JWT on success. The password field is select: false
// on the schema, so it's explicitly requested here with .select("+password").
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    // Same generic message whether the email doesn't exist or the password
    // is wrong — avoids revealing which emails are registered.
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user)
    });
  } catch (error) {
    next(error);
  }
};

// GET CURRENT USER — used by the frontend to restore a session on refresh.
exports.getMe = async (req, res, next) => {
  try {
    // req.user is set by the `protect` middleware
    res.status(200).json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    });
  } catch (error) {
    next(error);
  }
};
