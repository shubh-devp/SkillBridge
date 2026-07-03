const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.get('/student', authenticate, authorize('student'), dashboardController.getStudentDashboard);
router.get('/teacher', authenticate, authorize('teacher'), dashboardController.getTeacherDashboard);
router.get('/admin', authenticate, authorize('admin'), dashboardController.getAdminDashboard);

module.exports = router;
