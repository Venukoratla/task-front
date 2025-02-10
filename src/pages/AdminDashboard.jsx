import AdminPanel from "../components/AdminPanel";
import TaskList from "../components/TaskList";

const AdminDashboard = () => {
  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AdminPanel />
      <TaskList />
    </div>
  );
};

export default AdminDashboard;
