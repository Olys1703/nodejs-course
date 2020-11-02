const bcrypt = require('bcrypt');

const usersRepo = require('../users/user.db.repository.js');
const { ForbiddenError } = require('../../helpers/error.helper.js');

/**
 * Login user
 * @return {Promise}
 */
const login = async user => {
  const dbUser = await usersRepo.findOne({ login: user.login });

  if (!dbUser) {
    throw new ForbiddenError(
      'User has not found. Login or password is incorrect.'
    );
  }

  const isMatch = await bcrypt.compare(user.password, dbUser.password);

  if (!isMatch) {
    throw new ForbiddenError(
      'User has not found. Login or password is incorrect.'
    );
  }

  return dbUser;
};

module.exports = login;
