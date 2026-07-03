const rateLimit = require('express-rate-limit');

const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message: message || 'Too many requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

const apiLimiter = createRateLimiter(15 * 60 * 1000, 100, 'Too many API requests');

const authLimiter = createRateLimiter(15 * 60 * 1000, 5, 'Too many login attempts');

module.exports = { apiLimiter, authLimiter, createRateLimiter };
