'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

function CarList() {
  const [cars, setCars] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    price: '',
    year: '',
  });

  useEffect(() => {
    async function fetchCars() {
      const params = new URLSearchParams({
        ...filters,
        page: currentPage
      });

      const res = await fetch(`/api/cars?${params}`);
      const data = await res.json();
      setCars(data.cars);
      setTotalPages(data.totalPages);
    }

    fetchCars();
  }, [filters, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 bg-">
      <div className="appLogo flex">
      <h1 className="appLogoName text-4xl font-bold mb-6">CarsIndia</h1>
      </div>

      {/* Filters */}
      <div className="filterBar mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="make"
            value={filters.make}
            onChange={handleFilterChange}
            placeholder="Make"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="model"
            value={filters.model}
            onChange={handleFilterChange}
            placeholder="Model"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
            placeholder="Min Price"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            placeholder="Year"
            className="p-2 border rounded"
          />
        </div>
      </div>

      {/* Car Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <Link href={`/cars/${car.id}`} key={car.id} className="carCard border rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg transition">
            <img src={car.images[0]} alt={car.model} className="w-full h-56 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold">{car.make} {car.model}</h2>
            <p className="text-gray-500">{car.year}</p>
            <p className="carDetails text-green-600 font-semibold">${car.price.toLocaleString()}</p>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md mr-4 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md ml-4 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CarList;
