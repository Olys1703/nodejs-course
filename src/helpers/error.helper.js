class NotFoundError extends Error {
  constructor(message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = 'Not Found Error';
    this.message = message || 'Not Found';
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = 'Validation Error';
    this.message = message || 'Validation error';
    this.status = 400;
  }
}

module.exports = {
  NotFoundError,
  ValidationError
};
