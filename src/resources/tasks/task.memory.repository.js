const dbTasksMap = {};

const getSome = async (key, value) =>
  Object.values(dbTasksMap).filter(task => task[key] === value);

const updateSome = async (tasksIds, updatedPart) => {
  tasksIds.forEach(taskId => {
    dbTasksMap[taskId] = {
      ...dbTasksMap[taskId],
      ...updatedPart
    };
  });

  return tasksIds;
};

const deleteSome = async tasksIds => {
  tasksIds.forEach(taskId => delete dbTasksMap[taskId]);

  return tasksIds;
};

const createOne = async newTask => {
  dbTasksMap[newTask.id] = newTask;

  return newTask.id;
};

const getOne = async taskId => dbTasksMap[taskId];

const updateOne = async (taskId, updatedTask) => {
  dbTasksMap[taskId] = updatedTask;

  return taskId;
};

const deleteOne = async taskId => {
  delete dbTasksMap[taskId];

  return taskId;
};

module.exports = {
  getSome,
  updateSome,
  createOne,
  getOne,
  updateOne,
  deleteOne,
  deleteSome
};
