const CategoryRepository = require("./../models/category.model");
const statusCodes = require("http-status-codes").StatusCodes;
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

module.exports.getAllCategories = catchAsync(async (req, res, next) => {
  const clientQuery = { ...req.query };
  const excludedParams = ["page", "sort", "limit", "fields"];

  excludedParams.forEach((excluded) => delete clientQuery[excluded]);

  const categories = clientQuery
    ? await CategoryRepository.find(clientQuery)
    : await CategoryRepository.find();

  res.status(statusCodes.OK).json({
    status: "success",
    message: "Retrieved all categories.",
    length: categories.length,
    data: {
      categories,
    },
  });
});
