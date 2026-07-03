const { User } = require('../models');
const { AppError, NotFoundError, UnauthorizedError, asyncHandler } = require('../utils/errors');
const { sendResponse } = require('../utils/response');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  setRefreshTokenCookie,
} = require('../utils/tokens');
const crypto = require('crypto');

const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role: role || 'student',
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, 201, {
    accessToken,
    user: user.toPublicJSON(),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  if (!user.isActive) {
    throw new AppError('Account has been deactivated. Contact support.', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, 200, {
    accessToken,
    user: user.toPublicJSON(),
  });
});

const logout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });
  }

  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  sendResponse(res, 200, {}, 'Logged out successfully');
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!token) {
    throw new UnauthorizedError('Refresh token required');
  }

  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded.id).select('+refreshToken');
  if (!user || user.refreshToken !== token) {
    throw new UnauthorizedError('Invalid refresh token');
  }

  const accessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  setRefreshTokenCookie(res, newRefreshToken);

  sendResponse(res, 200, { accessToken });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new AppError('Email is required', 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('User');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  sendResponse(res, 200, {
    resetToken,
    message: 'Password reset email sent. In production, this would be sent via email.',
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    throw new AppError('Token and new password are required', 400);
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError('Token is invalid or expired', 400);
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.refreshToken = null;
  await user.save();

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, 200, { accessToken }, 'Password reset successfully');
});

const getMe = asyncHandler(async (req, res) => {
  sendResponse(res, 200, { user: req.user.toPublicJSON() });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, bio, avatar } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new NotFoundError('User');
  }

  if (name) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (bio !== undefined) user.bio = bio;
  if (avatar !== undefined) user.avatar = avatar;

  await user.save();

  sendResponse(res, 200, { user: user.toPublicJSON() }, 'Profile updated');
});

const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError('Current password and new password are required', 400);
  }

  const user = await User.findById(req.user._id).select('+password');
  if (!user) {
    throw new NotFoundError('User');
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

  setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, 200, { accessToken }, 'Password updated successfully');
});

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  getMe,
  updateProfile,
  updatePassword,
};
