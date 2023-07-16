const notFoundHandler = require('./notfound.middleware');
const errorHandler = require('./error.middleware');
const limiterHandler = require('./limiter.middleware');

module.exports = {
  notFoundHandler,
  errorHandler,
  limiterHandler,
};
