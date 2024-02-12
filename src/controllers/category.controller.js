const CategoryRepository = require("./../models/category.model");
const statusCodes = require("http-status-codes").StatusCodes;
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

module.exports.getAllCategories = catchAsync(async (req, res, next) => {
  const clientQuery = { ...req.query };
  const excludedParams = ["page", "sort", "limit", "fields"];

  excludedParams.forEach((excluded) => delete clientQuery[excluded]);

  // Search and filtration
  let categoriesQuery = clientQuery
    ? CategoryRepository.find(clientQuery)
    : CategoryRepository.find();
    
  // Pagination, limiting results
  // TODO
  // Execute query
  const categories = await categoriesQuery;

  // Response message
  res.status(statusCodes.OK).json({
    status: "success",
    message: "Retrieved all categories.",
    length: categories.length,
    data: {
      categories,
    },
  });
});
