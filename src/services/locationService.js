const Location = require('../models/locationModel');
const cron = require('node-cron');

// Create a new location
exports.createLocation = async (locationData) => {
  const location = new Location(locationData);
  return await location.save();
};

// Get current location
exports.getCurrentLocation = async (trainId) => {
  return await Location.findOne({ trainId }).sort({ timestamp: -1 });
};

// Get all locations
exports.getLocations = async (filters) => {
  const { trainId, startDate, endDate } = filters;
  let query = {};
  if (trainId) query.trainId = trainId;
  if (startDate && endDate) {
    query.timestamp = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }
  return await Location.find(query);
};

// Run cleanup job every minute

// Function to get the current time in Sri Lankan timezone (UTC+5:30)
const getSriLankanTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 330); // Add 330 minutes (5 hours 30 minutes) to convert UTC to SLT
    return now;
  };

cron.schedule('* * * * *', async () => {
    const twoMinutesAgo = getSriLankanTime();
    twoMinutesAgo.setMinutes(twoMinutesAgo.getMinutes() - 2);
    
    try {
      await Location.deleteMany({ timestamp: { $lt: twoMinutesAgo } });
      console.log('Cleaned up old location history records older than 2 minutes.');
    } catch (error) {
      console.error('Error cleaning up old location history records:', error);
    }
  });

// // Function to get the current time in Sri Lankan timezone (UTC+5:30)
// const getSriLankanTime = () => {
//     const now = new Date();
//     now.setMinutes(now.getMinutes() + 330); // Add 330 minutes (5 hours 30 minutes) to convert UTC to SLT
//     return now;
//   };
  
//   // Run cleanup job every day at midnight
//   cron.schedule('0 0 * * *', async () => {
//     const ninetyDaysAgo = getSriLankanTime();
//     ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90); // Subtract 90 days
    
//     try {
//       await LocationHistory.deleteMany({ timestamp: { $lt: ninetyDaysAgo } });
//       console.log('Cleaned up old location history records older than 90 days.');
//     } catch (error) {
//       console.error('Error cleaning up old location history records:', error);
//     }
//   });
