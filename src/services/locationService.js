const Location = require('../models/locationModel');

exports.createLocation = async (locationData) => {
    console.log("service >>>>>>>>>")
  const location = new Location(locationData);
  console.log("location >>>>>>>>>", location);
  return await location.save();
};

exports.getCurrentLocation = async (trainId) => {
  return await Location.findOne({ trainId }).sort({ timestamp: -1 });
};

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

exports.getRoute = async (trainId, startDate, endDate) => {
  return await Location.find({
    trainId,
    timestamp: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  }).sort({ timestamp: 1 });
};


