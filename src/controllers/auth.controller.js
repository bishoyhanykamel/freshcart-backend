const UserRepository = require("./../models/user.model");
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const statusCodes = require('http-status-codes').StatusCodes;

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  const newUser = await UserRepository.create({
    name,
    email,
    password,
    phone,
  });

  res.status(200).json({
    status: "success",
    message: "Account created successfully, please log in.",
    data: {
      name: newUser.name,
      email: newUser.email,
    },
  });
});

exports.login = async (req, res, next) => {
  // 1) Check body
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Missing login credentials.', statusCodes.BAD_REQUEST));
  }

  // 2) check if user exists
  const currentUser = await UserRepository.findOne({ email }).select("+password");
  // 3) check password
  if (!currentUser || !(await currentUser.comparePasswords(password))) {
    return next(new AppError('Invalid login credentials.', statusCodes.BAD_REQUEST));
  }

  // 4) return token and save user in request object for future reference
  const token = generateToken(currentUser._id);
    res.status(statusCodes.OK).json({
    status: "success",
    message: "Successfully logged in.",
    token,
  });
  req.user = currentUser;
};


const generateToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_IN
    })
}