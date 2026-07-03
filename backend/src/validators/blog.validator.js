const { body } = require('express-validator');

const validCategories = [
  'technology', 'education', 'career', 'programming',
  'web-development', 'data-science', 'cloud-computing',
  'cybersecurity', 'interview-prep', 'study-tips',
  'industry-news', 'other',
];

exports.createBlogRules = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Title must be between 10 and 200 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
  body('excerpt')
    .trim()
    .isLength({ max: 300 })
    .withMessage('Excerpt must not exceed 300 characters'),
  body('category')
    .trim()
    .isIn(validCategories)
    .withMessage(`Category must be one of: ${validCategories.join(', ')}`),
];

exports.updateBlogRules = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Title must be between 10 and 200 characters'),
  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Content cannot be empty'),
  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Excerpt must not exceed 300 characters'),
  body('category')
    .optional()
    .trim()
    .isIn(validCategories)
    .withMessage(`Category must be one of: ${validCategories.join(', ')}`),
];
