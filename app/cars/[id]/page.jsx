// /app/cars/[id]/page.jsx

'use client'; // Client-side component

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';

// Simple Carousel Component
function SimpleCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return <p>No images available</p>; // Return if no images are available
  }

  return (
    <div className="relative">
      <div className="w-full h-80 bg-gray-300 rounded-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Car Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4">
        <button
          onClick={prevImage}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
        >
          &lt;
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4">
        <button
          onClick={nextImage}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

// Fetch car details (Server Component)
export async function getCar(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/cars`);
  const data = await res.json();

  if (!Array.isArray(data.cars)) {
    return null;
  }

  // Find the car by its ID
  return data.cars.find(car => car.id === parseInt(id));
}

// CarDetails (Client Component)
function CarDetails({ car }) {
  if (!car) {
    return <p>Car details not found</p>; // Safe guard if car data is not available
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{car.make} {car.model}</h1>

      {/* Simple Image Carousel */}
      <div className="mb-6">
        <SimpleCarousel images={car.images} />
      </div>

      {/* Car Details */}
      <div className="grid grid-cols-2 gap-4 text-lg">
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Price:</strong> ${car.price.toLocaleString()}</p>
        <p><strong>Mileage:</strong> {car.mileage} km</p>
        <p><strong>Transmission:</strong> {car.transmission}</p>
        <p><strong>Fuel Type:</strong> {car.fuel}</p>
        <p><strong>Color:</strong> {car.color}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{car.description}</p>
      </div>
    </main>
  );
}

// Default export: Server-side component to fetch data and pass to CarDetails
export default function CarDetailsPage({ params }) {
  const [car, setCar] = useState(null);
  const [id, setId] = useState(null);

  // Using React.use() to unwrap params.id
  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params; // Unwrap params here
      setId(resolvedParams.id); // Set the id to state
    };
    getId();
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const car = await getCar(id); // Fetch car using id
        if (car) {
          setCar(car);
        } else {
          notFound(); // Handle case where car is not found
        }
      }
    };

    fetchData();
  }, [id]); // Use the id inside useEffect to fetch data

  if (!car) {
    return <p>Loading...</p>;
  }

  return <CarDetails car={car} />;
}
