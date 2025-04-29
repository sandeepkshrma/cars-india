export async function GET(request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = 6;
  const startIndex = (page - 1) * limit;

  const make = url.searchParams.get("make");
  const model = url.searchParams.get("model");
  const price = parseInt(url.searchParams.get("price"));
  const year = parseInt(url.searchParams.get("year"));
  const sort = url.searchParams.get("sort");

  const cars = [
    {
      id: 1,
      make: "Ford",
      model: "Mustang",
      year: 2020,
      price: 38000,
      images: [
        "/car-images/ford1.jpg",
        "/car-images/ford2.jpg",
        "/car-images/ford3.jpg",
      ],
      mileage: 20000,
      transmission: "Manual",
      fuel: "Petrol",
      color: "Red",
      description: "Iconic muscle car with incredible horsepower and performance."
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2021,
      price: 23000,
      images: [
        "/car-images/civic.jpg",
        "/car-images/honda2.jpg",
        "/car-images/honda3.jpg",
      ],
      mileage: 12000,
      transmission: "Manual",
      fuel: "Diesel",
      color: "Black",
      description: "Low mileage, accident free, fully serviced."
    },
    {
      id: 3,
      make: "BMW",
      model: "3 Series",
      year: 2020,
      price: 35000,
      images: [
        "/car-images/bmw1.jpg",
        "/car-images/bmw2.jpg",
        "/car-images/bmw3.jpg",
      ],
      mileage: 25000,
      transmission: "Automatic",
      fuel: "Petrol",
      color: "Blue",
      description: "Luxury sedan with advanced features and great performance."
    },
    {
      id: 4,
      make: "Audi",
      model: "A4",
      year: 2019,
      price: 28000,
      images: [
        "/car-images/audi1.jpg",
        "/car-images/audi2.jpg",
        "/car-images/audi3.jpg",
      ],
      mileage: 30000,
      transmission: "Automatic",
      fuel: "Diesel",
      color: "Silver",
      description: "Great condition, premium features, perfect for long drives."
    },
    {
      id: 5,
      make: "Mercedes-Benz",
      model: "C-Class",
      year: 2021,
      price: 45000,
      images: [
        "/car-images/benz1.jpg",
        "/car-images/benz2.jpg",
        "/car-images/benz3.jpg",
      ],
      mileage: 10000,
      transmission: "Automatic",
      fuel: "Petrol",
      color: "Black",
      description: "High-end luxury sedan with exceptional comfort and style."
    },
    {
      id: 6,
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      price: 55000,
      images: [
        "/car-images/tesla1.jpg",
        "/car-images/tesla2.jpg",
        "/car-images/tesla3.jpg",
      ],
      mileage: 5000,
      transmission: "Automatic",
      fuel: "Electric",
      color: "White",
      description: "Electric vehicle with cutting-edge technology and impressive range."
    },
    {
      id: 7,
      make: "Toyota",
      model: "Corolla",
      year: 2022,
      price: 25000,
      images: [
        "/car-images/corolla.jpg",
        "/car-images/corolla2.jpg",
        "/car-images/corolla3.jpg",
      ],
      mileage: 15000,
      transmission: "Automatic",
      fuel: "Petrol",
      color: "White",
      description: "Well maintained, single owner, excellent condition."
    },
    {
      id: 8,
      make: "Chevrolet",
      model: "Camaro",
      year: 2022,
      price: 45000,
      images: [
        "/car-images/chevrolet1.jpg",
        "/car-images/chevrolet2.jpg",
        "/car-images/chevrolet3.jpg",
      ],
      mileage: 12000,
      transmission: "Automatic",
      fuel: "Petrol",
      color: "Yellow",
      description: "High-performance sports car, built for speed and thrills."
    },
    {
      id: 9,
      make: "Nissan",
      model: "Altima",
      year: 2021,
      price: 22000,
      images: [
        "/car-images/nissan1.jpg",
        "/car-images/nissan2.jpg",
        "/car-images/nissan3.jpg",
      ],
      mileage: 18000,
      transmission: "Automatic",
      fuel: "Petrol",
      color: "Gray",
      description: "Stylish sedan with great fuel efficiency and advanced features."
    },
    {
      id: 10,
      make: "Kia",
      model: "Sportage",
      year: 2022,
      price: 27000,
      images: [
        "/car-images/kia1.jpg",
        "/car-images/kia2.jpg",
        "/car-images/kia3.jpg",
      ],
      mileage: 15000,
      transmission: "Automatic",
      fuel: "Petrol",
      color: "Blue",
      description: "Compact SUV with spacious interior and modern technology."
    }
  ];

  // 🔵 Filter Logic
  let filteredCars = cars.filter(car => {
    return (
      (!make || car.make.toLowerCase().includes(make.toLowerCase())) &&
      (!model || car.model.toLowerCase().includes(model.toLowerCase())) &&
      (!price || car.price >= price) &&
      (!year || car.year == year)
    );
  });

  // 🟡 Sort Logic (new)
  if (sort) {
    if (sort === "price_asc") {
      filteredCars.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      filteredCars.sort((a, b) => b.price - a.price);
    } else if (sort === "year_asc") {
      filteredCars.sort((a, b) => a.year - b.year);
    } else if (sort === "year_desc") {
      filteredCars.sort((a, b) => b.year - a.year);
    }
  }



  // 🟢 Pagination
  const paginatedCars = filteredCars.slice(startIndex, startIndex + limit);
  const totalPages = Math.ceil(filteredCars.length / limit);
  console.log(paginatedCars);

  return new Response(
    JSON.stringify({ cars: paginatedCars, totalPages }),
    {
      status: 200,
      headers: corsHeaders(),
    }
  );
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}



