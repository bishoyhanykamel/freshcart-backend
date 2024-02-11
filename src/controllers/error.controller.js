const AppError = require("./../utils/appError");
const StatusCodes = require("http-status-codes").StatusCodes;

const handleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Server failure.";

  if (process.env.NODE_ENV === "dev") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // turn non-operational errors to operational errors (ex: Mongoose, or any other library)
    let handledError = { ...err };
    if (err.name === "CastError") handledError = handleCastErrorDB(err);
    else if(err.name === 'MongoError') {
      if (err.code === 11000)
        handledError = handleDuplicateKeysError(err);
    }
    sendErrorProduction(handledError, res);
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

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleDuplicateKeysError = (err) => {
  const message = `Item you are trying to add already exists: ${err.errmsg.match(/"(.*?)"/)[1]}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}
module.exports = handleError;
