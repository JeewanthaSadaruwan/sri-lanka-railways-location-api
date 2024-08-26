const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  trainId: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  speed: {
    type: Number,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Location', locationSchema);
