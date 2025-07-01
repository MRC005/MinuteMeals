const orderModel = require('../model/orderModel');
const userModel = require('../model/userModel');

const getStats = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    
    const ordersToday = await orderModel.countDocuments({
      createdAt: { $gte: startOfToday },
      payment: true
    });
    
    const activeUsers = await userModel.countDocuments();
    
    const revenueAgg = await orderModel.aggregate([
      { 
        $match: { 
          createdAt: { $gte: startOfToday },
          payment: true 
        } 
      },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    
    const revenue = revenueAgg[0]?.total || 0;
    
    res.json({ 
      success: true, 
      data: { 
        ordersToday,
        activeUsers,
        restaurants: 1,
        revenue
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching dashboard stats" });
  }
};

module.exports = { getStats };
