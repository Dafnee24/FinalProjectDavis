import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import LineChartCard from "../components/LineChartCard";
import BarChartCard from "../components/BarChartCard";
import PieChartCard from "../components/PieChartCard";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-[#ecfdf5]">
      <Sidebar />

      <div className="flex-1">
        <div className="bg-white px-6 py-4 shadow-sm">
          <Topbar />
        </div>

        <div className="p-8 space-y-8">
          <LineChartCard />

          <div className="grid grid-cols-2 gap-6">
            <BarChartCard />
            <PieChartCard />
          </div>
        </div>
      </div>
    </div>
  );
}
