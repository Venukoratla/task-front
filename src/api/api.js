import Cookies from "js-cookie";

const API = import.meta.env.VITE_BASE_URL; // Update with backend URL if deployed

const authHeaders = () => {
  const token = Cookies.get("token"); // Get token from cookies
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

const adminAuthHeaders = () => {
  const token = Cookies.get("adminToken"); // Get token from cookies
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

export const login = async (data) => {
  const res = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const register = async (data) => {
  const res = await fetch(`${API}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getTasks = async () => {
  const res = await fetch(`${API}/tasks`, { headers: authHeaders() });

  return res.json();
};

export const createTask = async (data) => {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateTask = async (id, data) => {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const getUsers = async () => {
  const res = await fetch(`${API}/admin/users`, {
    headers: adminAuthHeaders(),
  });
  return res.json();
};

export const changeUserRole = async (id, role) => {
  const res = await fetch(`${API}/admin/users/${id}/role`, {
    method: "PATCH",
    headers: adminAuthHeaders(),
    body: JSON.stringify({ role }),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API}/admin/users/${id}`, {
    method: "DELETE",
    headers: adminAuthHeaders(),
  });
  return res.json();
};

export const updateUser = async (id, userData) => {
  const res = await fetch(`${API}/admin/users/${id}`, {
    method: "PATCH",
    headers: {
      ...adminAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const getUserDetails = async (userId) => {
  const response = await fetch(`${API}/admin/users/${userId}`, {
    method: "GET",
    headers: {
      ...adminAuthHeaders(),
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const updateUserTask = async (taskId, updatedData) => {
  console.log(taskId);
  const response = await fetch(`/admin/update-task/${taskId}`, {
    method: "PUT",
    headers: {
      ...adminAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};
