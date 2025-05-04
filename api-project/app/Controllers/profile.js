const bcrypt = require('bcrypt');

const User = require('../Models/User');

exports.details = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findOne({ _id: userId });
    if (! user) {
      return res.status(404).json({
        success: false,
        message: 'Not Found.'
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.log(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const user = await User.findOne({ _id: userId });
    if (! user) {
      return res.status(404).json({
        success: false,
        message: 'Not found.'
      });
    }

    data.password = await bcrypt.hash(data.password, 12);
    const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

    return res.status(200).json({
      success: true,
      message: 'successfully updated.',
      data: updatedUser
    });
  } catch (error) {
    console.log(error);
  }
}