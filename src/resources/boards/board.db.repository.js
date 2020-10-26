const Board = require('./board.model.js');

const getAll = async () => Board.find();

const createOne = async newBoard => Board.create(newBoard);

const getOne = async boardId => Board.findById(boardId);

const updateOne = async (boardId, updatedBoard) =>
  Board.findByIdAndUpdate(boardId, updatedBoard);

const deleteOne = async boardId => Board.findByIdAndRemove(boardId);

module.exports = {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne
};
