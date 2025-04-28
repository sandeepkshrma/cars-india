'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

function CarList() {
  const [cars, setCars] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    price: '',
    year: '',
  });

  
  const [sortOption, setSortOption] = useState("");

 
  const sortingOptions = [
    { label: "Default", value: "" },
    { label: "Price Low to High", value: "price_asc" },
    { label: "Price High to Low", value: "price_desc" },
    { label: "Year Low to High", value: "year_asc" },
    { label: "Year High to Low", value: "year_desc" },
  ];

  useEffect(() => {
    async function fetchCars() {
      const params = new URLSearchParams({
        ...filters,
        page: currentPage,
        sort: sortOption,
      });

      const res = await fetch(`/api/cars?${params}`);
      const data = await res.json();
      setCars(data.cars);
      setTotalPages(data.totalPages);
    }

    fetchCars();
  }, [filters, currentPage, sortOption]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setCurrentPage(1); 
  };

  return (
    <div className="p-8">
      <div className="appLogo flex items-center mb-8">
        <h1 className="appLogoName text-4xl font-bold">CarsIndia</h1>
      </div>

     
      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="lg:w-1/4 w-full">
          <div className="filterSection border rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Filters</h2>
            <div className="flex flex-col gap-4">
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

           
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Sort By</h3>
              <div className="overflow-x-auto">
                <div className="flex flex-wrap space-x-3 space-y-3 w-full">
                  {sortingOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`px-4 py-2 rounded-full border whitespace-nowrap transition-transform transform hover:scale-105 ${
                        sortOption === option.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="lg:w-3/4 w-full">
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Link
                href={`/cars/${car.id}`}
                key={car.id}
                className="carCard border rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg transition"
              >
                <img src={car.images[0]} alt={car.model} className="w-full h-56 object-cover rounded-lg mb-4" />
                <h2 className="text-xl font-bold">{car.make} {car.model}</h2>
                <p className="text-gray-500">{car.year}</p>
                <p className="carDetails text-green-600 font-semibold">${car.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>

          
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
      </div>
    </div>
  );
}

export default CarList;
