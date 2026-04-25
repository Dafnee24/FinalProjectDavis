import { getSummaryStats } from "../data/salesDatabase";

const fmt = (n) =>
  new Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

export default function Topbar({ title = "Dashboard Overview" }) {
  const { totalRevenue, totalProfit, totalTransactions } = getSummaryStats();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: Title + quick stats */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-xs text-gray-400">
            Revenue:{" "}
            <span className="text-green-600 font-semibold">{fmt(totalRevenue)}</span>
          </span>
          <span className="text-gray-200">|</span>
          <span className="text-xs text-gray-400">
            Profit:{" "}
            <span className="text-green-600 font-semibold">{fmt(totalProfit)}</span>
          </span>
          <span className="text-gray-200">|</span>
          <span className="text-xs text-gray-400">
            Transactions:{" "}
            <span className="text-green-600 font-semibold">{totalTransactions}</span>
          </span>
        </div>
      </div>

      {/* Right: Filters */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          className="border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <select className="border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-300">
          <option value="">All Categories</option>
          <option value="Automobile">Automobile</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Grocery">Grocery</option>
        </select>
      </div>
    </div>
  );
}
