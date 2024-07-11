const path = require('path');
class APIError extends Error {
  constructor({ message, errors, status = 500 }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
  }
};
exports.APIError = APIError;

const handler = (err, req, res, next) => {
  const statusCode = err.status ? err.status : 500;
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: err.message,
  });
};

exports.handler = handler;

exports.notFound = (req, res, next) => {
  const isApiRequest = req.headers['user-agent'].includes('axios') || req.headers['user-agent'].includes('fetch') || req.headers['postman-token'] || req.headers['user-agent'].includes('insomnia');
  if (isApiRequest) {
    const err = new APIError({
      message: 'Route Not found',
      status: 404,
    });
    return handler(err, req, res);
  }
  else {
    return res.sendFile(path.join(__dirname, '..', 'public', 'notFound.html'));
  }
};