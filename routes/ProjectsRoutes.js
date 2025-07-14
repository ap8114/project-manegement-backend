const express = require("express");
const router = express.Router();
const projectController = require("../controllers/ProjectsController");

router.get("/", projectController.getAllProjects);
router.post("/", projectController.createProject);
router.get("/:id", projectController.getProjectById);
router.put("/update/:id", projectController.updateProject);
router.delete("/delete/:id", projectController.deleteProject);

module.exports = router;
