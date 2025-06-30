const express = require('express');
const { getStats } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');
const dashboardRouter = express.Router();

dashboardRouter.get('/stats', authMiddleware, getStats);

module.exports = dashboardRouter;
