const INTERNAL_SERVER_ERROR = {
  status: 500,
  msg: 'Internal Server Error'
};

const errorHandlerMiddleware = (err, req, res, next) => {
  res
    .status(err.status || INTERNAL_SERVER_ERROR.status)
    .send(err.message || INTERNAL_SERVER_ERROR.msg);

  next(err);
};

module.exports = errorHandlerMiddleware;
