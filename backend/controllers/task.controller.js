import Project from "../models/project.schema.js";
import Task from "../models/task.schema.js";

export const createTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        console.log("Inside controller", projectId);

        // Find the project
        const project = await Project.findById(projectId);
        if (!project || project.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to add tasks to this project" });
        }

        // Extract task details from the request body
        const { title, description, completionDate } = req.body;

        // Create the task
        const task = new Task({
            title,
            description,
            completionDate,
            userId: req.user._id,
            projectId,
        });

        // Save the task
        await task.save();

        // Push the task ID to the project's tasks array
        project.tasks.push(task._id);
        await project.save();

        return res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        console.error("Error creating task:", error.message);
        return res.status(500).json({ message: "Error creating task" });
    }
};

export const readTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        console.log("inside", projectId);
        const project = await Project.findById(projectId);
        if (!project || project.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not authorized to read tasks to this project" });
        const tasks = await Task.find({ projectId });
        return res.status(200).send(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tasks" });
    }
}
export const updateTask = async (req, res) => {
    try {
        const { projectId, taskId } = req.params;
        console.log("projectId, taskId", projectId, taskId)
        const project = await Project.findById(projectId);
        if (!project || project.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not authorized to update tasks to this project" });
        const task = await Task.findOne({ _id: taskId, projectId });
        if (!task) return res.status(404).json({ message: "Task not found" });

        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
        return res.send(updatedTask);
    } catch (error) {
        return res.status(500).json({ message: "Error updating Task" });
    }
}
export const deleteTask = async (req, res) => {
    try {
        const { projectId, taskId } = req.params;
        const project = await Project.findById(projectId);
        if (!project || project.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not authorized to delete tasks to this project" });

        const task = await Task.findOneAndDelete({ _id: taskId, projectId });
        if (!task) return res.status(404).send("Task not found");

        await Project.findByIdAndUpdate(projectId, { $pull: { tasks: task._id } });

        return res.status(200).json({ message: "Task deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleteing Task" });
    }
}