import { deleteTask, updateTask } from "../api/api";

const TaskList = ({ tasks, gettasks }) => {
  const handleDelete = async (id) => {
    await deleteTask(id);
    gettasks();
  };

  const handleTaskUpdate = async (taskId, newStatus) => {
    await updateTask(taskId, { priority: newStatus });
    gettasks();
  };

  return (
    <div className="mt-5">
      {tasks?.map((task) => (
        <div
          key={task._id}
          className={`p-4 rounded-lg mb-3 shadow-lg border-l-4 transition duration-300 ${
            task.priority === "Pending"
              ? "bg-red-100 border-red-500"
              : task.priority === "In Progress"
              ? "bg-yellow-100 border-yellow-500"
              : "bg-green-100 border-green-500"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString("en-GB")}
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={task.priority}
                onChange={(e) => handleTaskUpdate(task._id, e.target.value)}
                className="border  border-gray-300 bg-gray-50 text-gray-700 text-sm px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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

              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
