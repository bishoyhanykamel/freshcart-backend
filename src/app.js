const express = require("express");
const AppError = require('./utils/appError');
const authRouter = require("./routes/auth.route");
const app = express();

//////////////////////////////////////////////////
// Middlewares
app.use(express.json());

/////////////////////////////////////////////////
// Routes
app.use("/api/v1", authRouter);

// Handle non-existant routes
app.all("*", (req, res, next) => {
  next(new AppError('Path not found.', 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Server failure.";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
