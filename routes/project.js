const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { validateJwt, isAdmin } = require("../middlewares/processJwt");

router.get("/", getAllProjects);

router.get("/project/:id", getProjectById);

router.post("/project", validateJwt, isAdmin, createProject);

router.put("/project/:id", validateJwt, isAdmin, updateProject);

router.delete("/project/:id", validateJwt, isAdmin, deleteProject);

module.exports = router;
