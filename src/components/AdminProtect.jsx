import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminProtect = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("adminToken");
  if (token) {
    navigate("/admin-dashboard");
  }
  if (!token) {
    navigate("/");
  }

  return children;
};

export default AdminProtect;
