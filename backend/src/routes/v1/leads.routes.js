/**
 * Leads Routes — v1
 * Mounted at: /api/v1/leads
 */

const express = require("express");
const router = express.Router();
const {
  createLead, getLeads, getLeadById, updateLead, deleteLead, getLeadStats,
} = require("../../controllers/leads.controller");
const { protect, restrictTo } = require("../../middlewares/auth.middleware");
const { writeLimiter } = require("../../config/rateLimit.config");

// Public lead creation (from website forms)
router.post("/", writeLimiter, createLead);

// Protected routes below
router.use(protect);

// Stats — all authenticated users (must come before /:id)
router.get("/stats", getLeadStats);

// CRUD — all authenticated users
router.route("/")
  .get(getLeads);

router.route("/:id")
  .get(getLeadById)
  .put(writeLimiter, updateLead)
  .delete(writeLimiter, deleteLead);

module.exports = router;
