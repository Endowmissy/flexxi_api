const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered for ${Object.keys(
      err.keyValue
    )} field`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name == 'ValidationError') {
    let errors = {};
    const message = Object.keys(err.errors).map((val) => errors[val] = err.errors[val].message);
    error = new ErrorResponse(message, 400);
    return res.status(error.statusCode).json({
      status: 'fail',
      error: errors,
    });
  }

  res.status(error.statusCode || 500).json({
    status: 'fail',
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
