/**
 * Helmet Configuration
 * Sets security-related HTTP response headers.
 * Each directive is explicitly documented so future devs understand the tradeoffs.
 */

const helmetOptions = {
  // Content-Security-Policy — tightened but allows same-origin scripts/styles
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // needed for inline styles in API docs
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  // Prevent MIME-type sniffing
  noSniff: true,
  // Only send Referer header for same-origin requests
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  // HTTP Strict Transport Security (HSTS) — 1 year in production
  hsts: {
    maxAge: process.env.NODE_ENV === "production" ? 31536000 : 0,
    includeSubDomains: true,
    preload: process.env.NODE_ENV === "production",
  },
  // Prevent clickjacking
  frameguard: { action: "deny" },
  // Disable X-Powered-By
  hidePoweredBy: true,
  // XSS filter (legacy browsers)
  xssFilter: true,
  // Prevent IE from opening downloads in the site context
  ieNoOpen: true,
};

module.exports = helmetOptions;
