/* eslint-disable react-hooks/preserve-manual-memoization */
import { useState, useMemo } from "react";
import Sidebar       from "../components/Sidebar";
import Topbar        from "../components/Topbar";
import LineChartCard from "../components/LineChartCard";
import BarChartCard  from "../components/BarChartCard";
import PieChartCard  from "../components/PieChartCard";
import DataTable     from "../components/DataTable";
import { Filter, Calendar, Map, Tag, RotateCcw } from "lucide-react";
import { 
  getSummaryStats, 
  getRevenueTrend, 
  getBarChartData, 
  getProductDistribution,
  salesData
} from "../data/salesDatabase";

const fmt = (n) =>
  new Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n || 0);

function MiniStat({ label, value, color }) {
  const bg = {
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-700",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
    violet: "bg-violet-50 border-violet-100 text-violet-700",
    amber: "bg-amber-50 border-amber-100 text-amber-700",
  }[color];

  return (
    <div className={`p-4 rounded-xl border ${bg} flex flex-col`}>
      <span className="text-[10px] uppercase font-bold opacity-60 tracking-wider mb-1">{label}</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
}

export default function AnalyticsPage() {
  const availableFilters = useMemo(() => {
    const data = salesData || [];
    const categories = ["All", ...new Set(data.map(d => d.Product_Category))];
    const regions = ["All", ...new Set(data.map(d => d.Region))];
    const years = ["2025"]; // Hanya menyediakan opsi tahun 2025
    return { categories, regions, years };
  }, []);

  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All");
  const [year, setYear] = useState("2025"); // Inisialisasi default ke 2025

  const filteredData = useMemo(() => {
    const data = salesData || [];
    return data.filter(row => {
      const [rYear] = (row.Date || "2025-01-01").split("-");
      const matchCat = category === "All" || row.Product_Category === category;
      const matchReg = region === "All" || row.Region === region;
      const matchYear = rYear === year;
      return matchCat && matchReg && matchYear;
    });
  }, [category, region, year]);
  
  const stats = getSummaryStats(filteredData) || { totalRevenue: 0, totalProfit: 0, totalUnitsSold: 0, totalTransactions: 0 };
  const revenueTrendData = getRevenueTrend(filteredData) || [];
  const regionData = getBarChartData(filteredData) || [];
  const distributionData = getProductDistribution(filteredData) || [];

  const tableDataFormatted = useMemo(() => {
    return [...filteredData]
      .sort((a, b) => new Date(b.Date || "2024-01-01") - new Date(a.Date || "2024-01-01"))
      .map((item, index) => ({
        id: `${item.Date || 'no-date'}-${index}`,
        product: item.Salesperson, 
        category: item.Product_Category,
        sales: item.Revenue,
      }));
  }, [filteredData]);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white px-8 py-5 border-b border-gray-200">
          <Topbar title="Analysis Report" />
        </header>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#fcfcfd]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MiniStat label="Revenue" value={fmt(stats.totalRevenue)} color="indigo" />
              <MiniStat label="Profit" value={fmt(stats.totalProfit)} color="emerald" />
              <MiniStat label="Units" value={fmt(stats.totalUnitsSold)} color="violet" />
              <MiniStat label="Row Count" value={stats.totalTransactions} color="amber" />
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100">
                <LineChartCard data={revenueTrendData} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100">
                  <BarChartCard data={regionData} />
                </div>
                <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100">
                  <PieChartCard data={distributionData} />
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Detailed Logs</h3>
                <DataTable data={tableDataFormatted} />
              </div>
            </div>
          </main>

          <aside className="w-72 bg-white border-l border-gray-200 p-6 space-y-8 overflow-y-auto hidden lg:block">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <Filter size={18} />
              <h3 className="font-bold uppercase text-xs tracking-widest">Filters</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  <Tag size={12} /> Category
                </label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  {availableFilters.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  <Map size={12} /> Region
                </label>
                <select 
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  {availableFilters.regions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  <Calendar size={12} /> Year
                </label>
                <select 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  {availableFilters.years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <button 
                onClick={() => { setCategory("All"); setRegion("All"); setYear("2025"); }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-gray-400 border border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition-all"
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
