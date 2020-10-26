const User = require('./user.model.js');

const getAll = async () => User.find();

const createOne = async newUser => User.create(newUser);

const getOne = async userId => User.findById(userId);

const updateOne = async (userId, updatedUser) =>
  User.findByIdAndUpdate(userId, updatedUser);

const deleteOne = async userId => User.findByIdAndRemove(userId);

module.exports = {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne
};
