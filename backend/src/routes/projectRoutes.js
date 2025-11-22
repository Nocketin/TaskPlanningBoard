const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const validate = require("../validation/validate");
const {
  createProjectSchema,
  updateProjectSchema,
} = require("../validation/projectValidation");
const taskRoutes = require("./taskRoutes");

router.use("/:projectId/tasks", taskRoutes);

router.get("/", projectController.getAllProjects);

router.get("/:id", projectController.getProjectById);

router.post(
  "/",
  validate(createProjectSchema),
  projectController.createProject
);

router.put(
  "/:id",
  validate(updateProjectSchema),
  projectController.updateProject
);

router.delete("/:id", projectController.deleteProject);

module.exports = router;
