const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const {
  requestLoggerMiddleware,
  rootRequestMiddleware,
  errorLoggerMiddleware,
  errorHandlerMiddleware
} = require('./middlewares');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(requestLoggerMiddleware);
app.use('/', rootRequestMiddleware);
app.use('/users', userRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use('/boards', boardRouter);
app.use(errorHandlerMiddleware);
app.use(errorLoggerMiddleware);

module.exports = app;
