import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getBarChartData } from "../data/salesDatabase";

const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-md text-sm">
        <p className="font-semibold text-gray-700 mb-1">Region: {label}</p>
        <p className="text-green-600">
          Revenue: {new Intl.NumberFormat("id-ID").format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function BarChartCard({ data: externalData }) {
  const data = externalData || getBarChartData(); // [{ name, value }]

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-800">
          Revenue by Region
        </h3>
        <p className="text-sm text-gray-400 mt-0.5">
          Total revenue aggregated per region
        </p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f0fdf4" }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={56}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
