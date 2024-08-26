const mongoose = require('mongoose');

// Function to get current time in Sri Lankan timezone (UTC+5:30)
const getSriLankanTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 330); // Add 330 minutes (5 hours 30 minutes) to convert UTC to SLT
    return now;
  };

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
    default: getSriLankanTime,
  },
  speed: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Location', locationSchema);
