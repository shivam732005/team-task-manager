const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      projectId,
      deadline
    } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      projectId,
      deadline
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("projectId", "title");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};