const Train = require('../models/trainModel');
const TrainHistory = require('../models/trainHistoryModel'); 

// Helper function to save a history log
const saveHistory = async (train, operation) => {
  const history = new TrainHistory({
    trainId: train.trainId,
    trainName: train.trainName,
    routeId: train.routeId,
    engineNo: train.engineNo,
    operation,
  });
  await history.save();
};

// Create a new train
exports.createTrain = async (trainData) => {
  const train = new Train(trainData);
  await train.save();
  await saveHistory(train, 'CREATE'); // Save history log
  return train;
};

// Get all trains
exports.getTrains = async () => {
  return await Train.find();
};

// Get a train by ID
exports.getTrainById = async (trainId) => {
  return await Train.findOne({ trainId });
};

// Update a train by ID
exports.updateTrain = async (trainId, updateData) => {
  const train = await Train.findOneAndUpdate({ trainId }, updateData, { new: true });
  if (train) {
    await saveHistory(train, 'UPDATE'); // Save history log
  }
  return train;
};

// Delete a train by ID
exports.deleteTrain = async (trainId) => {
  const train = await Train.findOneAndDelete({ trainId });
  if (train) {
    await saveHistory(train, 'DELETE'); // Save history log
  }
  return train;
};

// Fetch all train history logs
exports.getTrainHistory = async () => {
  return await TrainHistory.find().sort({ timestamp: -1 }); // Sort by latest first
};


