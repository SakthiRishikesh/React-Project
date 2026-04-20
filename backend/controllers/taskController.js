import Task from "../models/Task.js";

// Get tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Create task
export const createTask = async (req, res) => {
  const { text, priority, dueDate } = req.body;

  try {
    const task = await Task.create({
      text,
      priority,
      dueDate,
      user: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res
        .status(404)
        .json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ message: "Not authorized" });

    Object.assign(task, req.body);

    const updated = await task.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res
        .status(404)
        .json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ message: "Not authorized" });

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};