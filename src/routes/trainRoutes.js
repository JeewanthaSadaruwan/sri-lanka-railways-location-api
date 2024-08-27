const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

// Create a new train
router.post('/trains', trainController.createTrain);

// Get all trains
router.get('/trains', trainController.getTrains);

// Get a train by ID
router.get('/trains/:trainId', trainController.getTrainById);

// Update a train by ID
router.put('/trains/:trainId', trainController.updateTrain);

// Delete a train by ID
router.delete('/trains/:trainId', trainController.deleteTrain);

// Fetch train history logs
router.get('/train-history', trainController.getTrainHistory);

module.exports = router;
