const {
  ValidationError,
  NotFoundError
} = require('../helpers/error.helper.js');
const {
  logValidationError,
  logNotFoundError,
  logError
} = require('../helpers/logger.helper.js');

const INTERNAL_SERVER_ERROR = {
  status: 500,
  msg: 'Internal Server Error'
};

const errorLoggerMiddleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    logValidationError(err);
  } else if (err instanceof NotFoundError) {
    logNotFoundError(err);
  } else {
    logError({ message: INTERNAL_SERVER_ERROR.msg });
  }

  next();
};

module.exports = errorLoggerMiddleware;
