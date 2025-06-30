const orderModel = require('../model/orderModel');
const userModel = require('../model/userModel');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.SK_SECRET);

const frontend_url = process.env.NODE_ENV === 'production' 
  ? 'https://your-frontend-url.com' 
  : 'http://localhost:5173';

const placeOrder = async (req, res) => {
  try {
    const newOrder = await orderModel.create({
      userId: req.user.id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });

    await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

    const line_items = req.body.items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Delivery Charge'
        },
        unit_amount: 20 * 100,
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

const updateLiveLocation = async (req, res) => {
  try {
    const { orderId, lat, lng } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { liveLocation: { lat, lng } });
    res.json({ success: true, message: "Live location updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating location" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment cancelled" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.id });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

const updateState = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

module.exports = { 
  placeOrder, 
  verifyOrder, 
  userOrders, 
  listOrders, 
  updateState,
  updateLiveLocation  
};
