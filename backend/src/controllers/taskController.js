const taskService = require("../services/taskService");

module.exports = {
  async getAllTasks(req, res, next) {
    try {
      const { status, priority, search } = req.query;

      const tasks = await taskService.getAll(Number(req.params.projectId), {
        status,
        priority,
        search,
      });
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  },

  async getTaskById(req, res, next) {
    try {
      const task = await taskService.getById(
        Number(req.params.projectId),
        Number(req.params.id)
      );
      res.json(task);
    } catch (err) {
      next(err);
    }
  },

  async createTask(req, res, next) {
    try {
      const newTask = await taskService.create(
        Number(req.params.projectId),
        req.body
      );
      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  },

  async updateTask(req, res, next) {
    try {
      const updated = await taskService.update(
        Number(req.params.projectId),
        Number(req.params.id),
        req.body
      );
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async deleteTask(req, res, next) {
    try {
      await taskService.delete(
        Number(req.params.projectId),
        Number(req.params.id)
      );
      res.json({ message: "Task deleted" });
    } catch (err) {
      next(err);
    }
  },
};
