import React from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { ChevronRight } from "lucide-react";

const TrendingProducts = async () => {
  let productList = [];
  
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?isTrending=true&limit=10`);
    productList = res.data.products || []; 
  } catch (error) {
    console.error("Error:", error.message);
  }

  if (!productList || productList.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-12 md:py-20 overflow-hidden">
      <div className="flex items-end justify-between mb-8 md:mb-14">
        <div>
          <h2 className="text-3xl md:text-6xl font-black text-[#001B3D] tracking-tighter">
            Trending <span className="text-[#007FFF]">Now</span>
          </h2>
          <div className="w-16 h-1 bg-[#007FFF] mt-2 rounded-full"></div>
        </div>
        
        <button className="hidden md:flex items-center gap-2 text-[#007FFF] font-bold hover:text-[#001B3D] transition-colors">
          View All <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* এই ডিভ থেকে 'group' ক্লাসটি সরিয়ে দেওয়া হয়েছে */}
      <div className="relative">
        <div className="flex md:grid md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-8 overflow-x-auto md:overflow-visible pb-8 scrollbar-hide snap-x snap-mandatory">
          {productList.map((product) => (
            <div 
              key={product._id} 
              className="min-w-[46%] sm:min-w-[40%] md:min-w-full snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="bg-[#007FFF]/90 p-2 rounded-l-full shadow-lg animate-pulse">
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="md:hidden mt-4">
        <button className="w-full py-3 bg-[#001B3D] text-white rounded-xl font-bold text-sm">
          View All Collection
        </button>
      </div>
    </section>
  );
};

export default TrendingProducts;