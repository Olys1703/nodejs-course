const tasksRepo = require('./task.memory.repository.js');
const Task = require('./task.model.js');

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
  const newTaskId = await tasksRepo.createOne(new Task(boardId, task));
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
    return null;
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
  const updatedTaskId = await tasksRepo.updateOne(
    taskId,
    new Task(boardId, task)
  );
  const updatedTask = await tasksRepo.getOne(updatedTaskId);

  return Task.toResponse(updatedTask);
};

/**
 * Unassignes user from tasks
 * @param {String} userId
 * @return {Promise}
 */
const unassignUserFromTasks = async userId => {
  const tasks = await tasksRepo.getSome('userId', userId);

  const tasksIds = await tasksRepo.updateSome(
    tasks.map(task => task.id),
    { userId: null }
  );

  return tasksIds;
};

/**
 * Deletes task by task id
 * @param {String} taskId
 * @return {Promise}
 */
const deleteTask = async taskId => {
  const deletedTaskId = await tasksRepo.deleteOne(taskId);

  return deletedTaskId;
};

/**
 * Deletes tasks by board id
 * @param {String} boardId
 * @return {Promise}
 */
const deleteTasksByBoardId = async boardId => {
  const tasks = await tasksRepo.getSome('boardId', boardId);

  const deletedTasksIds = await tasksRepo.deleteSome(
    tasks.map(task => task.id)
  );

  return deletedTasksIds;
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
