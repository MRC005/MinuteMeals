const userModel = require('../model/userModel');

const isAdminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = isAdminMiddleware;
