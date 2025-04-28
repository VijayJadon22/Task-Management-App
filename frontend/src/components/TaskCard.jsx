import React, { useState } from "react";
import { deleteProject } from "../redux/slices/projectSlice.js";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import UpdateTask from "./UpdateTask.jsx";
import { deleteTask } from "../redux/slices/taskSlice.js";

const TaskCard = ({ task }) => {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteTask({ projectId: task.projectId, taskId: id }));
    toast.success("Task Deleted Successfully");
  };
  return (
    <div className="flex flex-col justify-evenly  m-2 p-4 border border-gray-300 rounded shadow-lg hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-bold mb-2">{task?.title}</h3>
      <p className="text-gray-700 mb-4">{task?.description}</p>
      <p className="text-gray-700 mb-4">Status: {task?.status}</p>
      <p className="text-gray-700 mb-4">Status: {task?.completionDate}</p>
      <div className="">
        <button
          onClick={() => setOpened((value) => !value)}
          className="mr-2 bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(task?._id)}
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer "
        >
          Delete Task
        </button>
      </div>
      {opened && <UpdateTask task={task} setOpened={setOpened} />}
    </div>
  );
};

export default TaskCard;
