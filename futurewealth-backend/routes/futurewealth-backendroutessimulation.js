const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulationController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/run', authenticateToken, simulationController.runSimulation);
router.get('/history/:userId', authenticateToken, simulationController.getSimulationHistory);
router.get('/report/:simulationId', authenticateToken, simulationController.downloadSimulationReport);

module.exports = router;
