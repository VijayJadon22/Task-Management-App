import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { deleteProject, getAllProjects, createProject } from "../controllers/project.controller.js";


const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getAllProjects);
router.delete("/:id", authMiddleware, deleteProject);

export default router;