import { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      console.log(data);

      if (data?.role === "admin") {
        Cookies.set("adminToken", data.token);
        navigate("/admin-dashboard");
      }
      if (data?.role === "user") {
        Cookies.set("token", data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className=" w-full flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 ">
      <form
        className="w-[30%] bg-white p-8 shadow-2xl rounded-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Login
        </h2>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            className="w-full p-3 text-black placeholder-gray-500 border border-gray-300 rounded-lg "
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
            className="w-full p-3 text-black placeholder-gray-500 border border-gray-300 rounded-lg "
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        <p className="text-gray-600 text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
