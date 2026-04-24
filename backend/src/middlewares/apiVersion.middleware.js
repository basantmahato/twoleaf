/**
 * API Version Middleware
 *
 * Attaches the detected API version to req.apiVersion so controllers
 * can branch behaviour for backward compatibility.
 *
 * Version is read from (priority order):
 *  1. URL path prefix      — /api/v1/...  (canonical, preferred)
 *  2. X-API-Version header — X-API-Version: 1
 *  3. Query param          — ?api_version=1
 *  4. Default              — current stable version (CURRENT_VERSION)
 */

const CURRENT_VERSION = "v1";
const SUPPORTED_VERSIONS = ["v1"]; // Add "v2", "v3" here as you release them

const apiVersion = (req, res, next) => {
  // Extract version from URL (e.g. /api/v1/leads → "v1")
  const pathMatch = req.path.match(/^\/v(\d+)/);
  const pathVersion = pathMatch ? `v${pathMatch[1]}` : null;

  // Header-based version (normalise "1" → "v1")
  const headerVersion = req.headers["x-api-version"]
    ? `v${req.headers["x-api-version"].replace(/^v/, "")}`
    : null;

  // Query-based version
  const queryVersion = req.query.api_version
    ? `v${String(req.query.api_version).replace(/^v/, "")}`
    : null;

  const requested = pathVersion || headerVersion || queryVersion || CURRENT_VERSION;

  if (!SUPPORTED_VERSIONS.includes(requested)) {
    return res.status(400).json({
      success: false,
      message: `API version '${requested}' is not supported. Supported versions: ${SUPPORTED_VERSIONS.join(", ")}`,
      supportedVersions: SUPPORTED_VERSIONS,
      currentVersion: CURRENT_VERSION,
    });
  }

  req.apiVersion = requested;

  // Advertise API version info in every response
  res.setHeader("X-API-Version", requested);
  res.setHeader("X-API-Current-Version", CURRENT_VERSION);

  next();
};

module.exports = { apiVersion, CURRENT_VERSION, SUPPORTED_VERSIONS };
