import Sidebar       from "../components/Sidebar";
import Topbar        from "../components/Topbar";
import LineChartCard from "../components/LineChartCard";
import BarChartCard  from "../components/BarChartCard";
import PieChartCard  from "../components/PieChartCard";
import DataTable     from "../components/DataTable";
import AiChatBox     from "../components/AiChatBox";
import { getSummaryStats } from "../data/salesDatabase";

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
    <div className={`p-5 rounded-2xl border ${ring} flex flex-col gap-1`}>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
        {label}
      </p>
      <p className={`text-2xl font-bold ${text}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

export default function AnalyticsPage() {
  const { totalRevenue, totalProfit, totalUnitsSold, totalTransactions } =
    getSummaryStats();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white px-8 py-5 border-b border-gray-100 shadow-sm">
          <Topbar title="Analytics" />
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-8">

          {/* Stat Cards Row */}
          <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
            <StatCard
              label="Total Revenue"
              value={fmt(totalRevenue)}
              sub="From 80 sampled transactions"
              color="green"
            />
            <StatCard
              label="Total Profit"
              value={fmt(totalProfit)}
              sub={`Margin ${((totalProfit / totalRevenue) * 100).toFixed(1)}%`}
              color="blue"
            />
            <StatCard
              label="Units Sold"
              value={fmt(totalUnitsSold)}
              sub="Across all categories"
              color="purple"
            />
            <StatCard
              label="Transactions"
              value={totalTransactions}
              sub="Sample size (stratified)"
              color="amber"
            />
          </div>

          {/* Line Chart — full width */}
          <LineChartCard />

          {/* Bar + Pie — side by side */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BarChartCard />
            <PieChartCard />
          </div>

          {/* Data Table + AI Chat — side by side */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <DataTable />
            </div>
            <div>
              <AiChatBox />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
