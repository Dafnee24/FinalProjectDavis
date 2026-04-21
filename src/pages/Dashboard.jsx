import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import KpiCard from "../components/KpiCard";
import LineChartCard from "../components/LineChartCard";
import BarChartCard from "../components/BarChartCard";
import PieChartCard from "../components/PieChartCard";
import DataTable from "../components/DataTable";
import AiChatBox from "../components/AiChatBox";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#ecfdf5]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-white px-6 py-4 shadow-sm">
          <Topbar />
        </div>

        {/* Content */}
        <div className="p-8">
          {/* KPI GRID */}
          <div className="grid grid-cols-4 gap-6">
            <KpiCard title="Revenue" value="$12,500" />
            <KpiCard title="Orders" value="320" />
            <KpiCard title="Customers" value="150" />
            <KpiCard title="Growth" value="+12%" />
          </div>

          {/* LINE CHART */}
          <div className="mt-8">
            <LineChartCard />
          </div>

          {/* BAR + PIE */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <BarChartCard />
            <PieChartCard />
          </div>

          {/* TABLE */}
          <DataTable />

          {/* AI CHAT */}
          <AiChatBox />
        </div>
      </div>
    </div>
  );
}
