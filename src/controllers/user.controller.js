const { getUserByEmailwoPw } = require('../utils/services/user.service');

module.exports = {
  getUser: async (req, res, next) => {
    try {
      const { email } = req.user;
      const user = await getUserByEmailwoPw(email);

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
