const express = require('express');
const { 
  placeOrder, 
  verifyOrder, 
  userOrders, 
  listOrders, 
  updateState, 
  updateLiveLocation 
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/place', authMiddleware, placeOrder);
router.post('/verify', verifyOrder);
router.get('/list', listOrders);
router.post('/userorders', authMiddleware, userOrders);
router.post('/status', updateState);
router.post('/update-location', authMiddleware, updateLiveLocation);

module.exports = router;
