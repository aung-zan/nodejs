const bcrypt = require('bcrypt');

const User = require('../../models/User');

const findAll = async () => {
  try {
    return await User.find({});
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

const save = async (name, email, password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 12);

    const user = new User({ name: name, email: email, password: hashPassword });
    return await user.save();
  } catch (error) {
    throw new Error(`Failed to save user: ${error.message}`);
  }
}

const findBy = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(`Failed to find user: ${error.message}`);
  }
}

const findById = async (_id) => {
  try {
    return await User.findOne({ _id });
  } catch (error) {
    throw new Error(`Failed to find user: ${error.message}`);
  }
}

const update = async (id, data) => {
  try {
    return await User.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

const destroy = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}

module.exports = { findAll, save, findBy, findById, update, destroy };