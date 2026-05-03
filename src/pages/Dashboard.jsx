import { useMemo } from "react";
import { DollarSign, ShoppingCart, Users, Activity } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import KpiCard from "../components/KpiCard";
import LineChartCard from "../components/LineChartCard";
import BarChartCard from "../components/BarChartCard";
import PieChartCard from "../components/PieChartCard";
import DataTable from "../components/DataTable";

import { 
  salesData, 
  getSummaryStats, 
  getRevenueTrend, 
  getBarChartData, 
  getProductDistribution 
} from "../data/salesDatabase";

// Formatter untuk Rupiah seperti yang digunakan komponen lain
const formatCurrency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function Dashboard() {
  // 1. Ambil summary statistik untuk KPI
  const stats = useMemo(() => getSummaryStats(salesData), []);
  
  // 2. Ambil data agregasi untuk setiap Chart
  const revenueTrendData = useMemo(() => getRevenueTrend(salesData), []);
  const regionData = useMemo(() => getBarChartData(salesData), []);
  const distributionData = useMemo(() => getProductDistribution(salesData), []);

  // 3. Ubah format format dari `salesData` agar sesuai dengan yang diharapkan oleh DataTable
  const tableDataFormatted = useMemo(() => {
    return [...salesData]
      .sort((a, b) => new Date(b.Date) - new Date(a.Date)) // Urutkan terbaru
      .map((item, index) => ({
        id: index,
        product: item.Salesperson, // Karena data tidak punya 'Product Name', kita gunakan 'Salesperson' sebagai perwakilan kolom
        category: item.Product_Category,
        sales: item.Revenue,
      }));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <Topbar />
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* KPI GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard 
              title="Total Revenue" 
              value={formatCurrency(stats.totalRevenue)} 
              icon={DollarSign} 
              trend="+12.5%" 
              trendType="up" 
            />
            <KpiCard 
              title="Transactions" 
              value={stats.totalTransactions.toLocaleString("id-ID")} 
              icon={ShoppingCart} 
              trend="+5.2%" 
              trendType="up" 
            />
            <KpiCard 
              title="Units Sold" 
              value={stats.totalUnitsSold.toLocaleString("id-ID")} 
              icon={Users} 
              trend="+8.1%" 
              trendType="up" 
            />
            <KpiCard 
              title="Total Profit" 
              value={formatCurrency(stats.totalProfit)} 
              icon={Activity} 
              trend="+14.3%" 
              trendType="up" 
            />
          </div>

          {/* LINE CHART */}
          <div>
            <LineChartCard data={revenueTrendData} />
          </div>

          {/* BAR + PIE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChartCard data={regionData} />
            <PieChartCard data={distributionData} />
          </div>

          {/* TABLE */}
          <DataTable data={tableDataFormatted} />

        </div>
      </div>
    </div>
  );
}
