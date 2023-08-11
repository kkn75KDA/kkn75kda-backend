/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const authMiddleware = (req, res, next) => {
  //   const authHeader = req.headers.authorization;
  const authCookie = req.cookies.access_token;

  if (!authCookie) {
    return res.sendStatus(403);
  }

  if (authCookie) {
    jwt.verify(authCookie, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: false,
          message: err.message,
          data: null,
        });
      }

      req.user = user;
      next();
    });
  }
};

module.exports = authMiddleware;
