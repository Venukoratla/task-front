import { useEffect, useState } from "react";
import { getUsers, changeUserRole, deleteUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getUsers().then(({ data }) => setUsers(data));
  }, []);

  const handleRoleChange = async (id, role) => {
    await changeUserRole(id, role);
    setUsers(users.map((user) => (user._id === id ? { ...user, role } : user)));
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user._id !== id));
  };

  const handleLogout = () => {
    Cookies.remove("adminToken"); // Remove the authentication token
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="mt-5 p-4 bg-white shadow-lg rounded-lg w-full">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Manage Users</h2>

      <table className="w-full border-collapse border rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border p-3 text-left">Name</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3 text-left">Role</th>
            <th className="border p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr
              key={user._id}
              className="border hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/user/${user._id}`)}
            >
              <td className="border p-3">{user.name}</td>
              <td className="border p-3">{user.email}</td>
              <td className="border p-3">{user.role}</td>
              <td className=" p-3 flex justify-center space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoleChange(
                      user._id,
                      user.role === "admin" ? "user" : "admin"
                    );
                  }}
                >
                  Change Role
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteUser(user._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
