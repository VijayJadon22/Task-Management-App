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

    } catch (error) {

    }
}
export const updateTask = async (req, res) => {
    try {

    } catch (error) {

    }
}
export const deleteTask = async (req, res) => {
    try {

    } catch (error) {

    }
}