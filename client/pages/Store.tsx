import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Plus,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface StoreProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  availability: "in-stock" | "low-stock" | "out-of-stock";
}

interface StoreComparison {
  storeName: string;
  storeLocation: string;
  storeDistance: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  deliveryTime: string;
  availability: string;
}

interface StoreInfo {
  name: string;
  displayName: string;
  rating: number;
  deliveryTime: string;
  storeLocation: string;
  distance: string;
  type: string;
  discount: string;
  categories: string[];
}

const storeData: { [key: string]: StoreInfo } = {
  blinkit: {
    name: "blinkit",
    displayName: "Blinkit",
    rating: 4.9,
    deliveryTime: "8-12 mins",
    storeLocation: "Vastrapur, Ahmedabad",
    distance: "1.2 km",
    type: "Quick Commerce",
    discount: "15% off on first order",
    categories: ["food", "health"],
  },
  zepto: {
    name: "zepto",
    displayName: "Zepto",
    rating: 4.8,
    deliveryTime: "10-15 mins",
    storeLocation: "Satellite, Ahmedabad",
    distance: "2.1 km",
    type: "Quick Commerce",
    discount: "Free delivery",
    categories: ["food", "health"],
  },
  "reliance-fresh": {
    name: "reliance-fresh",
    displayName: "Reliance Fresh",
    rating: 4.7,
    deliveryTime: "20-25 mins",
    storeLocation: "CG Road, Ahmedabad",
    distance: "3.5 km",
    type: "Supermarket",
    discount: "Up to 20% off",
    categories: ["food", "home"],
  },
  dmart: {
    name: "dmart",
    displayName: "DMart",
    rating: 4.6,
    deliveryTime: "25-30 mins",
    storeLocation: "Bopal, Ahmedabad",
    distance: "4.2 km",
    type: "Hypermarket",
    discount: "Best prices",
    categories: ["food", "home", "clothing"],
  },
  croma: {
    name: "croma",
    displayName: "Croma",
    rating: 4.5,
    deliveryTime: "40-50 mins",
    storeLocation: "Himalaya Mall, Ahmedabad",
    distance: "6.1 km",
    type: "Electronics Store",
    discount: "Great deals on electronics",
    categories: ["electronics", "home"],
  },
};

