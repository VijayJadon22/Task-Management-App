import React from "react";
import { deleteProject } from "../redux/slices/projectSlice.js";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

const ProjectCard = ({ project }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteProject(id));
    toast.success("Project Deleted Successfully");
  };
  return (
    <div className="flex flex-col justify-evenly  m-2 p-4 border border-gray-300 rounded shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300">
      <h3 className="text-xl text-gray-600 font-bold mb-2">{project.name}</h3>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <div className="">
        <button
          onClick={() => handleDelete(project._id)}
          className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer mr-2"
        >
          <MdDeleteForever />
        </button>
        <Link
          to={`/viewtask/${project._id}`}
          className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
        >
          View Tasks
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
