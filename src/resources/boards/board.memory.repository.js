const dbBoardsMap = {};

const getAll = async () => Object.values(dbBoardsMap);

const createOne = async newBoard => {
  dbBoardsMap[newBoard.id] = newBoard;

  return newBoard.id;
};

const getOne = async boardId => dbBoardsMap[boardId];

const updateOne = async (boardId, updatedBoard) => {
  dbBoardsMap[boardId] = updatedBoard;

  return boardId;
};

const deleteOne = async boardId => {
  delete dbBoardsMap[boardId];

  return boardId;
};

module.exports = {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne
};