// Price comparison data across stores
const productComparisons: { [key: string]: StoreComparison[] } = {
  "milk-1l": [
    {
      storeName: "DMart",
      storeLocation: "Bopal, Ahmedabad",
      storeDistance: "4.2 km",
      price: 58,
      rating: 4.6,
      deliveryTime: "25-30 mins",
      availability: "in-stock",
    },
    {
      storeName: "Zepto",
      storeLocation: "Satellite, Ahmedabad",
      storeDistance: "2.1 km",
      price: 59,
      rating: 4.8,
      deliveryTime: "10-15 mins",
      availability: "in-stock",
    },
    {
      storeName: "Blinkit",
      storeLocation: "Vastrapur, Ahmedabad",
      storeDistance: "1.2 km",
      price: 60,
      originalPrice: 63,
      discount: "5% off",
      rating: 4.9,
      deliveryTime: "8-12 mins",
      availability: "in-stock",
    },
    {
      storeName: "Reliance Fresh",
      storeLocation: "CG Road, Ahmedabad",
      storeDistance: "3.5 km",
      price: 62,
      originalPrice: 65,
      discount: "5% off",
      rating: 4.7,
      deliveryTime: "20-25 mins",
      availability: "in-stock",
    },
  ],
  bread: [
    {
      storeName: "Reliance Fresh",
      storeLocation: "CG Road, Ahmedabad",
      storeDistance: "3.5 km",
      price: 38,
      rating: 4.5,
      deliveryTime: "20-25 mins",
      availability: "in-stock",
    },
    {
      storeName: "DMart",
      storeLocation: "Bopal, Ahmedabad",
      storeDistance: "4.2 km",
      price: 40,
      rating: 4.4,
      deliveryTime: "25-30 mins",
      availability: "in-stock",
    },
    {
      storeName: "Blinkit",
      storeLocation: "Vastrapur, Ahmedabad",
      storeDistance: "1.2 km",
      price: 42,
      rating: 4.7,
      deliveryTime: "8-12 mins",
      availability: "in-stock",
    },
  ],
  "samsung-galaxy-phone": [
    {
      storeName: "Croma",
      storeLocation: "Himalaya Mall, Ahmedabad",
      storeDistance: "6.1 km",
      price: 15499,
      originalPrice: 17999,
      discount: "14% off",
      rating: 4.5,
      deliveryTime: "40-50 mins",
      availability: "in-stock",
    },
    {
      storeName: "Blinkit",
      storeLocation: "Vastrapur, Ahmedabad",
      storeDistance: "1.2 km",
      price: 15999,
      originalPrice: 17999,
      discount: "11% off",
      rating: 4.6,
      deliveryTime: "8-12 mins",
      availability: "in-stock",
    },
  ],
  "red-apples": [
    {
      storeName: "DMart",
      storeLocation: "Bopal, Ahmedabad",
      storeDistance: "4.2 km",
      price: 165,
      rating: 4.5,
      deliveryTime: "25-30 mins",
      availability: "in-stock",
    },
    {
      storeName: "Zepto",
      storeLocation: "Satellite, Ahmedabad",
      storeDistance: "2.1 km",
      price: 168,
      rating: 4.9,
      deliveryTime: "10-15 mins",
      availability: "in-stock",
    },
    {
      storeName: "Blinkit",
      storeLocation: "Vastrapur, Ahmedabad",
      storeDistance: "1.2 km",
      price: 170,
      originalPrice: 185,
      discount: "8% off",
      rating: 4.9,
      deliveryTime: "8-12 mins",
      availability: "in-stock",
    },
    {
      storeName: "Reliance Fresh",
      storeLocation: "CG Road, Ahmedabad",
      storeDistance: "3.5 km",
      price: 180,
      originalPrice: 200,
      discount: "10% off",
      rating: 4.6,
      deliveryTime: "20-25 mins",
      availability: "in-stock",
    },
  ],
  "wireless-headphones": [
    {
      storeName: "Croma",
      storeLocation: "Himalaya Mall, Ahmedabad",
      storeDistance: "6.1 km",
      price: 2299,
      originalPrice: 2799,
      discount: "18% off",
      rating: 4.6,
      deliveryTime: "40-50 mins",
      availability: "in-stock",
    },
    {
      storeName: "Blinkit",
      storeLocation: "Vastrapur, Ahmedabad",
      storeDistance: "1.2 km",
      price: 2499,
      originalPrice: 2999,
      discount: "17% off",
      rating: 4.5,
      deliveryTime: "8-12 mins",
      availability: "in-stock",
    },
  ],
  "cotton-bedsheet": [
    {
      storeName: "Blinkit",
      storeLocation: "Vastrapur, Ahmedabad",
      storeDistance: "1.2 km",
      price: 1299,
      originalPrice: 1599,
      discount: "19% off",
      rating: 4.5,
      deliveryTime: "8-12 mins",
      availability: "in-stock",
    },
    {
      storeName: "Zepto",
      storeLocation: "Satellite, Ahmedabad",
      storeDistance: "2.1 km",
      price: 1299,
      originalPrice: 1599,
      discount: "19% off",
      rating: 4.5,
      deliveryTime: "10-15 mins",
      availability: "in-stock",
    },
    {
      storeName: "Reliance Fresh",
      storeLocation: "CG Road, Ahmedabad",
      storeDistance: "3.5 km",
      price: 1399,
      originalPrice: 1699,
      discount: "18% off",
      rating: 4.4,
      deliveryTime: "20-25 mins",
      availability: "in-stock",
    },
  ],
};

