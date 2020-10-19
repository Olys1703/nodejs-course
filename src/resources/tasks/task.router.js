const router = require('express').Router({ mergeParams: true });

const tasksService = require('./task.service.js');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const { boardId } = req.params;

      const tasks = await tasksService.getTasksByBoardId(boardId);

      return res.json(tasks);
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { boardId } = req.params;

      const newTask = await tasksService.createTask(boardId, req.body);

      return res.json(newTask);
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:taskId')
  .get(async (req, res, next) => {
    try {
      const { taskId } = req.params;

      const task = await tasksService.getTask(taskId);

      return res.json(task);
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { taskId, boardId } = req.params;

      const updatedTask = await tasksService.updateTask(
        { taskId, boardId },
        req.body
      );

      return res.json(updatedTask);
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { taskId } = req.params;

      const deletedTaskId = await tasksService.deleteTask(taskId);

      return res.json({ id: deletedTaskId });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
