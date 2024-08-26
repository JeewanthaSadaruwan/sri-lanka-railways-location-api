const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/location', locationController.createLocation);
router.get('/location/:trainId', locationController.getCurrentLocation);
router.get('/locations', locationController.getLocations);
router.get('/routes/:trainId', locationController.getRoute);

module.exports = router;