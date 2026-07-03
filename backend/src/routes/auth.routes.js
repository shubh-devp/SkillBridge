const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const { validate } = require('../middleware/validate');
const {
  registerRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules,
  updateProfileRules,
  updatePasswordRules,
} = require('../validators/auth.validator');

router.post('/register', authLimiter, validate(registerRules), authController.register);
router.post('/login', authLimiter, validate(loginRules), authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', authLimiter, validate(forgotPasswordRules), authController.forgotPassword);
router.post('/reset-password/:token', authLimiter, validate(resetPasswordRules), authController.resetPassword);
router.get('/me', authenticate, authController.getMe);
router.patch('/profile', authenticate, validate(updateProfileRules), authController.updateProfile);
router.patch('/password', authenticate, validate(updatePasswordRules), authController.updatePassword);

module.exports = router;
