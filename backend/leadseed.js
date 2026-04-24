require("dotenv").config();
const mongoose = require("mongoose");
const Lead = require("./src/models/lead.model");
const User = require("./src/models/user.model");

const seedLeads = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // Find a user to assign as creator
    const user = await User.findOne();
    if (!user) {
      console.error("No users found in database. Please create a user first.");
      process.exit(1);
    }

    const dummyLeads = [
      {
        name: "Elon Musk",
        email: "elon@spacex.com",
        company: "SpaceX",
        phone: "+1 123 456 7890",
        source: "referral",
        status: "qualified",
        value: 50000,
        notes: "Interested in architectural software for Mars base colonies.",
        createdBy: user._id
      },
      {
        name: "Satya Nadella",
        email: "satya@microsoft.com",
        company: "Microsoft",
        phone: "+1 987 654 3210",
        source: "website",
        status: "proposal",
        value: 120000,
        notes: "Expanding their cloud infrastructure. Need specialized AI blueprints.",
        createdBy: user._id
      },
      {
        name: "Jensen Huang",
        email: "jensen@nvidia.com",
        company: "NVIDIA",
        phone: "+1 555 123 4444",
        source: "social",
        status: "closed_won",
        value: 85000,
        notes: "Project completed successfully. Implementing real-time rendering systems.",
        createdBy: user._id
      }
    ];

    await Lead.deleteMany({ email: { $in: dummyLeads.map(l => l.email) } });
    await Lead.create(dummyLeads);

    console.log("Successfully seeded 3 dummy leads.");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding leads:", err);
    process.exit(1);
  }
};

seedLeads();
