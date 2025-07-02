const express = require('express');
const { getStats } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');
const isAdminMiddleware = require('../middleware/isAdmin');
const dashboardRouter = express.Router();

dashboardRouter.get('/stats', authMiddleware,isAdminMiddleware,getStats);

module.exports = dashboardRouter;
