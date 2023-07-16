require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const cookieparser = require('cookie-parser');

const app = express();
const { PORT } = process.env;

// Local
const { notFoundHandler, errorHandler, limiterHandler } = require('./middlewares');
const indexRouter = require('./routes');

// Middleware
app.use(rateLimit(limiterHandler));
app.use(
  cors({
    origin: process.env.FE_ORIGIN || 'http://localhost:3000',
    credentials: true,
    // eslint-disable-next-line comma-dangle
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(morgan('dev'));

// Route
app.use(indexRouter);

// Server error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT || 8080, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${PORT || 8080}`);
});
