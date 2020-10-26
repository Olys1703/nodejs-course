const boardsRepo = require('./board.db.repository.js');
const tasksService = require('../tasks/task.service.js');
const Board = require('./board.model.js');
const { NotFoundError } = require('../../helpers/error.helper.js');

/**
 * Returns boards
 * @return {Promise}
 */
const getBoards = async () => {
  const boards = await boardsRepo.getAll();

  return boards.map(Board.toResponse);
};

/**
 * Creates board
 * @param {Object} board
 * @return {Promise}
 */
const createBoard = async board => {
  const newBoardId = await boardsRepo.createOne(new Board(board));
  const newBoard = await boardsRepo.getOne(newBoardId);

  return Board.toResponse(newBoard);
};

/**
 * Gets board
 * @param {String} boardId
 * @return {Promise}
 */
const getBoard = async boardId => {
  const board = await boardsRepo.getOne(boardId);

  if (!board) {
    throw new NotFoundError('Board has not found');
  }

  return Board.toResponse(board);
};

/**
 * Updates board
 * @param {String} boardId
 * @param {Object} board
 * @return {Promise}
 */
const updateBoard = async (boardId, board) => {
  const updatedBoard = await boardsRepo.updateOne(boardId, board);

  if (!updatedBoard) {
    throw new NotFoundError('Board has not updated because not found');
  }

  return Board.toResponse(updatedBoard);
};

/**
 * Deletes board
 * @param {String} boardId
 * @return {Promise}
 */
const deleteBoard = async boardId => {
  const deletedBoard = await boardsRepo.deleteOne(boardId);

  if (!deletedBoard) {
    throw new NotFoundError('Board has not deleted because not found');
  }

  await tasksService.deleteTasksByBoardId(boardId);

  return deletedBoard;
};

module.exports = { getBoards, createBoard, getBoard, updateBoard, deleteBoard };
