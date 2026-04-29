import { DollarSign, ShoppingCart, Users, Activity } from "lucide-react";
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
              title="Revenue" 
              value="$12,500" 
              icon={DollarSign} 
              trend="+12.5%" 
              trendType="up" 
            />
            <KpiCard 
              title="Orders" 
              value="320" 
              icon={ShoppingCart} 
              trend="+5.2%" 
              trendType="up" 
            />
            <KpiCard 
              title="Customers" 
              value="1,240" 
              icon={Users} 
              trend="+8.1%" 
              trendType="up" 
            />
            <KpiCard 
              title="Growth" 
              value="+12%" 
              icon={Activity} 
              trend="-2.4%" 
              trendType="down" 
            />
          </div>


          {/* LINE CHART */}
          <div>
            <LineChartCard />
          </div>

          {/* BAR + PIE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChartCard />
            <PieChartCard />
          </div>

          {/* TABLE */}
          <DataTable />

        </div>
      </div>
    </div>
  );
}
