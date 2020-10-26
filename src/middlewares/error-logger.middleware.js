const {
  ValidationError,
  NotFoundError
} = require('../helpers/error.helper.js');
const {
  logValidationError,
  logNotFoundError,
  logError
} = require('../helpers/logger.helper.js');

const errorLoggerMiddleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    logValidationError(err);
  } else if (err instanceof NotFoundError) {
    logNotFoundError(err);
  } else {
    logError(err);
  }

  next();
};

module.exports = errorLoggerMiddleware;
