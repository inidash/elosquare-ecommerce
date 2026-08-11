import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
  Flame,
} from "lucide-react";
import { usePage } from "@inertiajs/react";
import ProductCard from "./ProductCard";

interface Deal {
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  discountPercentage: number;
  savings: number;
  category: string;
  isNewArrival?: boolean;
  timeLeft?: string;
  soldCount?: number;
  stockLeft?: number;
}

const todaysDeals: Deal[] = [
  {
    id: "1",
    name: "Apple Smart watch",
    image: "/images/p-5.jpg",
    currentPrice: 59000,
    originalPrice: 700000,
    discountPercentage: 16,
    savings: 110000,
    category: "Internet & Networking",
    timeLeft: "6h 24m",
    soldCount: 45,
  },
  {
    id: "2",
    name: "slick swede shoe",
    image: "/images/p-3.jpg",
    currentPrice: 40000,
    originalPrice: 990000,
    discountPercentage: 40,
    savings: 400000,
    category: "Satellite Equipment",
    timeLeft: "4h 12m",
    soldCount: 23,
    stockLeft: 7,
  },
  {
    id: "3",
    name: "Wired super bass headphone",
    image: "/images/p-9.jpg",
    currentPrice: 12000,
    originalPrice: 330000,
    discountPercentage: 4,
    savings: 12000,
    category: "Portable Tech",
    timeLeft: "8h 45m",
    soldCount: 67,
  },
  {
    id: "4",
    name: 'Smart Duffle Bag',
    image: "/images/p-11.jpg",
    currentPrice: 15400,
    originalPrice: 129600,
    discountPercentage: 3,
    savings: 4200,
    category: "Smartphones",
    isNewArrival: true,
    timeLeft: "12h 30m",
    soldCount: 134,
  },
  {
    id: "5",
    name: 'Smart Oraimo ear pod',
    image: "/images/p-13.jpg",
    currentPrice: 16700,
    originalPrice: 107500,
    discountPercentage: 10,
    savings: 10800,
    category: "Mobile Phones",
    timeLeft: "2h 15m",
    soldCount: 89,
    stockLeft: 12,
  },
  {
    id: "6",
    name: 'Hot water flask',
    image: "/images/p-14.jpg",
    currentPrice: 11600,
    originalPrice: 146600,
    discountPercentage: 3,
    savings: 5000,
    category: "Android Phones",
    timeLeft: "5h 45m",
    soldCount: 76,
  },
];

function formatPrice(price: number): string {
  return `₦${price.toLocaleString()}`;
}

function DealCard({ deal }: { deal: Deal }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-700 transform hover:-translate-y-2 flex-shrink-0 w-80 rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Deal Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-full blur opacity-75" />
        </div>
      </div>
      {/* Floating Action Buttons */}
      <div
        className={`absolute top-4 right-4 z-20 flex flex-col gap-2 transition-all duration-500 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
      >
        
      </div> 

      {/* Product Image */}
      <div className="relative h-64 overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
        <img
          src={deal.image}
          alt={deal.name}
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Product Info */}
      <div className="relative p-6 space-y-4 bg-white/70 backdrop-blur-sm rounded-b-2xl">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 line-clamp-2">
          {deal.name}
        </h3>

        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900">
              {formatPrice(deal.currentPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-pink-500/5 rounded-2xl transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </Card>
  );
}

export default function ProductDisplay() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { featured_products } = usePage().props;
  console.log(featured_products);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -340,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 340,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-20" />
              <div className="relative bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-2xl">
                <Flame className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-gray-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Hot Products
              </h2>
              <p className="text-lg text-slate-600 font-medium">
                Limited time offers • Grab them before they're gone!
              </p>
            </div>
          </div>

          {/* <Button
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-red-200 text-red-600 hover:bg-red-50 font-semibold px-6 py-2 rounded-xl shadow-lg"
          >
            See All Deals
          </Button> */}
        </div>

        {/* Deals Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white text-slate-600 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] rounded-2xl p-4 z-10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* {todaysDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))} */}

            {featured_products.map((product: any) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <Button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white text-slate-600 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] rounded-2xl p-4 z-10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}