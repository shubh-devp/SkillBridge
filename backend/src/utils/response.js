const sendResponse = (res, statusCode, data, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data,
  });
};

const sendPaginatedResponse = (res, statusCode, data, pagination, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data,
    pagination,
  });
};

const sendError = (res, statusCode, message, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};

module.exports = { sendResponse, sendPaginatedResponse, sendError };
