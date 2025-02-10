import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteTask, getUserDetails, updateUserTask } from "../api/api";

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getUserDetails(id).then(({ user, tasks }) => {
      setUser(user);
      setTasks(tasks);
    });
  }, [id]);

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    getUserDetails(id).then(({ user, tasks }) => {
      setUser(user);
      setTasks(tasks);
    });
  };

  const handleTaskUpdate = async (taskId, newStatus) => {
    const updatedTask = await updateUserTask(taskId, { status: newStatus });
    setTasks(
      tasks.map((task) => (task._id === taskId ? updatedTask.task : task))
    );
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-[50%] mt-3">
      {user ? (
        <>
          <h2 className="text-2xl font-bold">{user.name}'s Details</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>

          <h3 className="text-2xl font-semibold mt-6 text-gray-800 border-b pb-2">
            User Tasks
          </h3>
          <ul className="mt-4 space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg border border-gray-200 hover:shadow-lg transition duration-300"
              >
                <span className="text-gray-700 font-medium">
                  {task.description}
                </span>

                <div className="flex items-center space-x-4">
                  {/* Status Dropdown */}
                  <select
                    value={task.priority}
                    onChange={(e) => handleTaskUpdate(task._id, e.target.value)}
                    className="border border-gray-300 bg-gray-50 text-gray-700 text-sm px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  >
                    <option value="Pending" className="text-yellow-600">
                      Pending
                    </option>
                    <option value="In Progress" className="text-blue-600">
                      In Progress
                    </option>
                    <option value="Completed" className="text-green-600">
                      Completed
                    </option>
                  </select>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetailPage;
