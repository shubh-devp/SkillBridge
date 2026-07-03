const { body } = require('express-validator');

exports.enrollRules = [
  body('courseId')
    .trim()
    .isMongoId()
    .withMessage('Invalid course ID format'),
];
