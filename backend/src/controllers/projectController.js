const projectService = require("../services/projectService");

module.exports = {
  async getAllProjects(req, res, next) {
    try {
      const projects = await projectService.getAll();
      res.json(projects);
    } catch (e) {
      next(e);
    }
  },

  async getProjectById(req, res, next) {
    try {
      const project = await projectService.getById(Number(req.params.id));
      res.json(project);
    } catch (e) {
      next(e);
    }
  },

  async createProject(req, res, next) {
    try {
      const newProject = await projectService.create(req.body);
      res.status(201).json(newProject);
    } catch (e) {
      next(e);
    }
  },

  async updateProject(req, res, next) {
    try {
      const updated = await projectService.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (e) {
      next(e);
    }
  },

  async deleteProject(req, res, next) {
    try {
      await projectService.delete(Number(req.params.id));
      res.json({ message: "Project deleted" });
    } catch (e) {
      next(e);
    }
  },
};
