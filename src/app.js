const express = require('express');
const authRouter = require('./routes/auth.route');
const app = express();

//////////////////////////////////////////////////
// Middlewares
app.use(express.json());

/////////////////////////////////////////////////
// Routes
app.use('/api/v1', authRouter);
// To be removed
app.route('/')
    .get((req, res, next) => {
        res.status(200).json({
            status: '200',
            message: 'Server is functional'
        });
    })




module.exports = app;