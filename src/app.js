const express = require('express');

const app = express();

app.route('/')
    .get((req, res, next) => {
        res.status(200).json({
            status: '200',
            message: 'Server is functional'
        });
    })

app.use(express.json());


module.exports = app;