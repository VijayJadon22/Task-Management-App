import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/slices/projectSlice.js";
import ProjectCard from "../components/ProjectCard.jsx";
import LoadingSpinner from "../components/LoaingSpinner.jsx";

const Dashboard = () => {
  const { projects, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner/>;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-emerald-600 font-bold text-3xl mb-4 mt-6">
        Your Projects
      </h2>
      <div className="w-full lg:max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 p-4">
        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard project={project} key={project._id} />
          ))}
        {projects.length === 0 && <h1>No Projects Found, Create Project</h1>}
      </div>
    </div>
  );
};

export default Dashboard;
