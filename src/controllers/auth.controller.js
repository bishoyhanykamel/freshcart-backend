const UserRepository = require("./../models/user.model");
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = await UserRepository.create({
    name,
    email,
    password,
    phone,
  });

  res.status(200).json({
    status: "200",
    message: "Account created successfully, please log in.",
    data: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

exports.login = async (req, res, next) => {
  // 1) Check body
  const { email, password } = req.body;
  if (!email || !password) {
    // TODO: global error handling
    return res.status(400).json({
      status: "400",
      message: "Missing login credentials.",
    });
  }

  // 2) check if user exists
  const currentUser = await UserRepository.findOne({ email }).select("+password");
  // 3) check password
  if (!currentUser || !(await currentUser.comparePasswords(password))) {
    // TODO: global error handling
    return res.status(401).json({
      status: "401",
      message: "Invalid login credentials.",
    });
  }

  // 4) return token and save user in request object for future reference
  const token = generateToken(currentUser._id);
    res.status(200).json({
    status: "200",
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