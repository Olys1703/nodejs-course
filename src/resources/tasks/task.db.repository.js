const Task = require('./task.model.js');

const getSome = async (key, value) => Task.find({ [key]: value });

const updateSome = async (tasksIds, updatedPart) =>
  Task.updateMany({ _id: { $in: tasksIds } }, updatedPart);

const deleteSome = async tasksIds =>
  Task.deleteMany({ _id: { $in: tasksIds } });

const createOne = async newTask => Task.create(newTask);

const getOne = async taskId => Task.findById(taskId);

const updateOne = async (taskId, updatedTask) =>
  Task.findByIdAndUpdate(taskId, updatedTask);

const deleteOne = async taskId => Task.findByIdAndRemove(taskId);

module.exports = {
  getSome,
  updateSome,
  createOne,
  getOne,
  updateOne,
  deleteOne,
  deleteSome
};
