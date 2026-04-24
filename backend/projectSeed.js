require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("./src/models/project.model");
const Lead = require("./src/models/lead.model");

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // Find the leads we want to link to
    const elon = await Lead.findOne({ email: "elon@spacex.com" });
    const satya = await Lead.findOne({ email: "satya@microsoft.com" });
    const jensen = await Lead.findOne({ email: "jensen@nvidia.com" });

    if (!elon || !satya || !jensen) {
      console.error("Required leads not found. Please run 'node leadseed.js' first.");
      process.exit(1);
    }

    const dummyProjects = [
      {
        title: "MARS COLONY OPERATING SYSTEM",
        lead: elon._id,
        status: "ongoing",
        priority: "high",
        totalAmount: 50000,
        advancePaid: 25000,
        startDate: new Date("2026-04-01"),
        deadline: new Date("2026-12-31"),
        description: "Development of a decentralized, real-time OS for interplanetary habitat management."
      },
      {
        title: "AZURE AI ARCHITECTURE BLUEPRINT",
        lead: satya._id,
        status: "on_hold",
        priority: "medium",
        totalAmount: 120000,
        advancePaid: 40000,
        startDate: new Date("2026-03-15"),
        deadline: new Date("2026-08-20"),
        description: "Designing specialized AI orchestration layers for global cloud nodes."
      },
      {
        title: "OMNIVERSE CORE ENGINE INTEGRATION",
        lead: jensen._id,
        status: "completed",
        priority: "high",
        totalAmount: 85000,
        advancePaid: 85000,
        startDate: new Date("2026-01-10"),
        deadline: new Date("2026-04-15"),
        description: "Successful implementation of real-time rendering pipelines for enterprise digital twins."
      }
    ];

    // Clear existing projects with these titles to avoid duplicates
    await Project.deleteMany({ title: { $in: dummyProjects.map(p => p.title) } });
    
    await Project.insertMany(dummyProjects);

    console.log("Successfully seeded 3 dummy projects linked to leads.");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding projects:", err);
    process.exit(1);
  }
};

seedProjects();
