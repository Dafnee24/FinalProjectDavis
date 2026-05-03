import { useState, useMemo } from "react";
import { ArrowUpRight, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export default function DataTable({ data = [] }) {
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Sorting logic menggunakan props data
  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const displayedData = showAll ? sortedData : sortedData.slice(0, 5);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ChevronsUpDown size={14} className="text-gray-300" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={14} className="text-green-600" />
    ) : (
      <ChevronDown size={14} className="text-green-600" />
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Recent Sales</h3>
          <p className="text-sm text-gray-400 mt-1">Overview of latest transactions</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th 
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => requestSort("product")}
              >
                <div className="flex items-center gap-2">
                  Salesperson {getSortIcon("product")}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => requestSort("category")}
              >
                <div className="flex items-center gap-2">
                  Category {getSortIcon("category")}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-right cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => requestSort("sales")}
              >
                <div className="flex items-center justify-end gap-2">
                  Sales {getSortIcon("sales")}
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-center">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {displayedData.map((item) => (
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
        <button 
          onClick={() => setShowAll(!showAll)}
          className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
        >
          {showAll ? "View less" : "View all transactions"}
        </button>
      </div>
    </div>
  );
}
