const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");
const authRouter = require("./routes/auth.route");
const categoriesRouter = require("./routes/category.route");
const app = express();

//////////////////////////////////////////////////
// Middlewares
app.use(express.json());

/////////////////////////////////////////////////
// Routes
app.use("/api/v1/users", authRouter);
app.use("/api/v1/categories", categoriesRouter);

// Handle non-existant routes
app.all("*", (req, res, next) => {
  next(new AppError("Path not found.", 404));
});

app.use(globalErrorHandler);

module.exports = app;
