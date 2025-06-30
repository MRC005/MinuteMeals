const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  code: { 
    type: String, 
    required: true, 
    unique: true 
  },
  discountAmount: { 
    type: Number, 
    required: true 
  },
  expiryDate: { 
    type: Date, 
    required: true 
  }
});

module.exports = mongoose.models.Promo || mongoose.model('Promo', promoSchema);
