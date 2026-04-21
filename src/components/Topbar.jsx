export default function Topbar() {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">
        Dashboard Overview
      </h2>

      <div className="flex gap-3">
        <input type="date" className="border px-3 py-2 rounded-lg text-sm" />

        <select className="border px-3 py-2 rounded-lg text-sm">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
        </select>
      </div>
    </div>
  );
}
