const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");
const authRouter = require("./routes/auth.route");
const categoriesRouter = require("./routes/category.route");
const productsRouter = require("./routes/product.route");
const app = express();

//////////////////////////////////////////////////
// Middlewares
app.use(express.json());

/////////////////////////////////////////////////
// Routes
app
  .use("/api/v1/users", authRouter)
  .use("/api/v1/categories", categoriesRouter)
  .use("/api/v1/products", productsRouter);

// Handle non-existant routes
app.all("*", (req, res, next) => {
  next(new AppError("Path not found.", 404));
});

app.use(globalErrorHandler);

module.exports = app;
