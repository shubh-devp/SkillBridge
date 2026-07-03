const { User } = require('../models');
const { AppError, UnauthorizedError } = require('../utils/errors');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../utils/tokens');
const logger = require('../utils/logger');
const crypto = require('crypto');

const registerUser = async (userData) => {
  const { name, email, password, phone, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User with this email already exists', 409);
  }

  let userRole = role;
  if (role && !['student', 'teacher', 'admin'].includes(role)) {
    throw new AppError('Invalid role specified', 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: userRole,
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  logger.info(`User registered: ${user.email} (${user.role})`);

  return {
    user: user.toPublicJSON(),
    accessToken,
    refreshToken,
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password +refreshToken');
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  if (!user.isActive) {
    throw new AppError('Account has been deactivated. Contact support.', 403);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  logger.info(`User logged in: ${user.email}`);

  return {
    user: user.toPublicJSON(),
    accessToken,
    refreshToken,
  };
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new UnauthorizedError('Refresh token is required');
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (err) {
    throw new UnauthorizedError('Invalid or expired refresh token');
  }

  const user = await User.findById(decoded.id).select('+refreshToken');
  if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
    throw new UnauthorizedError('Refresh token is invalid or has been revoked');
  }

  if (!user.isActive) {
    throw new AppError('Account has been deactivated. Contact support.', 403);
  }

  const newAccessToken = generateAccessToken(user);

  return { accessToken: newAccessToken };
};

const logoutUser = async (userId, refreshToken) => {
  const user = await User.findById(userId).select('+refreshToken');
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.refreshToken === refreshToken) {
    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });
  }

  logger.info(`User logged out: ${user.email}`);
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('No account found with this email address', 404);
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

  logger.info(`Password reset link for ${email}: ${resetUrl}`);

  return { resetToken, resetUrl };
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError('Reset token is invalid or has expired', 400);
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.refreshToken = null;
  await user.save();

  logger.info(`Password reset successful for: ${user.email}`);
};

const updatePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new AppError('Current password is incorrect', 401);
  }

  user.password = newPassword;
  user.refreshToken = null;
  await user.save();

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  logger.info(`Password updated for: ${user.email}`);

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  forgotPassword,
  resetPassword,
  updatePassword,
};
