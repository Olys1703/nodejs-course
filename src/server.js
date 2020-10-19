const { PORT } = require('./common/config');
const app = require('./app');
const {
  logUncaughtException,
  logUnhandledRejection
} = require('./helpers/logger.helper.js');

process.on('uncaughtException', logUncaughtException);

// uncomment next line for checking uncaughtException
// throw Error('Oops!');

process.on('unhandledRejection', logUnhandledRejection);

// uncomment next line for checking unhandledRejection
// Promise.reject(Error('Oops!'));

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
