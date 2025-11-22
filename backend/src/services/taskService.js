const prisma = require("../db/prisma");

module.exports = {
  async getAll(projectId, filters = {}) {
    const where = { projectId };
    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return tasks.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      status: t.status,
      priority: t.priority,
      dueDate: t.dueDate,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    }));
  },

  async getById(projectId, id) {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task || task.projectId !== projectId) {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }

    return task;
  },

  async create(projectId, data) {
    return prisma.task.create({
      data: {
        projectId,
        title: data.title,
        description: data.description ?? null,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });
  },

  async update(projectId, id, data) {
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing || existing.projectId !== projectId) {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }

    return prisma.task.update({
      where: { id },
      data: {
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
        status: data.status ?? existing.status,
        priority: data.priority ?? existing.priority,
        dueDate: data.dueDate ? new Date(data.dueDate) : existing.dueDate,
      },
    });
  },

  async delete(projectId, id) {
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing || existing.projectId !== projectId) {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }

    return prisma.task.delete({ where: { id } });
  },
};
