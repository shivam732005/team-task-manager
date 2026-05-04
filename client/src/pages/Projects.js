import React, { useEffect, useState } from "react";
import API from "../api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await API.get("/api/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    if (!title || !description) {
      return alert("Please fill all fields");
    }

    try {
      await API.post("/api/projects", {
        title,
        description
      });

      setTitle("");
      setDescription("");

      fetchProjects();
      alert("Project Created Successfully");
    } catch (error) {
      console.log(error);
      alert("Project creation failed");
    }
  };

  const deleteProject = async (id) => {
    try {
      await API.delete(`/api/projects/${id}`);
      fetchProjects();
      alert("Project Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">
        Projects
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Create New Project
        </h2>

        <input
          type="text"
          placeholder="Project Title"
          className="w-full border p-3 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Project Description"
          className="w-full border p-3 rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={createProject}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Create Project
        </button>
      </div>

      <div className="grid gap-5">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold">
              {project.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {project.description}
            </p>

            <div className="flex gap-3 mt-5 flex-wrap">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => deleteProject(project._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;