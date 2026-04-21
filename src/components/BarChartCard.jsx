import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import { barData } from "../data/chartData";

export default function BarChartCard() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Sales by Category
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
