const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://minutemeals-client.onrender.com',
  'https://minutemeals-dashboard.onrender.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
