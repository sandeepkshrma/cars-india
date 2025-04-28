'use client';

import Image from "next/image";
import Link from "next/link";

export default function CarCard({ car }) {
  return (
    <Link href={`/cars/${car.id}`} className="border rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition">
      <Image src={car.image[0]} alt={car.model} width={300} height={200} className="rounded-lg" />
      <h2 className="text-xl font-bold mt-2">{car.make} {car.model}</h2>
      <p className="text-gray-500">{car.year}</p>
      <p className="text-green-600 font-semibold mt-1">${car.price.toLocaleString()}</p>
    </Link>
  );
}
