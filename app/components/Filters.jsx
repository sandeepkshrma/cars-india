'use client';

export default function Filters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <input
        type="text"
        placeholder="Make"
        className="border p-2 rounded-md"
        value={filters.make}
        onChange={(e) => setFilters(prev => ({ ...prev, make: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Model"
        className="border p-2 rounded-md"
        value={filters.model}
        onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
      />
      <input
        type="number"
        placeholder="Max Price"
        className="border p-2 rounded-md"
        value={filters.price}
        onChange={(e) => setFilters(prev => ({ ...prev, price: Number(e.target.value) }))}
      />
      <input
        type="number"
        placeholder="Year"
        className="border p-2 rounded-md"
        value={filters.year}
        onChange={(e) => setFilters(prev => ({ ...prev, year: Number(e.target.value) }))}
      />
    </div>
  );
}
