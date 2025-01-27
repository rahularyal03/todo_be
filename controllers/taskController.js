const Task = require("../models/task");

exports.getAllTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const query = {};
    if (priority) {
      query.priority = priority;
    }

    if (status) {
      query.status = status;
    }
    const tasks = await Task.find(query);

    res.status(200).json({ data: tasks });
  } catch (error) {
    console.log("Error in getAllTasks: ", error);
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  console.log(req.body);
  try {
    const { title, description, priority, filter, status } = req.body;
    if (!title || !description || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = new Task({
      title,
      description,
      priority: priority || "low",
      status,
    });

    const savedTask = await task.save();
    res
      .status(201)
      .json({ message: "Task created successfully", data: savedTask });
  } catch (error) {
    console.log("Error in createTask: ", error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    const task = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log("Error in updateTask: ", error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    console.log(req.params);
    const { taskId } = req.body;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error in deleteTask: ", error);
    res.status(500).json({ message: error.message });
  }
};
