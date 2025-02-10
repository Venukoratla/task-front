import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

import Register from "./pages/Register";
import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtect from "./components/AdminProtect";
import UserDetailPage from "./pages/UserDetailPage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <AdminProtect>
                <AdminDashboard />
              </AdminProtect>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
