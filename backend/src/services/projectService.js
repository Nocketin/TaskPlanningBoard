const prisma = require("../db/prisma");

module.exports = {
  async getAll() {
    const projects = await prisma.project.findMany({
      include: {
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return projects.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      createdAt: p.createdAt,
      tasksCount: p._count?.tasks ?? 0,
    }));
  },

  async getById(id) {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        tasks: true,
      },
    });
    if (!project) {
      const err = new Error("Project not found");
      err.status = 404;
      throw err;
    }
    return project;
  },

  async create(data) {
    return prisma.project.create({
      data: {
        name: data.name,
        description: data.description ?? null,
      },
    });
  },

  async update(id, data) {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      const err = new Error("Project not found");
      err.status = 404;
      throw err;
    }

    return prisma.project.update({
      where: { id },
      data: {
        name: data.name ?? existing.name,
        description: data.description ?? existing.description,
      },
    });
  },

  async delete(id) {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      const err = new Error("Project not found");
      err.status = 404;
      throw err;
    }

    return prisma.project.delete({ where: { id } });
  },
};
