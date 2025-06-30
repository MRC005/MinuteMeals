const orderModel = require('../model/orderModel');

const getStats = async (req, res) => {
  try {
    const totalOrders = await orderModel.countDocuments();
    const totalRevenueResult = await orderModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;
    
    const popularFoods = await orderModel.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.name", count: { $sum: "$items.quantity" } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({ 
      success: true, 
      data: { totalOrders, totalRevenue, popularFoods } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching dashboard stats" });
  }
};

module.exports = { getStats };
