const chalk = require('chalk');

const logUncaughtException = err => {
  console.log(`${chalk.red.bold(`Uncaught Exception: ${err.stack}`)} \n`);
};

const logUnhandledRejection = err => {
  console.error(`${chalk.red.bold(`Uncaught Rejection: ${err.stack}`)} \n`);
};

const logValidationError = err => {
  console.error(`${chalk.red(err.stack)} \n`);
};

const logNotFoundError = err => {
  console.error(`${chalk.red(err.stack)} \n`);
};

const logError = err => {
  console.error(`${chalk.red.bold(err.stack)} \n`);
};

const logTitle = title => {
  console.log(`${chalk.green.bold(`${title}:`)}`);
};

const logURL = ({ method, url }) => {
  console.log(` ${chalk.yellow('URL:')} [${method}] ${url}`);
};

const logQueryParams = ({ query }) => {
  console.log(
    ` ${chalk.yellow('Query Parameters:')} ${
      Object.entries(query).length ? JSON.stringify(query) : '-'
    }`
  );
};

const logBody = ({ body }) => {
  console.log(
    ` ${chalk.yellow('Body:')} ${
      Object.entries(body).length ? JSON.stringify(body) : '-'
    }`
  );
};

const logDuration = startTimeMs => {
  const durationMs = Date.now() - startTimeMs;

  console.log(` ${chalk.yellow('Duration:')} ${durationMs}ms`);
};

const logStatusCode = ({ statusCode }) => {
  console.log(` ${chalk.yellow('Status Code:')} ${statusCode}`);
};

const logRequest = req => {
  logTitle('Request');
  logURL(req);
  logQueryParams(req);
  logBody(req);
  console.log('');
};

const logResponse = (req, res, startTimeMs) => {
  logTitle('Response');
  logURL(req);
  logStatusCode(res);
  logDuration(startTimeMs);
  console.log('');
};

module.exports = {
  logRequest,
  logResponse,
  logUncaughtException,
  logUnhandledRejection,
  logValidationError,
  logNotFoundError,
  logError
};
