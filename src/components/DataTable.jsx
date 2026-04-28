import { tableData } from "../data/chartData";
import { MoreHorizontal, ArrowUpRight } from "lucide-react";

export default function DataTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Recent Sales</h3>
          <p className="text-sm text-gray-400 mt-1">Overview of latest transactions</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Product</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Category</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-right">Sales</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-center">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {tableData.map((item) => (
              <tr key={item.id} className="group hover:bg-green-50/30 transition-colors cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                      <ArrowUpRight size={16} />
                    </div>
                    <span className="font-medium text-gray-700">{item.product}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="font-semibold text-gray-800 tabular-nums">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.sales)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide">
                    Success
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-gray-50/50 border-t border-gray-50 flex justify-center">
        <button className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
          View all transactions
        </button>
      </div>
    </div>
  );
}

