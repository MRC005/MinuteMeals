const Promo = require('../model/promoModel');

const validatePromo = async (req, res) => {
  try {
    const { code } = req.body;
    const promo = await Promo.findOne({ code: code.toUpperCase() });
    if (!promo) return res.status(404).json({ success: false, message: "Invalid promo code" });
    if (promo.expiryDate < new Date()) return res.status(400).json({ success: false, message: "Promo code expired" });
    res.json({ success: true, discountAmount: promo.discountAmount });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error validating promo code" });
  }
};

module.exports = { validatePromo };
