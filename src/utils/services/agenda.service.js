const prisma = require('../libs/prisma.config');

module.exports = {
  getAllAgenda: async () => {
    const agenda = await prisma.agenda.findMany({ orderBy: { tanggal: 'asc' } });

    return agenda;
  },

  getAgendaById: async (id) => {
    const agenda = await prisma.agenda.findUnique({ where: { id: parseInt(id, 10) } });

    if (!agenda) {
      return { status: false, message: `Agenda with id ${id} not exist!` };
    }

    return agenda;
  },

  createAgenda: async (data) => {
    const { judul, tempat, tanggal, waktu } = data;

    const agenda = await prisma.agenda.create({ data: { judul, tempat, tanggal, waktu } });

    return agenda;
  },

  updateAgenda: async (id, data) => {
    const findAgenda = await prisma.agenda.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findAgenda) {
      return { status: false, message: `Agenda with id ${id} not exist!` };
    }

    const agenda = await prisma.agenda.update({ where: { id: parseInt(id, 10) }, data });

    return agenda;
  },

  deleteAgenda: async (id) => {
    const findAgenda = await prisma.agenda.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findAgenda) {
      return { status: false, message: `Agenda with id ${id} not exist!` };
    }

    const agenda = await prisma.agenda.delete({ where: { id: parseInt(id, 10) } });

    return agenda;
  },
};
