/**
 * V1 Router — aggregates all v1 routes under one prefix.
 *
 * When v2 is needed, create src/routes/v2/index.js and mount it
 * in server.js as app.use("/api/v2", v2Router) — v1 keeps working.
 */

const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const leadsRoutes = require("./leads.routes");
const projectsRoutes = require("./projects.routes");
const { authLimiter, writeLimiter } = require("../../config/rateLimit.config");

// ── Auth — strict rate limit on sensitive endpoints ────────────
router.use("/auth", authRoutes);
// Attach auth-specific limiter to login/register only
router.post("/auth/login", authLimiter);
router.post("/auth/register", authLimiter);

// ── Leads — write limiter on mutating methods ──────────────────
router.use("/leads", leadsRoutes);

// ── Projects ───────────────────────────────────────────────────
router.use("/projects", projectsRoutes);

// ── v1 health sub-check ────────────────────────────────────────
router.get("/health", (req, res) => {
  res.json({
    success: true,
    version: "v1",
    status: "operational",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
