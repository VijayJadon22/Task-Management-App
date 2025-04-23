import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createTask, deleteTask, readTasks, updateTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, readTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;