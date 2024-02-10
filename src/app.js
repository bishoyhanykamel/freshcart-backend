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
  res.status(404).json({
    status: "fail",
    message: "Incorrect path provided",
    data: {
      path: req.originalUrl,
    },
  });
});



module.exports = app;
