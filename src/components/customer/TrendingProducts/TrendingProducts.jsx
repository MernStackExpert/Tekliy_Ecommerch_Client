import React from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const TrendingProducts = async () => {
  let productList = [];
  
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?isTrending=true&limit=10&t=${Date.now()}`);
    productList = res.data.products || []; 
  } catch (error) {
    console.error("Error fetching trending products:", error.message);
  }

  if (!productList || productList.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-12 md:py-20">
      <div className="flex items-end justify-between mb-8 md:mb-14">
        <div>
          <h2 className="text-3xl md:text-6xl font-black text-[#001B3D] tracking-tighter uppercase">
            Trending <span className="text-[#007FFF]">Now</span>
          </h2>
          <div className="w-16 h-1.5 bg-[#007FFF] mt-3 rounded-full"></div>
        </div>
        
        <Link 
          href="/shop" 
          className="hidden md:flex items-center gap-2 text-[#007FFF] font-black uppercase text-xs tracking-widest hover:text-[#001B3D] transition-all group"
        >
          View All <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 lg:gap-8">
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="md:hidden mt-10">
        <Link 
          href="/shop" 
          className="w-full py-4 bg-[#001B3D] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center shadow-xl shadow-blue-900/20 active:scale-95 transition-all"
        >
          View Full Collection
        </Link>
      </div>
    </section>
  );
};

export default TrendingProducts;