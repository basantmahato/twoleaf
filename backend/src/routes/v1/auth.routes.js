/**
 * Auth Routes — v1
 * Mounted at: /api/v1/auth
 *
 * Rate limits are applied at the v1 router level (src/routes/v1/index.js)
 * so they don't need to be duplicated here.
 */

const express = require("express");
const router = express.Router();
const { register, login, getMe, getAllUsers, refreshToken } = require("../../controllers/auth.controller");
const { protect, restrictTo } = require("../../middlewares/auth.middleware");
const { authLimiter } = require("../../config/rateLimit.config");

// Public — strictly rate-limited against brute force
router.post("/login", authLimiter, login);
router.post("/refresh", refreshToken);

// Authenticated
router.get("/me", protect, getMe);

// Create accounts (still protected)
router.post("/register", protect, authLimiter, register);

// List all users
router.get("/users", protect, getAllUsers);

module.exports = router;
