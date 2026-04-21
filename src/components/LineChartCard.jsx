import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import { lineData } from "../data/chartData";

export default function LineChartCard() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Revenue Trend
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={lineData}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#16a34a"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
