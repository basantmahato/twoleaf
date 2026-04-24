const Lead = require("../models/lead.model");

// ── POST /api/leads ────────────────────────────────────────────
const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({ 
      ...req.body, 
      createdBy: req.user ? req.user._id : null 
    });
    res.status(201).json({ success: true, message: "Lead created", lead });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── GET /api/leads ─────────────────────────────────────────────
const getLeads = async (req, res) => {
  try {
    const { status, source, search, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (search) filter.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);
    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Lead.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      leads,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/leads/:id ─────────────────────────────────────────
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });

    res.status(200).json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── PUT /api/leads/:id ─────────────────────────────────────────
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });

    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: "Lead updated", lead: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── DELETE /api/leads/:id (admin/manager only) ─────────────────
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
    res.status(200).json({ success: true, message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/leads/stats (admin/manager only) ─────────────────
const getLeadStats = async (req, res) => {
  try {
    const stats = await Lead.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalValue: { $sum: "$value" },
        },
      },
    ]);
    res.status(200).json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createLead, getLeads, getLeadById, updateLead, deleteLead, getLeadStats };
