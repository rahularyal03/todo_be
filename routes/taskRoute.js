const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
} = require("../controllers/taskController");

router
  .route("/")
  .get(getAllTasks)
  .post(createTask)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = router;
