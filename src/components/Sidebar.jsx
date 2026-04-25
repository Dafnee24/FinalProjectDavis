import { LayoutDashboard, BarChart3, MessageSquare } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { path: "/",          label: "Dashboard", icon: LayoutDashboard },
  { path: "/analytics", label: "Analytics", icon: BarChart3       },
  { path: "/chat",      label: "AI Chat",   icon: MessageSquare   },
];

export default function Sidebar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const isActive  = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 px-5 py-8 min-h-screen flex flex-col">
      {/* Brand */}
      <div className="mb-10 px-2">
        <h1 className="text-xl font-bold text-green-600 tracking-tight">
          AI Dashboard
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">Sales Analytics Platform</p>
      </div>

      {/* Nav */}
      <nav className="flex-1">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-3">
          Menu
        </p>
        <ul className="space-y-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <button
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive(path)
                    ? "bg-green-50 text-green-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive(path) ? "text-green-600" : "text-gray-400"}
                />
                {label}
                {isActive(path) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-8 px-3 py-3 bg-green-50 rounded-xl">
        <p className="text-xs font-semibold text-green-700">Data Source</p>
        <p className="text-[11px] text-green-500 mt-0.5 leading-snug">
          large_sales_data.xlsx
          <br />
          80-row representative sample
        </p>
      </div>
    </aside>
  );
}
