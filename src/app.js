const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');

const {
  requestLoggerMiddleware,
  rootRequestMiddleware,
  errorLoggerMiddleware,
  errorHandlerMiddleware,
  authMiddleware
} = require('./middlewares');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(requestLoggerMiddleware);
app.use('/', rootRequestMiddleware);
app.use('/login', loginRouter);
app.use('/users', authMiddleware, userRouter);
app.use('/boards/:boardId/tasks', authMiddleware, taskRouter);
app.use('/boards', authMiddleware, boardRouter);
app.use(errorHandlerMiddleware);
app.use(errorLoggerMiddleware);

module.exports = app;
