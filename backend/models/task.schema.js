import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["Pending", "In-progress", "Completed"],
        default: "Pending"
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    completionDate: {
        type: Date,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;