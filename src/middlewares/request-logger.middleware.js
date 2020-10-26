const { finished } = require('stream');

const { logRequest, logResponse } = require('../helpers/logger.helper.js');

const requestLoggerMiddleware = (req, res, next) => {
  const startTimeMs = Date.now();

  logRequest(req);

  finished(res, () => {
    logResponse(req, res, startTimeMs);
  });

  next();
};

module.exports = requestLoggerMiddleware;
