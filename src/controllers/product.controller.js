const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const statusCodes = require('http-status-codes').StatusCodes;
const ProductRepository = require('./../models/product.model');


module.exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await ProductRepository.find();

    res.status(statusCodes.OK).json({
        status: 'success',
        message: 'Retrieved all products',
        length: products.length,
        data: {
            products
        }
    });
});