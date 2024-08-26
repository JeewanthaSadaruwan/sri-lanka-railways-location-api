const locationService = require('../services/locationService');

exports.createLocation = async (req, res) => {
  try {
    console.log("controller >>>>>>>>>>>")
    const locationData = req.body;
    console.log("body >>>", locationData);

    const location = await locationService.createLocation(locationData);
    res.status(201).json(location);
  } catch (error) {
    console.log("error >>>", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getCurrentLocation = async (req, res) => {
  try {
    const { trainId } = req.params;
    const location = await locationService.getCurrentLocation(trainId);
    if (!location) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const filters = req.query;
    const locations = await locationService.getLocations(filters);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoute = async (req, res) => {
  try {
    const { trainId } = req.params;
    const { startDate, endDate } = req.query;
    const route = await locationService.getRoute(trainId, startDate, endDate);
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
