import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SubCategoryData {
  [key: string]: {
    name: string;
    description: string;
    subcategories: {
      id: string;
      name: string;
      image: string;
      items: string;
      color: string;
      description: string;
    }[];
  };
}

const subCategoryData: SubCategoryData = {
  food: {
    name: "Food & Beverages",
    description: "Fresh groceries, packaged foods, and beverages",
    subcategories: [
      {
        id: "fresh-produce",
        name: "Fresh Produce",
        image: "🍎",
        items: "400+ items",
        color: "bg-green-50 border-green-200",
        description: "Fruits, vegetables, and fresh herbs",
      },
      {
        id: "dairy-eggs",
        name: "Dairy & Eggs",
        image: "🥛",
        items: "150+ items",
        color: "bg-blue-50 border-blue-200",
        description: "Milk, cheese, yogurt, and eggs",
      },
      {
        id: "bakery",
        name: "Bakery",
        image: "🍞",
        items: "200+ items",
        color: "bg-orange-50 border-orange-200",
        description: "Fresh bread, pastries, and baked goods",
      },
      {
        id: "meat-seafood",
        name: "Meat & Seafood",
        image: "🥩",
        items: "180+ items",
        color: "bg-red-50 border-red-200",
        description: "Fresh meat, poultry, and seafood",
      },
      {
        id: "frozen-foods",
        name: "Frozen Foods",
        image: "🧊",
        items: "300+ items",
        color: "bg-indigo-50 border-indigo-200",
        description: "Frozen vegetables, meals, and desserts",
      },
      {
        id: "beverages",
        name: "Beverages",
        image: "🥤",
        items: "250+ items",
        color: "bg-cyan-50 border-cyan-200",
        description: "Soft drinks, juices, tea, and coffee",
      },
      {
        id: "snacks",
        name: "Snacks & Sweets",
        image: "🍿",
        items: "320+ items",
        color: "bg-yellow-50 border-yellow-200",
        description: "Chips, chocolates, candies, and nuts",
      },
      {
        id: "pantry",
        name: "Pantry Staples",
        image: "🏺",
        items: "280+ items",
        color: "bg-amber-50 border-amber-200",
        description: "Rice, flour, oil, spices, and condiments",
      },
    ],
  },
  clothing: {
    name: "Clothing & Fashion",
    description: "Trendy clothes and fashion accessories for all",
    subcategories: [
      {
        id: "mens-wear",
        name: "Men's Clothing",
        image: "👔",
        items: "450+ items",
        color: "bg-blue-50 border-blue-200",
        description: "Shirts, pants, suits, and accessories",
      },
      {
        id: "womens-wear",
        name: "Women's Clothing",
        image: "👗",
        items: "600+ items",
        color: "bg-pink-50 border-pink-200",
        description: "Dresses, tops, ethnic wear, and more",
      },
      {
        id: "kids-wear",
        name: "Kids' Clothing",
        image: "👶",
        items: "300+ items",
        color: "bg-green-50 border-green-200",
        description: "Comfortable clothes for babies and kids",
      },
      {
        id: "footwear",
        name: "Footwear",
        image: "👟",
        items: "280+ items",
        color: "bg-gray-50 border-gray-200",
        description: "Shoes, sandals, and sports footwear",
      },
      {
        id: "accessories",
        name: "Accessories",
        image: "👜",
        items: "150+ items",
        color: "bg-purple-50 border-purple-200",
        description: "Bags, belts, watches, and jewelry",
      },
      {
        id: "innerwear",
        name: "Innerwear & Sleepwear",
        image: "🩲",
        items: "120+ items",
        color: "bg-indigo-50 border-indigo-200",
        description: "Comfortable innerwear and nightwear",
      },
    ],
  },
  electronics: {
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
    subcategories: [
      {
        id: "smartphones",
        name: "Smartphones",
        image: "📱",
        items: "150+ items",
        color: "bg-blue-50 border-blue-200",
        description: "Latest smartphones and accessories",
      },
      {
        id: "laptops",
        name: "Laptops & Computers",
        image: "💻",
        items: "120+ items",
        color: "bg-gray-50 border-gray-200",
        description: "Laptops, desktops, and peripherals",
      },
      {
        id: "audio",
        name: "Audio & Headphones",
        image: "🎧",
        items: "200+ items",
        color: "bg-green-50 border-green-200",
        description: "Headphones, speakers, and audio gear",
      },
      {
        id: "tv-entertainment",
        name: "TV & Entertainment",
        image: "📺",
        items: "180+ items",
        color: "bg-purple-50 border-purple-200",
        description: "Smart TVs, streaming devices, and more",
      },
      {
        id: "cameras",
        name: "Cameras",
        image: "📷",
        items: "80+ items",
        color: "bg-yellow-50 border-yellow-200",
        description: "Digital cameras and photography gear",
      },
      {
        id: "smart-home",
        name: "Smart Home",
        image: "🏠",
        items: "140+ items",
        color: "bg-orange-50 border-orange-200",
        description: "Smart devices and home automation",
      },
      {
        id: "gaming",
        name: "Gaming",
        image: "🎮",
        items: "160+ items",
        color: "bg-red-50 border-red-200",
        description: "Gaming consoles, games, and accessories",
      },
    ],
  },
  home: {
    name: "Home & Garden",
    description: "Everything for your home and garden needs",
    subcategories: [
      {
        id: "furniture",
        name: "Furniture",
        image: "🪑",
        items: "300+ items",
        color: "bg-brown-50 border-brown-200",
        description: "Sofas, tables, chairs, and storage",
      },
      {
        id: "kitchen",
        name: "Kitchen & Dining",
        image: "🍽️",
        items: "250+ items",
        color: "bg-red-50 border-red-200",
        description: "Cookware, appliances, and tableware",
      },
      {
        id: "bedroom",
        name: "Bedroom",
        image: "🛏️",
        items: "180+ items",
        color: "bg-blue-50 border-blue-200",
        description: "Bedding, mattresses, and bedroom decor",
      },
      {
        id: "bathroom",
        name: "Bathroom",
        image: "🚿",
        items: "120+ items",
        color: "bg-cyan-50 border-cyan-200",
        description: "Bath accessories and bathroom essentials",
      },
      {
        id: "garden",
        name: "Garden & Outdoor",
        image: "🌱",
        items: "100+ items",
        color: "bg-green-50 border-green-200",
        description: "Plants, gardening tools, and outdoor decor",
      },
    ],
  },
  sports: {
    name: "Sports & Gaming",
    description: "Sports equipment and gaming accessories",
    subcategories: [
      {
        id: "fitness",
        name: "Fitness Equipment",
        image: "🏋️",
        items: "200+ items",
        color: "bg-red-50 border-red-200",
        description: "Gym equipment and fitness accessories",
      },
      {
        id: "outdoor-sports",
        name: "Outdoor Sports",
        image: "⚽",
        items: "180+ items",
        color: "bg-green-50 border-green-200",
        description: "Football, cricket, tennis, and more",
      },
      {
        id: "gaming-console",
        name: "Gaming Consoles",
        image: "🎮",
        items: "120+ items",
        color: "bg-purple-50 border-purple-200",
        description: "PlayStation, Xbox, Nintendo, and games",
      },
      {
        id: "sports-wear",
        name: "Sports Wear",
        image: "👟",
        items: "150+ items",
        color: "bg-blue-50 border-blue-200",
        description: "Athletic clothing and sports shoes",
      },
    ],
  },
  automotive: {
    name: "Automotive",
    description: "Car accessories and automotive parts",
    subcategories: [
      {
        id: "car-accessories",
        name: "Car Accessories",
        image: "🚗",
        items: "200+ items",
        color: "bg-blue-50 border-blue-200",
        description: "Interior and exterior car accessories",
      },
      {
        id: "bike-accessories",
        name: "Bike Accessories",
        image: "🏍️",
        items: "150+ items",
        color: "bg-orange-50 border-orange-200",
        description: "Motorcycle parts and accessories",
      },
      {
        id: "car-care",
        name: "Car Care",
        image: "🧽",
        items: "70+ items",
        color: "bg-green-50 border-green-200",
        description: "Cleaning supplies and maintenance tools",
      },
    ],
  },
  health: {
    name: "Health & Beauty",
    description: "Personal care and health products",
    subcategories: [
      {
        id: "skincare",
        name: "Skincare",
        image: "🧴",
        items: "250+ items",
        color: "bg-pink-50 border-pink-200",
        description: "Face care, moisturizers, and treatments",
      },
      {
        id: "makeup",
        name: "Makeup",
        image: "💄",
        items: "200+ items",
        color: "bg-red-50 border-red-200",
        description: "Cosmetics and beauty tools",
      },
      {
        id: "personal-care",
        name: "Personal Care",
        image: "🪥",
        items: "180+ items",
        color: "bg-blue-50 border-blue-200",
        description: "Hygiene and personal care products",
      },
      {
        id: "health-wellness",
        name: "Health & Wellness",
        image: "💊",
        items: "170+ items",
        color: "bg-green-50 border-green-200",
        description: "Vitamins, supplements, and health products",
      },
    ],
  },
  books: {
    name: "Books & Media",
    description: "Books, movies, music, and educational content",
    subcategories: [
      {
        id: "books",
        name: "Books",
        image: "📖",
        items: "200+ items",
        color: "bg-yellow-50 border-yellow-200",
        description: "Fiction, non-fiction, and educational books",
      },
      {
        id: "movies",
        name: "Movies & TV Shows",
        image: "🎬",
        items: "100+ items",
        color: "bg-purple-50 border-purple-200",
        description: "DVDs, Blu-rays, and digital content",
      },
      {
        id: "music",
        name: "Music",
        image: "���",
        items: "50+ items",
        color: "bg-blue-50 border-blue-200",
        description: "CDs, vinyl records, and music accessories",
      },
    ],
  },
};

export default function SubCategory() {
  const { categoryId } = useParams();
  const categoryData = subCategoryData[categoryId || ""];

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Category not found
          </h2>
          <Button asChild>
            <Link to="/">Go back to home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-primary hover:text-primary/80">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold">{categoryData.name}</h1>
                <p className="text-sm text-gray-600">
                  {categoryData.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                📍 Ahmedabad
              </Badge>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Choose a Category
          </h2>
          <p className="text-gray-600">
            Browse through our wide selection of products
          </p>
        </div>

        {/* Sub-categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryData.subcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              to={`/category/${categoryId}/${subcategory.id}`}
              className="block"
            >
              <Card
                className={`hover:shadow-lg transition-all duration-200 cursor-pointer group hover:scale-105 ${subcategory.color}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{subcategory.image}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {subcategory.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {subcategory.description}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {subcategory.items}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
