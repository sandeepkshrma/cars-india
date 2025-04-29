'use client';

import { useState, useEffect } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import Link from "next/link";


function SimpleCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return <p>No images available</p>;
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


export async function getCar(id, page) {
  const res = await fetch(`https://cars-india-theta.vercel.app/api/cars?page=${page}`);
  const data = await res.json();

  if (!Array.isArray(data.cars)) {
    return null;
  }


  return data.cars.find(car => car.id === parseInt(id));
}


function CarDetails({ car }) {
  if (!car) {
    return <p>Car details not found</p>;
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{car.make} {car.model}</h1>


      <div className="mb-6">
        <SimpleCarousel images={car.images} />
      </div>


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
      <div className="flex flex-row-reverse">
        <Link href="/">
          <button className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            ← Back to Home
          </button>
        </Link>
      </div>
    </main>
  );
}


export default function CarDetailsPage({ params }) {
  const [car, setCar] = useState(null);
  const [id, setId] = useState(null);
  const searchParams = useSearchParams();
  const page = searchParams.get("currentPage");


  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getId();
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const car = await getCar(id, page);
        if (car) {
          setCar(car);
        } else {
          notFound();
        }
      }
    };

    fetchData();
  }, [id]);

  if (!car) {
    return <div className="loader-wrapper">
      <div className="loader">
      </div>
    </div>
  }

  return <CarDetails car={car} />;
}
