import React, { useEffect, useState } from "react";
import API from "../api";

function Tasks() {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      <h1>Tasks</h1>

      {tasks.map((task) => (
        <div key={task._id}>
          {task.title}
        </div>
      ))}
    </div>
  );
}

export default Tasks;