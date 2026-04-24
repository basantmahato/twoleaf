const express = require("express");
const router = express.Router();
const { register, login, getMe, getAllUsers } = require("../controllers/auth.controller");
const { protect, restrictTo } = require("../middlewares/auth.middleware");

// Public routes
router.post("/login", login);

// Authenticated routes
router.get("/me", protect, getMe);

// Admin-only: register new users (create accounts with any role)
router.post("/register", protect, restrictTo("admin"), register);

// Admin-only: list all users
router.get("/users", protect, restrictTo("admin"), getAllUsers);

module.exports = router;
