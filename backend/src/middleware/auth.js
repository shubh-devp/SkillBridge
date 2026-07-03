const jwt = require('jsonwebtoken');
const { User } = require('../models');
const env = require('../config/env');
const { AppError } = require('../utils/errors');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Access denied. No token provided.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.jwtSecret);

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError('User not found', 401);
    }

    if (!user.isActive) {
      throw new AppError('Account has been deactivated', 401);
    }

    if (user.passwordChangedAt) {
      const changedTimestamp = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
      if (decoded.iat < changedTimestamp) {
        throw new AppError('Password recently changed. Please log in again.', 401);
      }
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired', 401));
    }
    next(error);
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.id);
    if (user && user.isActive) {
      req.user = user;
    }
    next();
  } catch {
    next();
  }
};

module.exports = { authenticate, optionalAuth };
