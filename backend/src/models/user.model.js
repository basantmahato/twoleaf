const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Counter = require("./counter.model");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // never return password by default
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-increment ID and Hash password before save
userSchema.pre("save", async function (next) {
  // Handle userId increment
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.userId = counter.seq;
    } catch (error) {
      return next(error);
    }
  }

  // Handle password hashing
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method: compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
