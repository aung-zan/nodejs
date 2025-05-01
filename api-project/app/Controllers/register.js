const User = require('../Models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    data.password = await bcrypt.hash(data.password, 12);

    const user = await User.create(data);

    return res.status(200).json({
      status: 'success',
      message: 'successfully created.',
      data: user
    });
  } catch (error) {
    console.log(error);
  }
}