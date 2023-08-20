/* eslint-disable arrow-body-style */
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

module.exports = {
  generateToken: (payload, expiresIn, secret = SECRET_KEY) => {
    return jwt.sign(payload, secret, { expiresIn });
  },

  verifyToken: (token, secret = SECRET_KEY) => {
    try {
      const decoded = jwt.verify(token, secret);

      return decoded;
    } catch (error) {
      return { error: true };
    }
  },
};
