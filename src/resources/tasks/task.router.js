const router = require('express').Router();

const tasksService = require('./task.service.js');

router
  .route('/:boardId/tasks')
  .get(async (req, res) => {
    const { boardId } = req.params;

    const tasks = await tasksService.getTasksByBoardId(boardId);

    return res.json(tasks);
  })
  .post(async (req, res) => {
    const { boardId } = req.params;

    const newTask = await tasksService.createTask(boardId, req.body);

    return res.json(newTask);
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(async (req, res) => {
    const { taskId } = req.params;

    const task = await tasksService.getTask(taskId);

    if (!task) {
      return res.status(404).json({});
    }

    return res.json(task);
  })
  .put(async (req, res) => {
    const { taskId, boardId } = req.params;

    const updatedTask = await tasksService.updateTask(
      { taskId, boardId },
      req.body
    );

    return res.json(updatedTask);
  })
  .delete(async (req, res) => {
    const { taskId } = req.params;

    const deletedTaskId = await tasksService.deleteTask(taskId);

    return res.json({ id: deletedTaskId });
  });

module.exports = router;