const storeProducts: { [key: string]: StoreProduct[] } = {
  blinkit: [
    // Essentials
    {
      id: "milk-1l-blinkit",
      name: "Fresh Milk 1L",
      image: "🥛",
      category: "essentials",
      price: 60,
      originalPrice: 63,
      discount: "5% off",
      rating: 4.9,
      reviews: 850,
      availability: "in-stock",
    },
    {
      id: "bread-blinkit",
      name: "Brown Bread 400g",
      image: "🍞",
      category: "essentials",
      price: 42,
      rating: 4.7,
      reviews: 320,
      availability: "in-stock",
    },
    {
      id: "bananas-blinkit",
      name: "Fresh Bananas 1kg",
      image: "🍌",
      category: "essentials",
      price: 55,
      originalPrice: 60,
      discount: "8% off",
      rating: 4.8,
      reviews: 640,
      availability: "in-stock",
    },
    {
      id: "rice-blinkit",
      name: "Basmati Rice 5kg",
      image: "🍚",
      category: "essentials",
      price: 450,
      rating: 4.6,
      reviews: 280,
      availability: "in-stock",
    },
    // Electronics
    {
      id: "smartphone-blinkit",
      name: "Samsung Galaxy Phone",
      image: "📱",
      category: "electronics",
      price: 15999,
      originalPrice: 17999,
      discount: "11% off",
      rating: 4.6,
      reviews: 1240,
      availability: "in-stock",
    },
    {
      id: "headphones-blinkit",
      name: "Wireless Headphones",
      image: "🎧",
      category: "electronics",
      price: 2499,
      originalPrice: 2999,
      discount: "17% off",
      rating: 4.5,
      reviews: 890,
      availability: "in-stock",
    },
    {
      id: "powerbank-blinkit",
      name: "Power Bank 10000mAh",
      image: "🔋",
      category: "electronics",
      price: 899,
      originalPrice: 1199,
      discount: "25% off",
      rating: 4.4,
      reviews: 560,
      availability: "in-stock",
    },
    // Home & Lifestyle
    {
      id: "bedsheet-blinkit",
      name: "Cotton Bedsheet Set",
      image: "🛏️",
      category: "home-lifestyle",
      price: 1299,
      originalPrice: 1599,
      discount: "19% off",
      rating: 4.5,
      reviews: 340,
      availability: "in-stock",
    },
    {
      id: "curtains-blinkit",
      name: "Designer Curtains",
      image: "🪟",
      category: "home-lifestyle",
      price: 899,
      rating: 4.3,
      reviews: 220,
      availability: "in-stock",
    },
    {
      id: "pillow-blinkit",
      name: "Memory Foam Pillow",
      image: "🛏️",
      category: "home-lifestyle",
      price: 799,
      originalPrice: 999,
      discount: "20% off",
      rating: 4.6,
      reviews: 180,
      availability: "in-stock",
    },
    // Automobile
    {
      id: "car-freshener-blinkit",
      name: "Car Air Freshener",
      image: "🚗",
      category: "automobile",
      price: 149,
      rating: 4.2,
      reviews: 95,
      availability: "in-stock",
    },
    {
      id: "phone-holder-blinkit",
      name: "Car Phone Holder",
      image: "���",
      category: "automobile",
      price: 299,
      originalPrice: 399,
      discount: "25% off",
      rating: 4.4,
      reviews: 150,
      availability: "in-stock",
    },
    // Hospitality
    {
      id: "coffee-blinkit",
      name: "Premium Coffee Beans",
      image: "☕",
      category: "hospitality",
      price: 599,
      rating: 4.7,
      reviews: 240,
      availability: "in-stock",
    },
    {
      id: "tea-blinkit",
      name: "Assam Tea Leaves",
      image: "🍵",
      category: "hospitality",
      price: 299,
      originalPrice: 349,
      discount: "14% off",
      rating: 4.5,
      reviews: 320,
      availability: "in-stock",
    },
    // Fitness & Sports
    {
      id: "protein-blinkit",
      name: "Whey Protein 1kg",
      image: "💪",
      category: "fitness-sports",
      price: 1899,
      originalPrice: 2299,
      discount: "17% off",
      rating: 4.6,
      reviews: 420,
      availability: "in-stock",
    },
    {
      id: "yoga-mat-blinkit",
      name: "Premium Yoga Mat",
      image: "🧘",
      category: "fitness-sports",
      price: 699,
      rating: 4.4,
      reviews: 180,
      availability: "in-stock",
    },
    // More Essentials
    {
      id: "chicken-blinkit",
      name: "Fresh Chicken 1kg",
      image: "🍗",
      category: "essentials",
      price: 280,
      rating: 4.6,
      reviews: 450,
      availability: "in-stock",
    },
    {
      id: "potatoes-blinkit",
      name: "Fresh Potatoes 2kg",
      image: "🥔",
      category: "essentials",
      price: 48,
      rating: 4.3,
      reviews: 230,
      availability: "in-stock",
    },
    // More Electronics
    {
      id: "smartwatch-blinkit",
      name: "Fitness Smartwatch",
      image: "⌚",
      category: "electronics",
      price: 3999,
      originalPrice: 5999,
      discount: "33% off",
      rating: 4.3,
      reviews: 180,
      availability: "in-stock",
    },
    // More Home & Lifestyle
    {
      id: "table-blinkit",
      name: "Wooden Dining Table",
      image: "🪑",
      category: "home-lifestyle",
      price: 8999,
      originalPrice: 12999,
      discount: "31% off",
      rating: 4.5,
      reviews: 85,
      availability: "in-stock",
    },
    // More Automobile
    {
      id: "polish-blinkit",
      name: "Car Polish Spray",
      image: "✨",
      category: "automobile",
      price: 249,
      rating: 4.2,
      reviews: 78,
      availability: "in-stock",
    },
    // More Hospitality
    {
      id: "juice-blinkit",
      name: "Fresh Orange Juice 1L",
      image: "🧃",
      category: "hospitality",
      price: 120,
      rating: 4.6,
      reviews: 210,
      availability: "in-stock",
    },
    // More Fitness & Sports
    {
      id: "dumbbells-blinkit",
      name: "Adjustable Dumbbells 5kg",
      image: "🏋️",
      category: "fitness-sports",
      price: 1299,
      originalPrice: 1599,
      discount: "19% off",
      rating: 4.5,
      reviews: 120,
      availability: "in-stock",
    },
  ],
  zepto: [
    // Essentials
    {
      id: "milk-1l-zepto",
      name: "Fresh Milk 1L",
      image: "🥛",
      category: "essentials",
      price: 59,
      rating: 4.8,
      reviews: 920,
      availability: "in-stock",
    },
    {
      id: "apples-zepto",
      name: "Red Apples 1kg",
      image: "🍎",
      category: "essentials",
      price: 168,
      rating: 4.9,
      reviews: 540,
      availability: "in-stock",
    },
    {
      id: "eggs-zepto",
      name: "Farm Fresh Eggs (12 pcs)",
      image: "🥚",
      category: "essentials",
      price: 84,
      rating: 4.7,
      reviews: 380,
      availability: "in-stock",
    },
    {
      id: "oil-zepto",
      name: "Sunflower Oil 1L",
      image: "🫒",
      category: "essentials",
      price: 125,
      originalPrice: 140,
      discount: "11% off",
      rating: 4.5,
      reviews: 210,
      availability: "in-stock",
    },
    // Electronics
    {
      id: "earbuds-zepto",
      name: "True Wireless Earbuds",
      image: "🎧",
      category: "electronics",
      price: 1799,
      originalPrice: 2299,
      discount: "22% off",
      rating: 4.4,
      reviews: 650,
      availability: "in-stock",
    },
    {
      id: "charger-zepto",
      name: "Fast Charging Cable",
      image: "🔌",
      category: "electronics",
      price: 399,
      rating: 4.3,
      reviews: 290,
      availability: "in-stock",
    },
    // Home & Lifestyle
    {
      id: "bedsheet-zepto",
      name: "Cotton Bedsheet Set",
      image: "🛏️",
      category: "home-lifestyle",
      price: 1299,
      originalPrice: 1599,
      discount: "19% off",
      rating: 4.5,
      reviews: 280,
      availability: "in-stock",
    },
    {
      id: "towel-zepto",
      name: "Bath Towel Set",
      image: "🛁",
      category: "home-lifestyle",
      price: 799,
      rating: 4.4,
      reviews: 160,
      availability: "in-stock",
    },
    // Automobile
    {
      id: "wiper-zepto",
      name: "Car Windshield Wiper",
      image: "🚗",
      category: "automobile",
      price: 599,
      rating: 4.3,
      reviews: 85,
      availability: "in-stock",
    },
    // Hospitality
    {
      id: "snacks-zepto",
      name: "Mixed Nuts 250g",
      image: "🥜",
      category: "hospitality",
      price: 299,
      rating: 4.6,
      reviews: 190,
      availability: "in-stock",
    },
    // Fitness & Sports
    {
      id: "resistance-zepto",
      name: "Resistance Bands Set",
      image: "🏋️",
      category: "fitness-sports",
      price: 499,
      originalPrice: 699,
      discount: "29% off",
      rating: 4.5,
      reviews: 130,
      availability: "in-stock",
    },
  ],
  "reliance-fresh": [
    // Essentials
    {
      id: "milk-1l-reliance",
      name: "Fresh Milk 1L",
      image: "🥛",
      category: "essentials",
      price: 62,
      originalPrice: 65,
      discount: "5% off",
      rating: 4.7,
      reviews: 1240,
      availability: "in-stock",
    },
    {
      id: "bread-reliance",
      name: "Whole Wheat Bread",
      image: "🍞",
      category: "essentials",
      price: 38,
      rating: 4.5,
      reviews: 890,
      availability: "in-stock",
    },
    {
      id: "dal-reliance",
      name: "Toor Dal 1kg",
      image: "🫘",
      category: "essentials",
      price: 120,
      rating: 4.6,
      reviews: 340,
      availability: "in-stock",
    },
    // Electronics
    {
      id: "speaker-reliance",
      name: "Bluetooth Speaker",
      image: "🔊",
      category: "electronics",
      price: 1299,
      originalPrice: 1599,
      discount: "19% off",
      rating: 4.4,
      reviews: 520,
      availability: "in-stock",
    },
    {
      id: "laptop-reliance",
      name: "Basic Laptop",
      image: "💻",
      category: "electronics",
      price: 25999,
      originalPrice: 29999,
      discount: "13% off",
      rating: 4.2,
      reviews: 180,
      availability: "in-stock",
    },
    // Home & Lifestyle
    {
      id: "lamp-reliance",
      name: "LED Table Lamp",
      image: "💡",
      category: "home-lifestyle",
      price: 599,
      rating: 4.3,
      reviews: 180,
      availability: "in-stock",
    },
    {
      id: "mirror-reliance",
      name: "Decorative Wall Mirror",
      image: "🪞",
      category: "home-lifestyle",
      price: 899,
      originalPrice: 1199,
      discount: "25% off",
      rating: 4.5,
      reviews: 95,
      availability: "in-stock",
    },
    // Automobile
    {
      id: "cleaner-reliance",
      name: "Car Dashboard Cleaner",
      image: "🧽",
      category: "automobile",
      price: 199,
      rating: 4.2,
      reviews: 120,
      availability: "in-stock",
    },
    // Hospitality
    {
      id: "biscuits-reliance",
      name: "Premium Biscuits Pack",
      image: "🍪",
      category: "hospitality",
      price: 149,
      rating: 4.4,
      reviews: 250,
      availability: "in-stock",
    },
    // Fitness & Sports
    {
      id: "dumbbells-reliance",
      name: "Adjustable Dumbbells 5kg",
      image: "🏋️",
      category: "fitness-sports",
      price: 1299,
      rating: 4.6,
      reviews: 190,
      availability: "in-stock",
    },
  ],
  dmart: [
    // Essentials
    {
      id: "milk-1l-dmart",
      name: "Fresh Milk 1L",
      image: "🥛",
      category: "essentials",
      price: 58,
      rating: 4.6,
      reviews: 890,
      availability: "in-stock",
    },
    {
      id: "sugar-dmart",
      name: "Sugar 1kg",
      image: "🧂",
      category: "essentials",
      price: 42,
      rating: 4.5,
      reviews: 420,
      availability: "in-stock",
    },
    {
      id: "onions-dmart",
      name: "Fresh Onions 2kg",
      image: "🧅",
      category: "essentials",
      price: 60,
      rating: 4.4,
      reviews: 280,
      availability: "in-stock",
    },
    // Electronics
    {
      id: "calculator-dmart",
      name: "Scientific Calculator",
      image: "🧮",
      category: "electronics",
      price: 299,
      originalPrice: 399,
      discount: "25% off",
      rating: 4.3,
      reviews: 150,
      availability: "in-stock",
    },
    {
      id: "tablet-dmart",
      name: "Android Tablet",
      image: "📱",
      category: "electronics",
      price: 8999,
      originalPrice: 12999,
      discount: "31% off",
      rating: 4.1,
      reviews: 95,
      availability: "in-stock",
    },
    // Home & Lifestyle
    {
      id: "bucket-dmart",
      name: "Plastic Storage Bucket",
      image: "🪣",
      category: "home-lifestyle",
      price: 199,
      rating: 4.2,
      reviews: 320,
      availability: "in-stock",
    },
    {
      id: "hangers-dmart",
      name: "Clothes Hangers Set",
      image: "👔",
      category: "home-lifestyle",
      price: 149,
      rating: 4.4,
      reviews: 180,
      availability: "in-stock",
    },
    // Automobile
    {
      id: "polish-dmart",
      name: "Car Polish Spray",
      image: "✨",
      category: "automobile",
      price: 249,
      rating: 4.3,
      reviews: 95,
      availability: "in-stock",
    },
    // Hospitality
    {
      id: "chips-dmart",
      name: "Potato Chips Family Pack",
      image: "🍟",
      category: "hospitality",
      price: 99,
      rating: 4.5,
      reviews: 380,
      availability: "in-stock",
    },
    // Fitness & Sports
    {
      id: "skipping-dmart",
      name: "Skipping Rope",
      image: "🪢",
      category: "fitness-sports",
      price: 199,
      originalPrice: 299,
      discount: "33% off",
      rating: 4.4,
      reviews: 140,
      availability: "in-stock",
    },
  ],
  croma: [
    // Electronics (primary category for Croma)
    {
      id: "smartphone-croma",
      name: "iPhone 15",
      image: "📱",
      category: "electronics",
      price: 79999,
      originalPrice: 84999,
      discount: "6% off",
      rating: 4.8,
      reviews: 520,
      availability: "in-stock",
    },
    {
      id: "laptop-croma",
      name: "Gaming Laptop",
      image: "💻",
      category: "electronics",
      price: 65999,
      originalPrice: 75999,
      discount: "13% off",
      rating: 4.7,
      reviews: 180,
      availability: "in-stock",
    },
    {
      id: "tv-croma",
      name: "55 inch Smart TV",
      image: "📺",
      category: "electronics",
      price: 35999,
      originalPrice: 42999,
      discount: "16% off",
      rating: 4.6,
      reviews: 340,
      availability: "in-stock",
    },
    {
      id: "camera-croma",
      name: "DSLR Camera",
      image: "📷",
      category: "electronics",
      price: 45999,
      rating: 4.5,
      reviews: 95,
      availability: "in-stock",
    },
    // Home & Lifestyle
    {
      id: "ac-croma",
      name: "Split AC 1.5 Ton",
      image: "❄️",
      category: "home-lifestyle",
      price: 28999,
      originalPrice: 35999,
      discount: "19% off",
      rating: 4.4,
      reviews: 280,
      availability: "in-stock",
    },
    {
      id: "fridge-croma",
      name: "Double Door Refrigerator",
      image: "🧊",
      category: "home-lifestyle",
      price: 24999,
      rating: 4.3,
      reviews: 150,
      availability: "in-stock",
    },
    // Automobile
    {
      id: "dashcam-croma",
      name: "Car Dashboard Camera",
      image: "📹",
      category: "automobile",
      price: 3999,
      originalPrice: 4999,
      discount: "20% off",
      rating: 4.2,
      reviews: 85,
      availability: "in-stock",
    },
    // Fitness & Sports
    {
      id: "smartwatch-croma",
      name: "Fitness Smartwatch",
      image: "⌚",
      category: "fitness-sports",
      price: 12999,
      originalPrice: 15999,
      discount: "19% off",
      rating: 4.5,
      reviews: 240,
      availability: "in-stock",
    },
  ],
};

