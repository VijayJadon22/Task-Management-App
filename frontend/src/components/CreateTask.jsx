import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createTask } from "../redux/slices/taskSlice.js";

const CreateTask = ({ projectId, setCreateTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completionDate: "",
  });
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.title.trim() === "" ||
      formData.description.trim() === "" ||
      formData.completionDate.trim() === ""
    ) {
      toast.error("Please fill all fields", { id: "missingFields" });
      return;
    }
    console.log("formData, projectId", formData, projectId);
    dispatch(createTask({ formData, projectId }));
    setFormData({ title: "", description: "", completionDate: "" });
    toast.success("Task created successfully", { id: "task-created" });
  };
  return (
    <div className="absolute inset-0 flex justify-center items-center z-50 bg-white">
      <form
        onSubmit={handleSubmit}
        className="min-w-md mx-auto shadow-xl p-4 rounded-2xl"
      >
        <div className="flex justify-end ">
          <button onClick={() => setCreateTask((value) => !value)} className="cursor-pointer">X</button>
        </div>
        <label htmlFor="title">Title Of Task</label>
        <input
          onChange={handleInputChange}
          name="title"
          type="text"
          value={formData.title}
          placeholder="Enter Task Title"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <label htmlFor="description">Description Of Task</label>
        <input
          onChange={handleInputChange}
          name="description"
          type="text"
          value={formData.description}
          placeholder="Enter Task Description"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <label htmlFor="completionDate">Title Of Task</label>
        <input
          onChange={handleInputChange}
          name="completionDate"
          type="date"
          value={formData.completionDate}
          placeholder="Enter Task Completion Date"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
