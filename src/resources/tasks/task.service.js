const tasksRepo = require('./task.db.repository.js');
const Task = require('./task.model.js');
const { NotFoundError } = require('../../helpers/error.helper.js');

/**
 * Returns tasks by board id
 * @param {String} boardId
 * @return {Promise}
 */
const getTasksByBoardId = async boardId => {
  const tasks = await tasksRepo.getSome('boardId', boardId);

  return tasks.map(Task.toResponse);
};

/**
 * Creates task
 * @param {String} boardId
 * @param {Object} task
 * @return {Promise}
 */
const createTask = async (boardId, task) => {
  const newTaskId = await tasksRepo.createOne(new Task({ ...task, boardId }));
  const newTask = await tasksRepo.getOne(newTaskId);

  return Task.toResponse(newTask);
};

/**
 * Returns task by task id
 * @param taskId
 * @return {Promise}
 */
const getTask = async taskId => {
  const task = await tasksRepo.getOne(taskId);

  if (!task) {
    throw new NotFoundError('Task has not found');
  }

  return Task.toResponse(task);
};

/**
 * Updates task
 * @param {String} taskId
 * @param {String} boardId
 * @param {Object} task
 * @return {Promise}
 */
const updateTask = async ({ taskId, boardId }, task) => {
  const updatedTask = await tasksRepo.updateOne(taskId, { ...task, boardId });

  if (!updatedTask) {
    throw new NotFoundError('Task has not updated because not found');
  }

  return Task.toResponse(updatedTask);
};

/**
 * Unassignes login from tasks
 * @param {String} userId
 * @return {Promise}
 */
const unassignUserFromTasks = async userId => {
  const tasks = await tasksRepo.getSome('userId', userId);
  const tasksIds = tasks.map(task => task.id);

  await tasksRepo.updateSome(tasksIds, { userId: null });

  return tasksIds;
};

/**
 * Deletes task by task id
 * @param {String} taskId
 * @return {Promise}
 */
const deleteTask = async taskId => {
  const deletedTask = await tasksRepo.deleteOne(taskId);

  if (!deletedTask) {
    throw new NotFoundError('Task has not deleted because not found');
  }

  return deletedTask;
};

/**
 * Deletes tasks by board id
 * @param {String} boardId
 * @return {Promise}
 */
const deleteTasksByBoardId = async boardId => {
  const tasks = await tasksRepo.getSome('boardId', boardId);
  const tasksIds = tasks.map(task => task.id);

  await tasksRepo.deleteSome(tasksIds);

  return tasksIds;
};

module.exports = {
  getTasksByBoardId,
  createTask,
  getTask,
  updateTask,
  unassignUserFromTasks,
  deleteTask,
  deleteTasksByBoardId
};
