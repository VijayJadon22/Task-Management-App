import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTasks } from "../redux/slices/taskSlice.js";
import CreateTask from "../components/createTask.jsx";
import TaskCard from "../components/TaskCard.jsx";
import LoadingSpinner from "../components/LoaingSpinner.jsx";

const ViewTasks = () => {
  const { projectId } = useParams();
  const { tasks, loading } = useSelector((state) => state.task);
  const [createTask, setCreateTask] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks(projectId));
  }, [dispatch, projectId]);

  if (loading) {
    return <LoadingSpinner/>;
  }
  return (
    <div className={`min-h-screen relative flex flex-col items-center `}>
      <h2 className="text-emerald-600 font-bold text-3xl mb-8 mt-2">
        Projects Task
      </h2>
      <button
        onClick={() => setCreateTask((value) => !value)}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mb-3"
      >
        Create Task
      </button>
      <div className="w-full lg:max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 p-4">
        {tasks &&
          tasks.length > 0 &&
          tasks.map((task) => <TaskCard task={task} key={task._id} />)}
        {tasks.length === 0 && (
          <h1>No Tasks Found, Create Tasks for the Project</h1>
        )}
      </div>
      {createTask && (
        // <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        //   <CreateTask projectId={projectId} setCreateTask={setCreateTask} />
        // </div>
        <CreateTask projectId={projectId} setCreateTask={setCreateTask} />
      )}
    </div>
  );
};

export default ViewTasks;
