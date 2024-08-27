const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainId: {
    type: String,
    required: true,
    unique: true,
  },
  trainName: {
    type: String,
    required: true,
  },
  engineNo: {
    type: String, 
    required: true,
    unique: true,
  },
  routeId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Train', trainSchema);
