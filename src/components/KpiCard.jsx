import { TrendingUp, TrendingDown } from "lucide-react";

export default function KpiCard({ title, value, trend, icon: Icon, trendType = "up", color = "green" }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50 group-hover:bg-blue-600 glow-bg-blue-50",
    green: "text-green-600 bg-green-50 group-hover:bg-green-600 glow-bg-green-50",
    emerald: "text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 glow-bg-emerald-50",
    violet: "text-violet-600 bg-violet-50 group-hover:bg-violet-600 glow-bg-violet-50",
    amber: "text-amber-600 bg-amber-50 group-hover:bg-amber-600 glow-bg-amber-50",
    indigo: "text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 glow-bg-indigo-50",
  };

  const selectedColor = colorMap[color] || colorMap.green;
  const [textColor, iconBgColor, iconHoverBgColor] = selectedColor.split(" ");
  
  const cardStyles = {
    blue: "bg-blue-50/50 border-blue-100/50",
    green: "bg-green-50/50 border-green-100/50",
    emerald: "bg-emerald-50/50 border-emerald-100/50",
    violet: "bg-violet-50/50 border-violet-100/50",
    amber: "bg-amber-50/50 border-amber-100/50",
    indigo: "bg-indigo-50/50 border-indigo-100/50",
  }[color] || "bg-white border-gray-100";

  const glowColor = {
    blue: "bg-blue-200/30 group-hover:bg-blue-300/40",
    green: "bg-green-200/30 group-hover:bg-green-300/40",
    emerald: "bg-emerald-200/30 group-hover:bg-emerald-300/40",
    violet: "bg-violet-200/30 group-hover:bg-violet-300/40",
    amber: "bg-amber-200/30 group-hover:bg-amber-300/40",
    indigo: "bg-indigo-200/30 group-hover:bg-indigo-300/40",
  }[color] || "bg-green-50 group-hover:bg-green-100";

  return (
    <div className={`p-5 rounded-2xl shadow-sm border hover:shadow-md transition-all duration-300 relative overflow-hidden group ${cardStyles}`}>
      {/* Background Glow Effect */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-3xl transition-colors ${glowColor}`} />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-gray-500/80 text-xs font-semibold uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-gray-800 tabular-nums">{value}</h3>

          {trend && (
            <div className={`flex items-center gap-1.5 mt-2.5 text-xs font-medium ${trendType === "up" ? "text-green-600" : "text-red-500"}`}>
              <div className="flex items-center gap-1">
                {trendType === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{trend}</span>
              </div>
              <span className="text-gray-400 font-normal text-[10px] whitespace-nowrap">vs last month</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl group-hover:text-white transition-all duration-300 ${iconBgColor} ${textColor} ${iconHoverBgColor}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
