const prisma = require('../libs/prisma.config');

module.exports = {
  getUserByEmail: async (email) => {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        nama: true,
        email: true,
        password: true,
      },
      where: {
        email,
      },
    });

    return user;
  },
};
