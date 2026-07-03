const { body } = require('express-validator');

const validCategories = [
  'web-development', 'mobile-development', 'data-science',
  'machine-learning', 'cloud-computing', 'devops',
  'cybersecurity', 'programming-languages', 'databases',
  'software-testing', 'ui-ux', 'other',
];

const validLevels = ['beginner', 'intermediate', 'advanced', 'all-levels'];

const validLanguages = [
  'hindi', 'english', 'gujarati', 'tamil', 'telugu',
  'kannada', 'malayalam', 'marathi', 'bengali', 'punjabi',
];

const validModes = ['live', 'recorded', 'hybrid'];

exports.createCourseRules = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('description.short')
    .trim()
    .isLength({ max: 300 })
    .withMessage('Short description must not exceed 300 characters'),
  body('description.full')
    .trim()
    .notEmpty()
    .withMessage('Full description is required'),
  body('category')
    .trim()
    .isIn(validCategories)
    .withMessage(`Category must be one of: ${validCategories.join(', ')}`),
  body('level')
    .trim()
    .isIn(validLevels)
    .withMessage(`Level must be one of: ${validLevels.join(', ')}`),
  body('price.amount')
    .isFloat({ min: 0 })
    .withMessage('Price amount must be a positive number'),
  body('language')
    .trim()
    .isIn(validLanguages)
    .withMessage(`Language must be one of: ${validLanguages.join(', ')}`),
  body('mode')
    .trim()
    .isIn(validModes)
    .withMessage(`Mode must be one of: ${validModes.join(', ')}`),
];

exports.updateCourseRules = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('description.short')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Short description must not exceed 300 characters'),
  body('description.full')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Full description cannot be empty'),
  body('category')
    .optional()
    .trim()
    .isIn(validCategories)
    .withMessage(`Category must be one of: ${validCategories.join(', ')}`),
  body('level')
    .optional()
    .trim()
    .isIn(validLevels)
    .withMessage(`Level must be one of: ${validLevels.join(', ')}`),
  body('price.amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price amount must be a positive number'),
  body('language')
    .optional()
    .trim()
    .isIn(validLanguages)
    .withMessage(`Language must be one of: ${validLanguages.join(', ')}`),
  body('mode')
    .optional()
    .trim()
    .isIn(validModes)
    .withMessage(`Mode must be one of: ${validModes.join(', ')}`),
];
