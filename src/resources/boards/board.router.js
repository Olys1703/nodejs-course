const router = require('express').Router();

const boardsService = require('./board.service.js');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const boards = await boardsService.getBoards();

      return res.json(boards);
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newBoard = await boardsService.createBoard(req.body);

      return res.json(newBoard);
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:boardId')
  .get(async (req, res, next) => {
    try {
      const { boardId } = req.params;

      const board = await boardsService.getBoard(boardId);

      return res.json(board);
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { boardId } = req.params;

      const updatedBoard = await boardsService.updateBoard(boardId, req.body);

      return res.json(updatedBoard);
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { boardId } = req.params;

      const deletedUserId = await boardsService.deleteBoard(boardId);

      return res.json({ id: deletedUserId });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
