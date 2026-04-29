import { useState, useMemo } from "react";
import Sidebar       from "../components/Sidebar";
import Topbar        from "../components/Topbar";
import LineChartCard from "../components/LineChartCard";
import BarChartCard  from "../components/BarChartCard";
import PieChartCard  from "../components/PieChartCard";
import DataTable     from "../components/DataTable";
import { 
  getSummaryStats, 
  getFilteredData, 
  getRevenueTrend, 
  getBarChartData, 
  getProductDistribution,
  salesData
} from "../data/salesDatabase";

// Format angka ke string ringkas (ex: 1.2M, 850K)
const fmt = (n) =>
  new Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

// Stat card kecil di bagian atas halaman
function StatCard({ label, value, sub, color = "green" }) {
  const ring = {
    green:  "border-green-100 bg-green-50",
    blue:   "border-blue-100  bg-blue-50",
    purple: "border-purple-100 bg-purple-50",
    amber:  "border-amber-100  bg-amber-50",
  }[color];
  const text = {
    green:  "text-green-700",
    blue:   "text-blue-700",
    purple: "text-purple-700",
    amber:  "text-amber-700",
  }[color];

  return (
    <div className={`p-5 rounded-2xl border ${ring} flex flex-col gap-1 transition-all hover:shadow-md`}>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
        {label}
      </p>
      <p className={`text-2xl font-bold ${text}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

export default function AnalyticsPage() {
  // Extract unique values for filters from data
  const availableFilters = useMemo(() => {
    const categories = ["All", ...new Set(salesData.map(d => d.Product_Category))];
    const regions = ["All", ...new Set(salesData.map(d => d.Region))];
    const years = ["All", ...new Set(salesData.map(d => d.Date.split("-")[0]))];
    const months = ["All", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    
    // Convert month codes to names for UI
    const monthNames = {
      "All": "All Months", "01": "January", "02": "February", "03": "March", "04": "April",
      "05": "May", "06": "June", "07": "July", "08": "August", "09": "September",
      "10": "October", "11": "November", "12": "December"
    };

    return { categories, regions, years, months, monthNames };
  }, []);

  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All");
  const [year, setYear] = useState("All");
  const [month, setMonth] = useState("All");

  // Custom filter logic based on specific data structure
  const filteredData = useMemo(() => {
    return salesData.filter(row => {
      const [rYear, rMonth] = row.Date.split("-");
      const matchCat = category === "All" || row.Product_Category === category;
      const matchReg = region === "All" || row.Region === region;
      const matchYear = year === "All" || rYear === year;
      const matchMonth = month === "All" || rMonth === month;
      return matchCat && matchReg && matchYear && matchMonth;
    });
  }, [category, region, year, month]);
  
  const stats = getSummaryStats(filteredData);
  const revenueTrendData = getRevenueTrend(filteredData);
  const regionData = getBarChartData(filteredData);
  const distributionData = getProductDistribution(filteredData);

  const resetFilters = () => {
    setCategory("All");
    setRegion("All");
    setYear("All");
    setMonth("All");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white px-8 py-5 border-b border-gray-100 shadow-sm sticky top-0 z-10">
          <Topbar title="Advanced Analytics" />
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-8">
          
          {/* Specific Filter Bar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Data Filters</h4>
              {(category !== "All" || region !== "All" || year !== "All" || month !== "All") && (
                <button 
                  onClick={resetFilters}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Product Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all cursor-pointer"
                >
                  {availableFilters.categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Region</label>
                <select 
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all cursor-pointer"
                >
                  {availableFilters.regions.map(reg => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Year</label>
                <select 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all cursor-pointer"
                >
                  {availableFilters.years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Month */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Month</label>
                <select 
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all cursor-pointer"
                >
                  {availableFilters.months.map(m => (
                    <option key={m} value={m}>{availableFilters.monthNames[m]}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stat Cards Row */}
          <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
            <StatCard
              label="Total Revenue"
              value={fmt(stats.totalRevenue)}
              sub={`${stats.totalTransactions} matching records`}
              color="green"
            />
            <StatCard
              label="Total Profit"
              value={fmt(stats.totalProfit)}
              sub={`Margin ${stats.totalRevenue > 0 ? ((stats.totalProfit / stats.totalRevenue) * 100).toFixed(1) : 0}%`}
              color="blue"
            />
            <StatCard
              label="Units Sold"
              value={fmt(stats.totalUnitsSold)}
              sub="Sales volume"
              color="purple"
            />
            <StatCard
              label="Transactions"
              value={stats.totalTransactions}
              sub="Sample count"
              color="amber"
            />
          </div>

          {/* Charts */}
          <div className="space-y-8">
            <LineChartCard data={revenueTrendData} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <BarChartCard data={regionData} />
              <PieChartCard data={distributionData} />
            </div>
          </div>

          {/* Data Table */}
          <DataTable />

        </main>
      </div>
    </div>
  );
}
