const handleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Server failure.";

  if (process.env.NODE_ENV === "dev") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProduction(err, res);
  }
};

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    errorStack: err.stack,
    error: err,
  });
};

const sendErrorProduction = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "Error",
      message: "Sorry, something went wrong!",
    });
  }
};

module.exports = handleError;
