import { TrendingUp, TrendingDown } from "lucide-react";

export default function KpiCard({ title, value, trend, icon: Icon, trendType = "up" }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
      {/* Background Glow Effect */}
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-green-50 rounded-full blur-2xl group-hover:bg-green-100 transition-colors" />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-gray-800 tabular-nums">{value}</h3>

          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trendType === "up" ? "text-green-600" : "text-red-500"
              }`}>
              {trendType === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{trend}</span>
              <span className="text-gray-400 font-normal ml-1">vs last month</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

