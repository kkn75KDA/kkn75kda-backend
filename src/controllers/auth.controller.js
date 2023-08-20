/* eslint-disable comma-dangle */
const bcrypt = require('bcrypt');

const { NODE_ENV, REFRESH_SECRET, SECRET_KEY } = process.env;

const loginValidationSchema = require('../utils/validations/login.schema');
const { getUserByEmail } = require('../utils/services/user.service');
const { generateToken, verifyToken } = require('../utils/libs/jwt.lib');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { error, value } = loginValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const { email, password } = value;

      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ status: false, message: 'Email not registered!' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ status: false, message: 'Password is incorrect!' });
      }

      const accessToken = generateToken({ id: user.id, email: user.email }, '1d', SECRET_KEY);
      const refreshToken = generateToken({ id: user.id, email: user.email }, '7d', REFRESH_SECRET);

      res.cookie('access_token', accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: NODE_ENV === 'production',
      });

      res.cookie('refresh_token', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: NODE_ENV === 'production',
      });

      res.cookie('isLoggedIn', true, {
        maxAge: 1000 * 60 * 60 * 24,
      });

      return res.status(200).json({
        status: true,
        message: 'success!',
        data: { access_token: accessToken, refresh_token: refreshToken },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  refreshToken: async (req, res, next) => {
    try {
      const token = req.cookies.refresh_token;

      if (!token) {
        return res.status(401).json({ status: false, message: 'Unauthorized!' });
      }

      const decodeToken = verifyToken(token, REFRESH_SECRET);

      if (decodeToken.error) {
        return res.status(401).json({ status: false, message: 'Unauthorized!' });
      }

      const user = await getUserByEmail(decodeToken.email);

      const accessToken = generateToken({ id: user.id, email: user.email }, '1d', SECRET_KEY);

      res.cookie('access_token', accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: NODE_ENV === 'production',
      });

      res.cookie('isLoggedIn', true, {
        maxAge: 1000 * 60 * 60 * 24,
      });

      return res
        .status(200)
        .json({ status: true, message: 'success', data: { access_token: accessToken } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  logout: async (req, res, next) => {
    try {
      const token = req.cookies.access_token;

      if (!token) {
        return res.status(401).json({
          status: false,
          message: 'Unauthorized!',
        });
      }

      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.clearCookie('isLoggedIn');

      return res.status(200).json({ status: true, message: 'Logout Success!' });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
