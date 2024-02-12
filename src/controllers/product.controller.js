const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const statusCodes = require("http-status-codes").StatusCodes;
const ProductRepository = require("./../models/product.model");

module.exports.getAllProducts = catchAsync(async (req, res, next) => {
  const searchQuery = { ...req.query };
  const excludedFilters = ["page", "sort", "limit", "fields"];
  excludedFilters.forEach((filter) => delete searchQuery[filter]);

  // Advanced filtering: GTE/GT/LTE/LT, map them to $gte for mongoDB
  let searchParams = JSON.stringify(searchQuery);
  searchParams = searchParams.replace(
    /\b(gt|gte|lt|lte)\b/g,
    (param) => `$${param}`
  );
  searchParams = JSON.parse(searchParams);

  // Setting query with filters
  let productsQuery = searchParams
    ? ProductRepository.find(searchParams)
    : ProductRepository.find();

  // Sorting
  if (req.query.sort) {
    const sortingOptions = req.query.sort.split(",");
    productsQuery = productsQuery.sort(sortingOptions.join(" "));
  } else {
    productsQuery = productsQuery.sort('-ratingsAverage');
  }

  const products = await productsQuery;
  res.status(statusCodes.OK).json({
    status: "success",
    message: "Retrieved all products",
    length: products.length,
    data: {
      products,
    },
  });
});
