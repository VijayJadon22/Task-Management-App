import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createTask, deleteTask, readTasks, updateTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/:projectId", authMiddleware, createTask);
router.get("/:projectId", authMiddleware, readTasks);
router.put("/:projectId/:taskId", authMiddleware, updateTask);
router.delete("/:projectId/:taskId", authMiddleware, deleteTask);

export default router;