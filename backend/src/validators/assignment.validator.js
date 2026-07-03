const { body } = require('express-validator');

exports.createAssignmentRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('courseId')
    .trim()
    .isMongoId()
    .withMessage('Invalid course ID format'),
  body('dueDate')
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Due date must be in the future');
      }
      return true;
    }),
  body('totalMarks')
    .isInt({ min: 1 })
    .withMessage('Total marks must be at least 1'),
];

exports.updateAssignmentRules = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty'),
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Due date must be in the future');
      }
      return true;
    }),
  body('totalMarks')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Total marks must be at least 1'),
];

exports.submitAssignmentRules = [
  body('submissionText')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Submission text is required if no file is provided'),
];

exports.gradeSubmissionRules = [
  body('marks')
    .isInt({ min: 0 })
    .withMessage('Marks must be a non-negative integer'),
  body('feedback')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Feedback cannot be empty'),
];
