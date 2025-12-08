import express from "express";
import Todo from "../model/Todo.js";

const router = express.Router();

// Get all todos + search
router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";
    const todos = await Todo.find({ title: { $regex: search, $options: "i" } });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({ title: req.body.title });
    const saved = await newTodo.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update todo
router.put("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
