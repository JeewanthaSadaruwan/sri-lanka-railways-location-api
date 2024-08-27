const mongoose = require('mongoose');

// Function to get current time in Sri Lankan timezone (UTC+5:30)
const getSriLankanTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 330); // Add 330 minutes (5 hours 30 minutes) to convert UTC to SLT
    return now;
  };

const trainHistorySchema = new mongoose.Schema({
  trainId: {
    type: String,
    required: true,
  },
  trainName: {
    type: String,
    required: true,
  },
  routeId: {
    type: String,
    required: true,
  },
  engineNo: {
    type: String,
    required: true,
  },
  operation: {
    type: String,
    required: true,
    enum: ['CREATE', 'UPDATE', 'DELETE'],
  },
  timestamp: {
    type: Date,
    default: getSriLankanTime,
  },
});

module.exports = mongoose.model('TrainHistory', trainHistorySchema);
