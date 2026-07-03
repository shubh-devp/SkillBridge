const { body } = require('express-validator');

const validTestTypes = ['mcq', 'true-false', 'subjective', 'mixed'];

exports.createTestRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('courseId')
    .trim()
    .isMongoId()
    .withMessage('Invalid course ID format'),
  body('type')
    .trim()
    .isIn(validTestTypes)
    .withMessage(`Type must be one of: ${validTestTypes.join(', ')}`),
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 minute'),
  body('totalMarks')
    .isInt({ min: 1 })
    .withMessage('Total marks must be at least 1'),
  body('passingMarks')
    .isInt({ min: 0 })
    .withMessage('Passing marks must be a non-negative integer'),
  body('questions')
    .isArray({ min: 1 })
    .withMessage('At least one question is required'),
];

exports.updateTestRules = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty'),
  body('type')
    .optional()
    .trim()
    .isIn(validTestTypes)
    .withMessage(`Type must be one of: ${validTestTypes.join(', ')}`),
  body('duration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 minute'),
  body('totalMarks')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Total marks must be at least 1'),
  body('passingMarks')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Passing marks must be a non-negative integer'),
  body('questions')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one question is required'),
];

exports.submitTestRules = [
  body('answers')
    .isArray({ min: 1 })
    .withMessage('Answers array must contain at least one answer'),
];
