/**
 * server.js — TwoLeaf API Entry Point
 *
 * Security layers (applied in order):
 *  1. Helmet         — HTTP security headers
 *  2. CORS           — allowed-origins whitelist
 *  3. Global rate limiter — IP-based throttle for all routes
 *  4. Body parsers   — JSON + URL-encoded
 *  5. API version middleware — attaches req.apiVersion, validates version
 *  6. Versioned routers — /api/v1/*, (future: /api/v2/*)
 *  7. Global error handler
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

// ── Config imports ────────────────────────────────────────────
const corsOptions = require("./src/config/cors.config");
const helmetOptions = require("./src/config/helmet.config");
const { globalLimiter } = require("./src/config/rateLimit.config");
const { apiVersion, CURRENT_VERSION } = require("./src/middlewares/apiVersion.middleware");

// ── Versioned routers ─────────────────────────────────────────
const v1Router = require("./src/routes/v1/index");
// const v2Router = require("./src/routes/v2/index"); // ← add when ready

const app = express();

// ── 1. Helmet — security headers ──────────────────────────────
app.use(helmet(helmetOptions));

// ── 2. CORS ────────────────────────────────────────────────────
app.use(cors(corsOptions));
// app.options("/(.*)", cors(corsOptions)); // Redundant in many cases, causing Express 5 PathError

// ── 3. Global rate limiter ─────────────────────────────────────
app.use(globalLimiter);

// ── 4. Body parsers ───────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));         // Prevent oversized payloads
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ── 5. API Version middleware (attached before any /api route) ─
app.use("/api", apiVersion);

// ── 6. Versioned routers ──────────────────────────────────────
app.use("/api/v1", v1Router);
// app.use("/api/v2", v2Router);  // ← uncomment when v2 is released

// ── 7. API root info ──────────────────────────────────────────
app.get("/api", (req, res) => {
  res.json({
    name: "TwoLeaf Services API",
    currentVersion: CURRENT_VERSION,
    supportedVersions: ["v1"],
    docs: "/api/v1/health",
    timestamp: new Date().toISOString(),
  });
});

// ── 8. Health check (unversioned, for load-balancers/uptime) ──
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── 9. 404 handler for unmatched routes ───────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.method} ${req.originalUrl}' not found`,
    hint: `API base path is /api/v1 — see GET /api for info`,
  });
});

// ── 10. Global error handler ──────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // CORS policy errors have no status — return 403
  if (err.message?.startsWith("CORS policy")) {
    return res.status(403).json({ success: false, message: err.message });
  }

  const status = err.status || err.statusCode || 500;
  console.error(`[${new Date().toISOString()}] ${status} — ${err.message}`);

  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

// ── DB + Server Start ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running  → http://localhost:${PORT}`);
      console.log(`📡 API v1 base     → http://localhost:${PORT}/api/v1`);
      console.log(`🛡️  Helmet, CORS, Rate-Limiting: active`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
