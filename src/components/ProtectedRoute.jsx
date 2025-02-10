import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
