const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
dotenv.config();

const connectDB = require('./config/dbConn');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');
const promoRoutes = require('./routes/promoRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

connectDB();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://minutemeals-client.onrender.com',
  'https://minutemeals-dashboard.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));

app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/promo', promoRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/food', foodRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
