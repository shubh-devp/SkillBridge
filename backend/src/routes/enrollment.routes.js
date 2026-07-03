const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { validate } = require('../middleware/validate');
const { enrollRules } = require('../validators/enrollment.validator');

router.post('/', authenticate, authorize('student'), validate(enrollRules), enrollmentController.enrollCourse);
router.get('/my', authenticate, authorize('student'), enrollmentController.getUserEnrollments);
router.get('/course/:courseId', authenticate, authorize('teacher', 'admin'), enrollmentController.getCourseEnrollments);
router.patch('/:id/progress', authenticate, authorize('student'), enrollmentController.updateProgress);
router.patch('/:id/complete', authenticate, authorize('student'), enrollmentController.completeCourse);
router.delete('/:id', authenticate, authorize('admin'), enrollmentController.cancelEnrollment);

module.exports = router;
