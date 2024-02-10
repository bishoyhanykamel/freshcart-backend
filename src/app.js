const express = require("express");
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
  const err = new Error("Not found");
  err.status = "fail";
  err.statusCode = 404;
  next(err);
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
