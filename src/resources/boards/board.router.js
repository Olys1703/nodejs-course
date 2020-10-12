const router = require('express').Router();

const boardsService = require('./board.service.js');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getBoards();

    return res.json(boards);
  })
  .post(async (req, res) => {
    const newBoard = await boardsService.createBoard(req.body);

    return res.json(newBoard);
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    const { boardId } = req.params;

    const board = await boardsService.getBoard(boardId);

    if (!board) {
      return res.status(404).json({});
    }

    return res.json(board);
  })
  .put(async (req, res) => {
    const { boardId } = req.params;

    const updatedBoard = await boardsService.updateBoard(boardId, req.body);

    return res.json(updatedBoard);
  })
  .delete(async (req, res) => {
    const { boardId } = req.params;

    const deletedUserId = await boardsService.deleteBoard(boardId);

    return res.json({ id: deletedUserId });
  });

module.exports = router;
