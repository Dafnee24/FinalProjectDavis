import { LayoutDashboard, BarChart3, MessageSquare } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // cek halaman aktif
  const isActive = (path) => location.pathname === path;

  const menuClass = (path) =>
    `flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
      isActive(path)
        ? "bg-[#ecfdf5] text-green-600 font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 min-h-screen">
      {/* Title */}
      <h1 className="text-xl font-bold text-green-600 mb-8">AI Dashboard</h1>

      {/* Menu */}
      <ul className="space-y-3">
        {/* Dashboard */}
        <li className={menuClass("/")} onClick={() => navigate("/")}>
          <LayoutDashboard size={20} /> Dashboard
        </li>

        {/* Analytics */}
        <li
          className={menuClass("/analytics")}
          onClick={() => navigate("/analytics")}
        >
          <BarChart3 size={20} /> Analytics
        </li>

        {/* AI Chat */}
        <li className={menuClass("/chat")} onClick={() => navigate("/chat")}>
          <MessageSquare size={20} /> AI Chat
        </li>
      </ul>
    </div>
  );
}
