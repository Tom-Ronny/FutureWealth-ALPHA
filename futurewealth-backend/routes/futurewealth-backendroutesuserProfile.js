const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

router.post('/save', userProfileController.saveUserProfile);
router.get('/get/:userId', userProfileController.getUserProfile);

module.exports = router;
