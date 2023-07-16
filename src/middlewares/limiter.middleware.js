const limiter = {
  windowMs: 60 * 1000,
  max: 80,
  message: 'Too many requests from your IP. Please try again later.',
};

module.exports = limiter;
