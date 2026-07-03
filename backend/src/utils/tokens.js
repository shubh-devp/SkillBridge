const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { User } = require('../models');

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiry }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    env.jwtRefreshSecret,
    { expiresIn: env.jwtRefreshExpiry }
  );
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwtRefreshSecret);
};

const setRefreshTokenCookie = (res, token) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  setRefreshTokenCookie,
};
