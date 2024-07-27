// Not Found Error Handler
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Forward this error to the error handler middleware
  };
  
  // General Error Handler
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If the status code hasn't been set, default to 500
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack // Include stack trace only in development mode
    });
  };
  
  module.exports = {
    notFound,
    errorHandler
  };
  