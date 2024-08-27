const locationService = require('../services/locationService');

// Create a new location
exports.createLocation = async (req, res) => {
  try {
    const locationData = req.body;
    const location = await locationService.createLocation(locationData);
    res.status(201).json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get current location
exports.getCurrentLocation = async (req, res) => {
  try {
    const { trainId } = req.params;
    const location = await locationService.getCurrentLocation(trainId);
    if (!location) {
      return res.status(404).json({ message: 'Location details not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all locations
exports.getLocations = async (req, res) => {
  try {
    const filters = req.query;
    const locations = await locationService.getLocations(filters);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch location history logs
exports.getLocationHistory = async (req, res) => {
  try {
    const history = await locationService.getLocationHistory();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


