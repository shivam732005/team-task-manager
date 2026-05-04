const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
} = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTaskStatus);
router.delete("/:id", deleteTask);

module.exports = router;