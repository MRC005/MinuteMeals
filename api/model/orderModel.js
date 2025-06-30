const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'Food processing' },
    date: { type: Date, default: Date.now },
    payment: { type: String, default: false },
    liveLocation: {
        lat: { type: Number, default: null },
        lng: { type: Number, default: null }
    }
});

const orderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);
module.exports = orderModel;
