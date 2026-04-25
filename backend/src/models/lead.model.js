const mongoose = require("mongoose");
const Counter = require("./counter.model");

const leadSchema = new mongoose.Schema(
  {
    leadId: {
      type: Number,
      unique: true
    },
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: ["website", "referral", "social", "email", "cold_call", "other", "contact_form", "start_project_page"],
      default: "website",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal", "closed_won", "closed_lost"],
      default: "new",
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
    value: {
      type: Number,
      default: 0,
      min: 0,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
  },
  { timestamps: true }
);

// Auto-increment ID before save
leadSchema.pre("save", async function () {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "leadId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.leadId = counter.seq;
  }
});

// Text search index
leadSchema.index({ name: "text", email: "text", company: "text" });

module.exports = mongoose.model("Lead", leadSchema);
