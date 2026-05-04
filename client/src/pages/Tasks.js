import React, { useEffect, useState } from "react";
import API from "../api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title || !description) {
      return alert("Please fill all fields");
    }

    try {
      await API.post("/api/tasks", {
        title,
        description
      });

      setTitle("");
      setDescription("");
      fetchTasks();

      alert("Task Created Successfully");
    } catch (error) {
      console.log(error);
      alert("Task creation failed");
    }
  };

  const completeTask = async (id) => {
    try {
      await API.put(`/api/tasks/${id}`, {
        status: "Completed"
      });

      fetchTasks();
      alert("Task marked as completed");
    } catch (error) {
      console.log(error);
      alert("Task update failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/api/tasks/${id}`);
      fetchTasks();
      alert("Task deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Task delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">
        Tasks
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Create New Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          className="w-full border p-3 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task Description"
          className="w-full border p-3 rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={createTask}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Add Task
        </button>
      </div>

      <div className="space-y-5">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h2 className="text-xl font-semibold">
              {task.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {task.description}
            </p>

            <p className="mt-3 font-medium">
              Status: {task.status || "Pending"}
            </p>

            <div className="flex gap-3 mt-5 flex-wrap">
              <button
                onClick={() => completeTask(task._id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Complete
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
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

export default Tasks;