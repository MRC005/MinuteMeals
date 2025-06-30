const express = require('express');
const orderRouter = express.Router();
const { 
  placeOrder, 
  verifyOrder, 
  userOrders, 
  listOrders, 
  updateState, 
  updateLiveLocation 
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.get('/list', listOrders);
orderRouter.post('/userorders', authMiddleware, userOrders);
orderRouter.post('/status', updateState);
orderRouter.post('/update-location', authMiddleware, updateLiveLocation); 

module.exports = orderRouter;
