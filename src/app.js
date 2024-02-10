const express = require('express');

const app = express();

//////////////////////////////////////////////////
// Middlewares
app.use(express.json());

/////////////////////////////////////////////////
// Routes
// To be removed
app.route('/')
    .get((req, res, next) => {
        res.status(200).json({
            status: '200',
            message: 'Server is functional'
        });
    })




module.exports = app;