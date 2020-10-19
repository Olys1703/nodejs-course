const usersRepo = require('./user.memory.repository.js');
const User = require('./user.model.js');
const tasksService = require('../tasks/task.service.js');
const { NotFoundError } = require('../../helpers/error.helper.js');

/**
 * Returns users
 * @return {Promise}
 */
const getUsers = async () => {
  const users = await usersRepo.getAll();

  return users.map(User.toResponse);
};

/**
 * Creates user
 * @param {Object} user
 * @return {Promise}
 */
const createUser = async user => {
  const newUserId = await usersRepo.createOne(new User(user));
  const newUser = await usersRepo.getOne(newUserId);

  return User.toResponse(newUser);
};

/**
 * Returns user by userId
 * @param {String} userId
 * @return {Promise}
 */
const getUser = async userId => {
  const user = await usersRepo.getOne(userId);

  if (!user) {
    throw new NotFoundError('User has not found');
  }

  return User.toResponse(user);
};

/**
 * Updates user
 * @param {String} userId
 * @param {Object} user
 * @return {Promise}
 */
const updateUser = async (userId, user) => {
  const updatedUserId = await usersRepo.updateOne(userId, new User(user));
  const updatedUser = await usersRepo.getOne(updatedUserId);

  return User.toResponse(updatedUser);
};

/**
 * Deletes user and unassign him from tasks
 * @param {String} userId
 * @return {Promise}
 */
const deleteUser = async userId => {
  const deletedUserId = await usersRepo.deleteOne(userId);

  await tasksService.unassignUserFromTasks(deletedUserId);

  return deletedUserId;
};

module.exports = { getUsers, createUser, getUser, updateUser, deleteUser };
