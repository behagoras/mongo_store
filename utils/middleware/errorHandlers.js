const { config } = require('../../config');

console.log('config.dev', config.dev);

function withErrorStack(error, stack) {
  if (config.dev) {
    console.log('dev = true');
    return { error, stack };
  }
  return error;
}

function logErrors(err, req, res, next) { //eslint-disable-line
  console.log('Erroring');
  console.log(withErrorStack(err.message, err.stack)); //eslint-disable-line
  next();
}

function errorHandler(err, req, res, next) { //eslint-disable-line
  res.json('erroring v2');
  console.log('erroring v2');
  res.status(err.status || 500);
  res.json(withErrorStack(err.message, err.stack));
}

module.exports = {
  logErrors,
  errorHandler,
};
