const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.get('/', teacherController.getTeachers);
router.get('/:slug', teacherController.getTeacherBySlug);
router.get('/:id/courses', teacherController.getTeacherCourses);
router.patch('/profile', authenticate, authorize('teacher'), teacherController.updateTeacherProfile);

module.exports = router;
