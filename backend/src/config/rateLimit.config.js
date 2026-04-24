/**
 * Rate Limiting Configuration
 *
 * Three tiers:
 *  1. globalLimiter     — applied to ALL routes (generous)
 *  2. authLimiter       — applied to POST auth/login & auth/register (strict)
 *  3. writeLimiter      — applied to POST/PUT/DELETE on data routes (moderate)
 *
 * Why separate tiers?
 *  - Brute-force attacks target auth endpoints -> very low limit there.
 *  - Read-heavy dashboards shouldn't be throttled aggressively.
 *  - Write operations need a middle ground to block bulk abuse.
 */

const rateLimit = require("express-rate-limit");

// ── 1. Global limiter ──────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 300,                   // 300 requests per window per IP
  standardHeaders: true,      // Return RateLimit-* headers (RFC 6585 draft)
  legacyHeaders: false,       // Disable X-RateLimit-* legacy headers
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again in 15 minutes.",
  },
  skipSuccessfulRequests: false,
});

// ── 2. Auth limiter (brute-force protection) ───────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 10,                    // Only 10 login/register attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Please wait 15 minutes.",
  },
  skipSuccessfulRequests: true, // Don't penalise successful logins
});

// ── 3. Write limiter (data mutation protection) ───────────────────────────────
const writeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,  // 10 minutes
  max: 60,                    // 60 write ops per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Write rate limit exceeded. Please slow down.",
  },
});

module.exports = { globalLimiter, authLimiter, writeLimiter };
