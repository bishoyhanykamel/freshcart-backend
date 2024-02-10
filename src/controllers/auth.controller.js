const UserRepository = require("./../models/user.model");

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = await UserRepository.create({
    name,
    email,
    password,
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
    return res.status(400).json({
      status: "400",
      message: "Missing login credentials",
    });
  }

  // 2) check if user exists
  const currentUser = await User.findOne({ email }).select("+password");
  // 3) check password

  // 4) return token and save user in request object for future reference
};
