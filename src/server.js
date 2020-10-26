const { PORT } = require('./common/config');
const db = require('./db.js');
const app = require('./app');
const mongoose = require('mongoose');
const {
  logUncaughtException,
  logUnhandledRejection
} = require('./helpers/logger.helper.js');

process.on('uncaughtException', err => {
  logUncaughtException(err);

  const { exit } = process;
  exit(1);
});

process.on('unhandledRejection', err => {
  logUnhandledRejection(err);

  const { exit } = process;
  exit(1);
});

db.then(() => {
  console.log('MongoDB connection successful');

  mongoose.connection.db.dropDatabase(
    console.log('MongoDB collection was dropped successfully')
  );

  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
}).catch(err => {
  console.log('MongoDB connection failed: ', err);
});
