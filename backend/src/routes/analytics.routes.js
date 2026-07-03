const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.get('/courses', authenticate, authorize('admin'), analyticsController.getCourseAnalytics);
router.get('/users', authenticate, authorize('admin'), analyticsController.getUserAnalytics);
router.get('/revenue', authenticate, authorize('admin'), analyticsController.getRevenueAnalytics);

module.exports = router;
