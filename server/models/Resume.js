const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  botId: {
    type: String,
    unique: true,
    required: true,
  },
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    location: String,
    linkedIn: String,
    github: String,
    portfolio: String,
    profileImage: String,
  },
  summary: {
    type: String,
    maxlength: 1000,
  },
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    gpa: String,
    achievements: [String],
  }],
  experience: [{
    company: String,
    position: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    responsibilities: [String],
  }],
  skills: {
    technical: [String],
    soft: [String],
    languages: [String],
    tools: [String],
  },
  projects: [{
    name: String,
    description: String,
    technologies: [String],
    link: String,
    github: String,
    highlights: [String],
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    credentialId: String,
    link: String,
  }],
  achievements: [String],
  isPublic: {
    type: Boolean,
    default: true,
  },
  theme: {
    primaryColor: { type: String, default: '#0ea5e9' },
    backgroundColor: { type: String, default: '#ffffff' },
    fontFamily: { type: String, default: 'Inter' },
  },
  analytics: {
    views: { type: Number, default: 0 },
    interactions: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

resumeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Resume', resumeSchema);
