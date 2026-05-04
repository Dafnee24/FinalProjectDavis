/* eslint-disable react-hooks/preserve-manual-memoization */
import { useState, useMemo } from "react";
import Sidebar       from "../components/Sidebar";
import Topbar        from "../components/Topbar";
import LineChartCard from "../components/LineChartCard";
import BarChartCard  from "../components/BarChartCard";
import PieChartCard  from "../components/PieChartCard";
import DataTable     from "../components/DataTable";
import KpiCard       from "../components/KpiCard";
import CustomDropdown from "../components/CustomDropdown";
import { Filter, Calendar, Map, Tag, RotateCcw, ChevronDown, DollarSign, ShoppingCart, Users, Activity } from "lucide-react";
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard title="Revenue" value={fmt(stats.totalRevenue)} icon={DollarSign} trend="+12.5%" trendType="up" color="indigo" />
              <KpiCard title="Profit" value={fmt(stats.totalProfit)} icon={Activity} trend="+14.3%" trendType="up" color="emerald" />
              <KpiCard title="Units Sold" value={fmt(stats.totalUnitsSold)} icon={Users} trend="+8.1%" trendType="up" color="violet" />
              <KpiCard title="Transactions" value={stats.totalTransactions.toLocaleString("id-ID")} icon={ShoppingCart} trend="+5.2%" trendType="up" color="amber" />
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
              <CustomDropdown
                label="Category"
                icon={Tag}
                value={category}
                onChange={setCategory}
                options={availableFilters.categories}
              />

              <CustomDropdown
                label="Region"
                icon={Map}
                value={region}
                onChange={setRegion}
                options={availableFilters.regions}
              />

              <CustomDropdown
                label="Year"
                icon={Calendar}
                value={year}
                onChange={setYear}
                options={availableFilters.years}
              />

              <button 
                onClick={() => { setCategory("All"); setRegion("All"); setYear("2025"); }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-gray-400 border border-dashed border-gray-300 rounded-2xl hover:border-indigo-400 hover:text-indigo-600 transition-all"
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
