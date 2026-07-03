const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { authenticate, optionalAuth } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { validate } = require('../middleware/validate');
const { createCourseRules, updateCourseRules } = require('../validators/course.validator');

router.get('/', optionalAuth, courseController.getCourses);
router.get('/featured', courseController.getFeaturedCourses);
router.get('/categories/:category', courseController.getCoursesByCategory);
router.get('/:slug', optionalAuth, courseController.getCourseBySlug);
router.post('/', authenticate, authorize('teacher', 'admin'), validate(createCourseRules), courseController.createCourse);
router.patch('/:id', authenticate, authorize('teacher', 'admin'), validate(updateCourseRules), courseController.updateCourse);
router.delete('/:id', authenticate, authorize('admin'), courseController.deleteCourse);

module.exports = router;
