const { PORT } = require('./common/config');
const db = require('./db.js');
const app = require('./app');
// const mongoose = require('mongoose');
const {
  logUncaughtException,
  logUnhandledRejection
} = require('./helpers/logger.helper.js');
const User = require('./resources/users/user.model.js');
const Task = require('./resources/tasks/task.model.js');
const Board = require('./resources/boards/board.model.js');

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

db.then(async () => {
  console.log('MongoDB connection successful');

  await User.deleteMany();
  await Task.deleteMany();
  await Board.deleteMany();

  const admin = new User({ login: 'admin', password: 'admin' });
  await admin.save();

  // mongoose.connection.db.dropDatabase(
  //   console.log('MongoDB collection was dropped successfully')
  // );

  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
}).catch(err => {
  console.log('MongoDB connection failed: ', err);
});
