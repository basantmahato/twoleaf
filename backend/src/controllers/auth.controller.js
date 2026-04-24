const User = require("../models/user.model");
const { generateAccessToken, generateRefreshToken } = require("../middlewares/auth.middleware");
const jwt = require("jsonwebtoken");

// ── POST /api/auth/register ───────────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    // Only admins can create admin/manager accounts — enforced in route
    const user = await User.create({ name, email, password, role: role || "agent" });
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── POST /api/auth/login ──────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/auth/me ──────────────────────────────────────────
const getMe = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

// ── GET /api/auth/users (admin only) ─────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── POST /api/auth/refresh ────────────────────────────────────
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: "Refresh token is required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(user._id, user.role);

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
  }
};

module.exports = { register, login, getMe, getAllUsers, refreshToken };
