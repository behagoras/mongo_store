const boom = require('@hapi/boom');
const { config } = require('../../config');

console.log('Developer state', config.dev);//eslint-disable-line no-console

function withErrorStack(error, stack) {
  if (config.dev) {
    console.log('dev = true');//eslint-disable-line no-console
    return { ...error, stack };
  }
  return error;
}

function logErrors(err, req, res, next) {
  console.log(withErrorStack(err.message, err.stack)); //eslint-disable-line no-console
  next();
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function errorHandler(err, req, res, next) {
  const { output: { statusCode, payload } } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
