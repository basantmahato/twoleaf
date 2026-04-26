/**
 * CORS Configuration
 * Centralised allowed-origins list so it's easy to extend for future
 * environments (staging, prod CDN, etc.) without touching server.js.
 */

const allowedOrigins = [
  "https://www.twoleafservices.com",        // Vite dev
  "http://localhost:3000",        // Next.js dev
  "http://localhost:3001",        // Alt dev port
  process.env.CLIENT_URL,        // Production frontend (set in .env)
].filter(Boolean); // Remove undefined entries

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, mobile apps, SSR)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin) || origin.startsWith('http://192.168.')) {
      return callback(null, true);
    }
    callback(new Error(`CORS policy: origin '${origin}' is not allowed`));
  },
  credentials: true,              // Allow cookies / Authorization header
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-API-Version"],
  exposedHeaders: ["X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset"],
};

module.exports = corsOptions;