export default function Store() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("essentials");
  const [expandedPrices, setExpandedPrices] = useState<Set<string>>(new Set());

  const store = storeData[storeId || ""];
  const products = storeProducts[storeId || ""] || [];

  // Helper function to get product comparison key
  const getProductKey = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes("milk")) return "milk-1l";
    if (name.includes("bread")) return "bread";
    if (name.includes("samsung") && name.includes("galaxy"))
      return "samsung-galaxy-phone";
    if (name.includes("apple") && name.includes("red")) return "red-apples";
    if (name.includes("apples")) return "red-apples";
    if (name.includes("headphones") || name.includes("earbuds"))
      return "wireless-headphones";
    if (name.includes("bedsheet")) return "cotton-bedsheet";
    return name.replace(/\s+/g, "-");
  };

  const togglePriceComparison = (productId: string) => {
    const newExpanded = new Set(expandedPrices);
    if (expandedPrices.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedPrices(newExpanded);
  };

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Store not found
            </h2>
            <Button asChild>
              <Link to="/">Go back to home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const addToCart = (product: StoreProduct) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Create cart item
    const cartItem = {
      id: `${product.id}-${store.name}`,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      storeName: store.displayName,
      storeLocation: store.storeLocation,
      storeDistance: store.distance,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      rating: product.rating,
      deliveryTime: store.deliveryTime,
      quantity: 1,
      addedAt: new Date().toISOString(),
    };

    // Add to cart
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Navigate to cart
    navigate(`/cart?from=store&storeId=${storeId}`);
  };

  const allCategories = [
    { id: "essentials", name: "Essentials" },
    { id: "home-lifestyle", name: "Home & Lifestyle" },
    { id: "electronics", name: "Electronics" },
    { id: "automobile", name: "Automobile" },
    { id: "hospitality", name: "Hospitality" },
    { id: "fitness-sports", name: "Fitness & Sports" },
  ];

  const categories = allCategories;

  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory,
  );

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
                <h1 className="text-xl font-semibold">{store.displayName}</h1>
                <p className="text-sm text-gray-600">{store.type}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Store Info */}
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {store.storeLocation}
                  </p>
                  <p className="text-sm text-gray-600">{store.distance} away</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {store.deliveryTime}
                  </p>
                  <p className="text-sm text-gray-600">Delivery time</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <div>
                  <p className="font-semibold text-gray-900">{store.rating}</p>
                  <p className="text-sm text-gray-600">Store rating</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Badge className="bg-green-100 text-green-800">
                {store.discount}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Category Carousel */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Browse by Category
          </h3>
          <div className="flex space-x-4 overflow-x-auto pb-4 mb-4">
            {[
              {
                id: "essentials",
                name: "Essentials",
                icon: "🛒",
                color: "bg-blue-50 text-blue-600",
              },
              {
                id: "home-lifestyle",
                name: "Home & Lifestyle",
                icon: "🏠",
                color: "bg-green-50 text-green-600",
              },
              {
                id: "electronics",
                name: "Electronics",
                icon: "📱",
                color: "bg-purple-50 text-purple-600",
              },
              {
                id: "automobile",
                name: "Automobile",
                icon: "🚗",
                color: "bg-gray-50 text-gray-600",
              },
              {
                id: "hospitality",
                name: "Hospitality",
                icon: "🏨",
                color: "bg-orange-50 text-orange-600",
              },
              {
                id: "fitness-sports",
                name: "Fitness & Sports",
                icon: "🏋️",
                color: "bg-red-50 text-red-600",
              },
            ].map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 w-32 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform border ${
                  selectedCategory === category.id
                    ? "border-primary bg-primary/10"
                    : category.color
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <p className="text-xs font-medium">{category.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {allCategories.find((cat) => cat.id === selectedCategory)?.name ||
                "Products"}
            </h3>
            <p className="text-sm text-gray-600">
              {filteredProducts.length} items available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const productKey = getProductKey(product.name);
              const comparisons = productComparisons[productKey] || [];
              const sortedComparisons = comparisons
                .sort((a, b) => a.price - b.price)
                .filter((comp) => comp.storeName !== store.displayName);
              const bestPrice =
                sortedComparisons.length > 0 ? sortedComparisons[0] : null;
              const currentIsLowest =
                !bestPrice || product.price <= bestPrice.price;

              return (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{product.image}</div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {product.name}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.originalPrice}
                              </span>
                              {product.discount && (
                                <Badge variant="secondary" className="text-xs">
                                  {product.discount}
                                </Badge>
                              )}
                            </>
                          )}
                        </div>
                        {currentIsLowest && comparisons.length > 1 && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Best Price
                          </Badge>
                        )}
                      </div>

                      {/* Price comparison preview */}
                      {bestPrice && !currentIsLowest && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-orange-700">
                              Lower price available:
                            </span>
                            <span className="font-semibold text-orange-800">
                              ₹{bestPrice.price} at {bestPrice.storeName}
                            </span>
                          </div>
                          <div className="text-xs text-orange-600 mt-1">
                            Save ₹{product.price - bestPrice.price} •{" "}
                            {bestPrice.storeDistance}
                          </div>
                        </div>
                      )}

                      {comparisons.length > 1 && (
                        <button
                          onClick={() => togglePriceComparison(product.id)}
                          className="w-full text-xs text-blue-600 hover:text-blue-800 font-medium border border-blue-200 rounded py-1 hover:bg-blue-50 transition-colors"
                        >
                          {expandedPrices.has(product.id) ? "Hide" : "Show"}{" "}
                          Price Comparison ({comparisons.length} stores)
                        </button>
                      )}

                      {/* Expanded price comparison */}
                      {expandedPrices.has(product.id) &&
                        comparisons.length > 0 && (
                          <div className="border-t pt-3 space-y-2">
                            <h5 className="text-xs font-semibold text-gray-700">
                              Compare Prices:
                            </h5>
                            {sortedComparisons
                              .slice(0, 3)
                              .map((comparison, index) => (
                                <div
                                  key={comparison.storeName}
                                  className={`p-2 rounded border text-xs ${
                                    index === 0
                                      ? "bg-green-50 border-green-200"
                                      : "bg-gray-50 border-gray-200"
                                  }`}
                                >
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <div className="font-medium">
                                        {comparison.storeName}
                                      </div>
                                      <div className="text-gray-600">
                                        {comparison.storeDistance} •{" "}
                                        {comparison.deliveryTime}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-bold">
                                        ₹{comparison.price}
                                      </div>
                                      {index === 0 &&
                                        comparison.price < product.price && (
                                          <div className="text-green-600">
                                            Save ₹
                                            {product.price - comparison.price}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {sortedComparisons.length > 3 && (
                              <div className="text-xs text-gray-500 text-center">
                                +{sortedComparisons.length - 3} more stores
                                available
                              </div>
                            )}
                          </div>
                        )}

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                          <span>({product.reviews})</span>
                        </div>
                        <Badge
                          variant={
                            product.availability === "in-stock"
                              ? "default"
                              : product.availability === "low-stock"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {product.availability.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => addToCart(product)}
                      disabled={product.availability === "out-of-stock"}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
