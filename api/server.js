const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
dotenv.config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');
const promoRoutes = require('./routes/promoRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes'); 

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images'))); // For food images

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/promo', promoRoutes); 
app.use('/api/dashboard', dashboardRoutes); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
