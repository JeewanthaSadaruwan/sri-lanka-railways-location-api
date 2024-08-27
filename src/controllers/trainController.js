const trainService = require('../services/trainService');

// Create a new train
exports.createTrain = async (req, res) => {
  try {
    const train = await trainService.createTrain(req.body);
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all trains
exports.getTrains = async (req, res) => {
  try {
    const trains = await trainService.getTrains();
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a train by ID
exports.getTrainById = async (req, res) => {
  try {
    const train = await trainService.getTrainById(req.params.trainId);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.status(200).json(train);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a train by ID
exports.updateTrain = async (req, res) => {
  try {
    const updatedTrain = await trainService.updateTrain(req.params.trainId, req.body);
    if (!updatedTrain) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.status(200).json(updatedTrain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a train by ID
exports.deleteTrain = async (req, res) => {
  try {
    const deletedTrain = await trainService.deleteTrain(req.params.trainId);
    if (!deletedTrain) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.status(200).json({ message: 'Train deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch train history logs
exports.getTrainHistory = async (req, res) => {
  try {
    const history = await trainService.getTrainHistory();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

