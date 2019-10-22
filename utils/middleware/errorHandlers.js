const { config } = require('../../config');

console.log('Developer state', config.dev);//eslint-disable-line no-console

function withErrorStack(error, stack) {
  if (config.dev) {
    console.log('dev = true');//eslint-disable-line no-console
    return { error, stack };
  }
  return error;
}

function logErrors(err, req, res, next) {
  console.log(withErrorStack(err.message, err.stack)); //eslint-disable-line no-console
  next();
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.json(withErrorStack(err.message, err.stack));
}

module.exports = {
  logErrors,
  errorHandler,
};
