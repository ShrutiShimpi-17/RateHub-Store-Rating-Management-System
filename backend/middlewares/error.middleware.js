const errorHandler = (err, req, res, next) => {
  // Log the error to console
  console.error("Error Handler Log:", err.message || err);
  if (err.stack && process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = undefined;

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    message = "Database validation failed.";
    errors = {};
    err.errors.forEach(e => {
      errors[e.path] = e.message;
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors })
  });
};

module.exports = errorHandler;
