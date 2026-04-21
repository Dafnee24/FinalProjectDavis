import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { pieData } from "../data/chartData";

const COLORS = ["#16a34a", "#86efac", "#bbf7d0"];

export default function PieChartCard() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Product Distribution
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
