const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { validate } = require('../middleware/validate');
const { createTestRules, updateTestRules, submitTestRules } = require('../validators/test.validator');

router.get('/course/:courseId', authenticate, testController.getTests);
router.get('/results/my', authenticate, authorize('student'), testController.getMyResults);
router.get('/:id', authenticate, testController.getTestById);
router.get('/:id/results', authenticate, authorize('teacher', 'admin'), testController.getTestResults);
router.post('/', authenticate, authorize('teacher'), validate(createTestRules), testController.createTest);
router.patch('/:id', authenticate, authorize('teacher'), validate(updateTestRules), testController.updateTest);
router.delete('/:id', authenticate, authorize('admin'), testController.deleteTest);
router.post('/:id/submit', authenticate, authorize('student'), validate(submitTestRules), testController.submitTest);

module.exports = router;
