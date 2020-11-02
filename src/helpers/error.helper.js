class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = 'Forbidden Error';
    this.message = message || 'Forbidden';
    this.status = 403;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = 'Unauth Error';
    this.message = message || 'Not Authorized';
    this.status = 401;
  }
}

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
  ForbiddenError,
  AuthError,
  ValidationError
};
