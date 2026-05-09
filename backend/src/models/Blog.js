const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  category: {
    type: String,
    required: true,
    default: 'General'
  },
  author: {
    type: String,
    default: 'TwoLeaf Team'
  },
  date: {
    type: Date,
    default: Date.now
  },
  seoTitle: {
    type: String,
    trim: true
  },
  seoDesc: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
