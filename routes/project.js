const express = require("express");
const Project = require("../models/Project");
const cloudinary = require("cloudinary").v2;
const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  const projects = await Project.find();
  return res.json(projects);
});

// GET SingleProject
router.get("/project/:id", async (req, res) => {
  const { id } = req.params;
  const singleProject = await Project.findById(id).populate("name");
  try {
    return res.status(200).json(singleProject);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't not get the project" });
  }
});

// POST Project
router.post("/project", async (req, res) => {
  const projectToCreate = await Project.create(req.body);
  try {
    return res.status(201).json(projectToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Could not create the project" });
  }
});

// POST imageUpload
router.post("/project/imageUpload/:id", async (req, res) => {
  const { id } = req.params;
  const projectToUpdate = await Project.findById(id);

  // if it has an image, delete current and update new
  if (projectToUpdate.img) {
    let array = projectToUpdate.img.split("/");
    let fileName = array[array.length - 1];
    const [public_id] = fileName.split(".");
    await cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.image;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  projectToUpdate.img = secure_url;
  await projectToUpdate.save();
  try {
    return res.status(201).json(projectToUpdate);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an erro uploading the image" });
  }
});

// PUT Project
router.put("/project/:id", async (req, res) => {
  const { id } = req.params;
  const projectToUpdate = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    return res.status(202).json(projectToUpdate);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Couldn't update project, check the server" });
  }
});

// DELETE Project
router.delete("/project/:id", async (req, res) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  try {
    return res.json({ message: "Project successfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR could not delete project" });
  }
});

module.exports = router;
