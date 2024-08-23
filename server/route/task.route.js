// routes/task.js
const express = require("express");
const Task = require("../model/Task");
const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const taskRoutes = express.Router();

// Create a task
taskRoutes.post("/", protect, async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Task.create({ title, description, user: req.user._id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all tasks
taskRoutes.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task
taskRoutes.put("/:id", protect, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task (Admin only)
taskRoutes.delete("/:id", protect, authorize(["admin"]), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.remove();
    res.status(200).json({ message: "Task removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = taskRoutes;
