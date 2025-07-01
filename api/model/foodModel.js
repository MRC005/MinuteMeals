const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  offer: {
    type: String,
    default: null
  },
  isVeg: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 10
  },
  rating: {
    type: Number,
    default: 4.0
  }
});

const foodModel = mongoose.models.Food || mongoose.model('Food', foodSchema);
module.exports = foodModel;
