const { validationResult } = require('express-validator');
const { AppError } = require('../utils/errors');

const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    next(new AppError('Validation failed', 400, extractedErrors));
  };
};

module.exports = { validate };
