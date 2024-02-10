const handleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Server failure.";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};


module.exports = handleError;