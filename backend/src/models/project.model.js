const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: [true, 'Project must be linked to a lead']
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'on_hold', 'cancelled'],
    default: 'ongoing'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    default: 0
  },
  advancePaid: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
