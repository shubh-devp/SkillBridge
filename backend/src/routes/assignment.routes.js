const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignment.controller');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { validate } = require('../middleware/validate');
const { createAssignmentRules, updateAssignmentRules, submitAssignmentRules, gradeSubmissionRules } = require('../validators/assignment.validator');

router.get('/course/:courseId', authenticate, assignmentController.getAssignments);
router.get('/submissions/my', authenticate, authorize('student'), assignmentController.getMySubmissions);
router.post('/', authenticate, authorize('teacher'), validate(createAssignmentRules), assignmentController.createAssignment);
router.patch('/:id', authenticate, authorize('teacher'), validate(updateAssignmentRules), assignmentController.updateAssignment);
router.delete('/:id', authenticate, authorize('admin'), assignmentController.deleteAssignment);
router.post('/:id/submit', authenticate, authorize('student'), validate(submitAssignmentRules), assignmentController.submitAssignment);
router.patch('/submissions/:id/grade', authenticate, authorize('teacher'), validate(gradeSubmissionRules), assignmentController.gradeSubmission);

module.exports = router;
