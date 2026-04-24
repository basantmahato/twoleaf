const express = require("express");
const router = express.Router();
const {
  createLead, getLeads, getLeadById, updateLead, deleteLead, getLeadStats
} = require("../controllers/leads.controller");
const { protect, restrictTo } = require("../middlewares/auth.middleware");

// All lead routes require authentication
router.use(protect);

// Stats — admin & manager only (must come before /:id)
router.get("/stats", restrictTo("admin", "manager"), getLeadStats);

// CRUD — all authenticated users
router.route("/")
  .get(getLeads)
  .post(createLead);

router.route("/:id")
  .get(getLeadById)
  .put(updateLead)
  .delete(restrictTo("admin", "manager"), deleteLead); // delete restricted

module.exports = router;
