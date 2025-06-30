const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.token || req.headers.authorization;
  if (!token) return res.status(401).json({ success: false, message: 'Token is missing' });
  const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
  try {
    const decoded = jwt.verify(actualToken, process.env.JWT_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
