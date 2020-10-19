const errorHandlerMiddleware = require('./error-handler.middleware.js');
const errorLoggerMiddleware = require('./error-logger.middleware.js');
const requestLoggerMiddleware = require('./request-logger.middleware.js');

module.exports = {
  requestLoggerMiddleware,
  errorHandlerMiddleware,
  errorLoggerMiddleware
};
