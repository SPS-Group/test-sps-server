const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { log } = require('console');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, "test@senha");
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
}

module.exports = authMiddleware