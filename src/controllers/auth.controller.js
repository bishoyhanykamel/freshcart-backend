const UserRepository = require("./../models/user.model");

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = await UserRepository.create({
    name,
    email,
    password
  })

  res.status(200).json({
    status: '200',
    message: 'Account created successfully, please log in.',
    data: {
        name: newUser.name,
        email: newUser.email
    }
  });
};
