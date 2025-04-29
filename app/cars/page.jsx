'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";

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
    <div className="bg-gray-50 min-h-screen flex flex-col">

      <nav className="appTheme shadow-md px-4 py-3 flex justify-between items-center relative">
        <div className="flex items-center space-x-2">
          <img className="w-12 h-12 rounded" src="/car-images/carlogo.svg" alt="carlogo" />
          <h1 className="text-xl font-bold text-sky-950">CarsIndia</h1>
        </div>

        {/* Hamburger menu (mobile only) */}
        <div className="lg:hidden">
          <button
            onClick={() => document.getElementById('mobileMenu').classList.toggle('hidden')}
            className="text-sky-900 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#services" className="hover:text-blue-600">Services</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
          <Link href="/login" className="hidden lg:flex items-center gap-2 hover:bg-gray-200 text-white px-1 py-1 rounded-full transition">
          <img
            src="/car-images/sandeep.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-sky-900"
          />
        </Link>
        </div>
        

        {/* Mobile menu dropdown */}
        <div id="mobileMenu" className="absolute top-full right-0 mt-2 w-full bg-white shadow-lg rounded-md p-4 space-y-3 text-gray-700 font-medium lg:hidden hidden z-50">
          <a href="#" className="block hover:text-blue-600">Home</a>
          <a href="#about" className="block hover:text-blue-600">About</a>
          <a href="#services" className="block hover:text-blue-600">Services</a>
          <a href="#contact" className="block hover:text-blue-600">Contact</a>
          <Link href="/login" className="flex items-center gap-2 mt-2 hover:text-blue-600">
            <img
              src="/car-images/sandeep.jpg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            Login
          </Link>
        </div>
      </nav>



      {/* Main Content */}
      <div className="application p-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filters and Sorting */}
          <div className="lg:w-1/4 w-full">
            <div className="filterSection border rounded-xl p-6 shadow-md bg-white">
              <h2 className="text-2xl font-semibold mb-4">Filters</h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="make"
                  value={filters.make}
                  onChange={handleFilterChange}
                  placeholder="Make"
                  className="bg-white p-2 border rounded"
                />
                <input
                  type="text"
                  name="model"
                  value={filters.model}
                  onChange={handleFilterChange}
                  placeholder="Model"
                  className="bg-white p-2 border rounded"
                />
                <input
                  type="number"
                  name="price"
                  value={filters.price}
                  onChange={handleFilterChange}
                  placeholder="Min Price"
                  className="bg-white p-2 border rounded"
                />
                <input
                  type="number"
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  placeholder="Year"
                  className="bg-white   p-2 border rounded"
                />
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Sort By</h3>
                <div className="overflow-x-auto">
                  <div className="flex flex-wrap gap-3">
                    {sortingOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`px-4 py-2 rounded-full border whitespace-nowrap transition-transform transform hover:scale-105 ${sortOption === option.value
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

          {/* Car Cards */}
          <div className="lg:w-3/4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <Link
                  href={{ pathname: `/cars/${car.id}`, query: { currentPage: `${currentPage}` } }}
                  key={car.id}
                  className="carCard bg-white border rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg transition"
                >
                  <img src={car.images[0]} alt={car.model} className="w-full h-56 object-cover rounded-t-2xl" />
                  <div className="p-4 text-center">
                    <h2 className="text-xl font-bold">{car.make} {car.model}</h2>
                    <p className="text-gray-500">{car.year}</p>
                    <p className="carDetails text-green-600 font-semibold">${car.price.toLocaleString()}</p>
                  </div>
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
        </div>
      </div>

      {/* Footer */}
      <footer className="appTheme text-center text-sm text-gray-600 py-6 border-t">
        <div className="mb-2">© 2025 CarsIndia. All rights reserved.</div>
        <div>Contact: contact@carsindia.com | +91-6376013232</div>
        <div>1234, Auto Street, Jaipur, India</div>
      </footer>
    </div>
  );
}

export default CarList;
