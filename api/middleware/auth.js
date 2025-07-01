const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization || req.headers.token;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token is missing' });
  }

  const actualToken = token.startsWith('Bearer ') 
    ? token.split(' ')[1]
    : token;

  try {
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const message = error.name === 'TokenExpiredError' 
      ? 'Token expired' 
      : 'Invalid token';
    res.status(401).json({ success: false, message });
  }
};

module.exports = authMiddleware;
