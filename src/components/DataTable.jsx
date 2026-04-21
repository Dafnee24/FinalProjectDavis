import { tableData } from "../data/chartData";

export default function DataTable() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Sales Data</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-500 text-sm">
            <th className="py-2">Product</th>
            <th className="py-2">Category</th>
            <th className="py-2">Sales</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{item.product}</td>
              <td className="py-2">{item.category}</td>
              <td className="py-2">{item.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
