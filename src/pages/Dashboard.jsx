import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks } from "../api/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const getUsertasks = () => {
    getTasks().then(({ tasks }) => setTasks(tasks));
  };

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the authentication token
    navigate("/"); // Redirect to login page
  };

  useEffect(() => {
    getUsertasks();
  }, []);

  return (
    <div className="p-5 w-[45%]">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <TaskForm refreshTasks={getUsertasks} />
      <TaskList tasks={tasks} gettasks={getUsertasks} />
    </div>
  );
};

export default Dashboard;
