import { useState } from "react";
import { createTask } from "../api/api";

const TaskForm = ({ refreshTasks }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "In Progress",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createTask(taskData);
    console.log(res);
    if (res.success) {
      refreshTasks(); // Refresh task list
      setTaskData({
        title: "",
        description: "",
        priority: "In Progress",
        dueDate: "",
      }); // Clear form
    } else {
      alert("Failed to create task");
    }
  };

  return (
    <form
      className="bg-white p-6 shadow-lg rounded-xl mb-6 border border-gray-200 "
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
        Create a New Task
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            onChange={handleChange}
            value={taskData.title}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Task Description */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter task description"
            onChange={handleChange}
            value={taskData.description}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 h-28 resize-none"
            required
          ></textarea>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            onChange={handleChange}
            value={taskData.dueDate}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Priority Selector */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Priority
          </label>
          <select
            name="priority"
            onChange={handleChange}
            value={taskData.priority}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="Pending" className="text-green-600">
              Pending
            </option>
            <option value="In Progress" className="text-yellow-600">
              In Progress
            </option>
            <option value="Completed" className="text-red-600">
              Completed
            </option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold p-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
