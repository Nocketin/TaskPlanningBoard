const express = require("express");
const router = express.Router({mergeParams: true});
const taskController = require("../controllers/taskController");
const validate = require("../validation/validate");
const {createTaskSchema, updateTaskSchema} = require("../validation/taskValidation");

router.get("/", taskController.getAllTasks);

router.get("/:id", taskController.getTaskById);

router.post("/", validate(createTaskSchema), taskController.createTask);

router.put("/:id", validate(updateTaskSchema), taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;