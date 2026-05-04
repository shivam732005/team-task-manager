const mongoose = require("mongoose");
const Task = require("../server/models/Task");

module.exports = async (req, res) => {
  await mongoose.connect(process.env.MONGO_URI);

  const totalTasks = await Task.countDocuments();
  const completedTasks = await Task.countDocuments({ status: "Completed" });
  const pendingTasks = await Task.countDocuments({ status: "Pending" });

  res.json({
    totalTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks: 0
  });
};