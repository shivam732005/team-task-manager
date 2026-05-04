import React, { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [stats, setStats] = useState({});

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/api/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks || 0
    },
    {
      title: "Pending Tasks",
      value: stats.pendingTasks || 0
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks || 0
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks || 0
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">
        Team Task Manager Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              {card.title}
            </h2>

            <p className="text-4xl font-bold mt-4">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;