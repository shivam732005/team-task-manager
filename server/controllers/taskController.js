const Task = require("../models/Task");


// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and Description are required"
      });
    }

    const task = await Task.create({
      title,
      description,
      status: status || "Pending"
    });

    res.status(201).json(task);
  } catch (error) {
    console.log("CREATE TASK ERROR:", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};


// Get All Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({
      createdAt: -1
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.log("GET TASK ERROR:", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};


// Update Task Status
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("UPDATE TASK ERROR:", error);
    res.status(500).json({
      message: "Update failed"
    });
  }
};


// Delete Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.log("DELETE TASK ERROR:", error);
    res.status(500).json({
      message: "Delete failed"
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
};