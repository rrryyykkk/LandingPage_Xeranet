import { useState } from "react";
import Header from "../components/Admin/Header";
import Sidebar from "../components/Admin/Sidebar";
import { Outlet } from "react-router-dom";
import Toast from "../components/Admin/common/Toast";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [toats, setToats] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const showToats = () => {
    setToats(null);
  };
  return (
    <div className="min-h-screen flex bg-base-100">
      <Sidebar open={isSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header onSidebarToggle={toggleSidebar} />
        <main className="p-4">
          <Outlet />
        </main>
        {toats && (
          <Toast
            type={toats.type}
            message={toats.message}
            onClose={showToats}
          />
        )}
      </div>
    </div>
  );
};

export default AdminLayout;
