const Task = require("../models/Task");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const pendingTasks = await Task.countDocuments({
      status: "Pending"
    });

    const completedTasks = await Task.countDocuments({
      status: "Completed"
    });

    const inProgressTasks = await Task.countDocuments({
      status: "In Progress"
    });

    res.status(200).json({
      totalTasks,
      pendingTasks,
      completedTasks,
      inProgressTasks
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};