const Project = require("../models/project");

const getAllProjects = async (req, res) => {
  const projects = await Project.find().populate(
    "display",
    "name",
    "description"
  );

  try {
    if (projects.length === 0) {
      return res.status(400).json({ message: "Didn't find any projects" });
    }
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't get the projects" });
  }
};

const getProjectById = async (req, res) => {
  const { id } = req.params;
  const meeting = await Project.findById(id)
    .populate("display")
    .populate("name")
    .populate("discription");
  try {
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: "Please try again later" });
  }
};

const createProject = async (req, res) => {
  const projectToCreate = await Project.create(req.body);
  try {
    return res.status(201).json(projectToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't create the project" });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const projectToUpdate = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    return res.status(202).json(projectToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't update the project" });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  const meetingToDelete = await Project.findByIdAndDelete(id);
  try {
    return res.status(203).json({ message: "Succesfully Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Couldn't delete project" });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
