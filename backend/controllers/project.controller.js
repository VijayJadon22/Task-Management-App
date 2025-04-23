import Project from "../models/project.schema.js";

export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const existingProjects = await Project.find({ userId: req.user._id });
        if (existingProjects.length >= 4) return res.status(403).json({ message: "Project limit reached" });

        const project = new Project({
            name,
            description,
            userId:req.user._id,
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
        return res.status(500).json({ message: "Error fetching project" });
    }
}
export const deleteProject = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}