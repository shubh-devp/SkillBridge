const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const courseRoutes = require('./course.routes');
const teacherRoutes = require('./teacher.routes');
const blogRoutes = require('./blog.routes');
const enrollmentRoutes = require('./enrollment.routes');
const testRoutes = require('./test.routes');
const assignmentRoutes = require('./assignment.routes');
const batchRoutes = require('./batch.routes');
const wishlistRoutes = require('./wishlist.routes');
const notificationRoutes = require('./notification.routes');
const contactRoutes = require('./contact.routes');
const dashboardRoutes = require('./dashboard.routes');
const certificateRoutes = require('./certificate.routes');
const analyticsRoutes = require('./analytics.routes');

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/teachers', teacherRoutes);
router.use('/blogs', blogRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/tests', testRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/batches', batchRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/notifications', notificationRoutes);
router.use('/contacts', contactRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/certificates', certificateRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
