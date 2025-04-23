import Project from "../models/project.schema.js";
import Task from "../models/task.schema.js";

export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const existingProjects = await Project.find({ userId: req.user._id });
        if (existingProjects.length >= 4) return res.status(403).json({ message: "Project limit reached" });

        const project = new Project({
            name,
            description,
            userId: req.user._id,
        })
        await project.save();
    } catch (error) {
        return res.status(500).json({ message: "Error creating project" });
    }
}
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user._id }).populate("tasks");
        return res.status(200).send(projects);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching projects" });
    }
}
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project || project.userId.toString() !== req.user._id) {
            return res.status(403).send("You are not authorized to delete this project");
        }

        await Task.deleteMany({ projectId: id });
        await Project.findOneAndDelete(id);
        return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleteing project" });
    }
}