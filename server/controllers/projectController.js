const Project = require("../models/Project");


// Create Project
const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and Description are required"
      });
    }

    const project = await Project.create({
      title,
      description
    });

    res.status(201).json(project);
  } catch (error) {
    console.log("CREATE PROJECT ERROR:", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};


// Get All Projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1
    });

    res.status(200).json(projects);
  } catch (error) {
    console.log("GET PROJECT ERROR:", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};


// Delete Project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      message: "Project deleted successfully"
    });
  } catch (error) {
    console.log("DELETE PROJECT ERROR:", error);
    res.status(500).json({
      message: "Delete failed"
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  deleteProject
};