/**
 * Seed Script — creates an initial admin user
 * Run: node src/seed.js
 */
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const User = require("./models/user.model");

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const existing = await User.findOne({ email: "admin@twoleafservices.com" });
  if (existing) {
    console.log("Admin user already exists");
    process.exit(0);
  }

  await User.create({
    name: "Super Admin",
    email: "admin@twoleafservices.com",
    password: "Admin@1234",
    role: "admin",
  });

  console.log("✅ Admin seeded: admin@twoleafservices.com / Admin@1234");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
