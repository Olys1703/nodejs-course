const dbUsersMap = {};

const getAll = async () => Object.values(dbUsersMap);

const createOne = async newUser => {
  dbUsersMap[newUser.id] = newUser;

  return newUser.id;
};

const getOne = async userId => dbUsersMap[userId];

const updateOne = async (userId, updatedUser) => {
  dbUsersMap[userId] = updatedUser;

  return userId;
};

const deleteOne = async userId => {
  delete dbUsersMap[userId];

  return userId;
};

module.exports = {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne
};
