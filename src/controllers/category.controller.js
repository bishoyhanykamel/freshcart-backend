const CategoryRepository = requrie("./../models/category.model");
const statusCodes = require("http-status-codes").StatusCodes;

module.exports.getAllCategories = catchAsync(async (req, res, next) => {
  const filterParams = req.params;
  const excludedParams = [""];
  const categories = await CategoryRepository.find();
  res.status(statusCodes.OK).json({
    status: 'success',
    message: 'Retrieved all categories',
    length: categories.length,
    data: {
        categories
    }
  });
});
