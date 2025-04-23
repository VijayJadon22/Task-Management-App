import Task from "../models/task.schema.js";


export const createTask = async (req, res) => {
    try {
        const { title, description, completionDate } = req.body;
        const task = new Task({
            title,
            description,
            completionDate,
            userId: req.user._id
        });

        await task.save();
        return res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        return res.status(500).json({ message: "Error creating task" });
    }
}
export const readTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        return res.status(200).send(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tasks" });
    }
}
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: "Task not found" });
        return res.send(updatedTask);
    } catch (error) {
        return res.status(500).json({ message: "Error updating Task" });
    }
}
export const deleteTask = async (req, res) => {
    try {
        
    } catch (error) {

    }
}