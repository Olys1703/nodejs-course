const { checkToken } = require('../helpers/jwt.helper.js');
const { AuthError } = require('../helpers/error.helper.js');

const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AuthError('Token has not found'));
    }

    try {
      const token = authHeader.replace('Bearer ', '');

      await checkToken(token);

      return next();
    } catch (err) {
      return next(new AuthError('Token is incorrect'));
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = checkAuth;
