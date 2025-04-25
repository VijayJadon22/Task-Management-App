import React, { useState } from "react";
import toast from "react-hot-toast";
import { createProject } from "../redux/slices/projectSlice.js";
import { useDispatch, useSelector } from "react-redux";

const CreateProject = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "" || formData.description.trim() === "") {
      toast.error("Please fill all fields", { id: "missingFields" });
      return;
    }
    if (projects.length == 4) {
      toast.error("Project Limit reached Max:4", { id: "project-created" });
      return;
    }
    console.log(formData);
    dispatch(createProject(formData));
    setFormData({ name: "", description: "" });
    toast.success("Project created successfully", { id: "project-created" });
    // dispatch((formData));
  };
  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-emerald-600 font-bold text-3xl mb-4">
        Create Project
      </h1>
      <form
        onSubmit={handleSubmit}
        className="min-w-md mx-auto shadow-xl p-4 rounded-2xl"
      >
        <label htmlFor="name">Name Of Project</label>
        <input
          onChange={handleInputChange}
          name="name"
          type="text"
          value={formData.name}
          placeholder="Enter Project Name"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <label htmlFor="description">Description Of Project</label>
        <input
          onChange={handleInputChange}
          name="description"
          type="text"
          value={formData.description}
          placeholder="Enter Project Description"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
