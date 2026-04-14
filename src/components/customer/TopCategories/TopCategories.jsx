import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const TopCategories = async () => {
  let categories = [];
  
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories?top=true&limit=8`);
    categories = res.data || []; 
  } catch (error) {
    console.error("Error:", error.message);
  }

  if (!categories || categories.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-12 md:py-20">
      <div className="flex items-center justify-between mb-10 md:mb-14">
        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-black text-[#001B3D] tracking-tighter">
            Top <span className="text-[#007FFF]">Categories</span>
          </h2>
          <div className="absolute -bottom-2 left-0 w-24 h-1.5 bg-[#007FFF] rounded-full"></div>
        </div>
        
        <Link href="/shop" className="hidden md:flex items-center gap-2 text-[#001B3D] font-extrabold hover:text-[#007FFF] transition-all group">
          View All <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-6 md:pb-0 scrollbar-hide snap-x snap-mandatory">
        {categories.map((cat) => (
          <Link 
            key={cat._id} 
            href={`/shop?category=${cat.slug}`}
            className="min-w-[75%] sm:min-w-[45%] md:min-w-full snap-center group relative overflow-hidden rounded-[2rem] aspect-[4/3] md:aspect-square bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <Image
              src={cat.img || "/placeholder-cat.jpg"}
              alt={cat.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#001B3D]/90 via-[#001B3D]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex items-center gap-3 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center p-2 border border-white/30 shadow-xl">
                  <img src={cat.icon} alt="icon" className="w-full h-full object-contain brightness-0 invert" />
                </div>
                <h3 className="text-white font-black text-xl md:text-2xl drop-shadow-md uppercase tracking-tight">
                  {cat.name}
                </h3>
              </div>
              <div className="h-1 w-0 bg-[#007FFF] group-hover:w-full transition-all duration-500 rounded-full"></div>
            </div>

            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-all duration-500">
              <ChevronRight className="text-white w-6 h-6" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="md:hidden mt-6">
        <Link href="/shop" className="w-full flex items-center justify-center py-4 bg-[#f0f7ff] text-[#007FFF] font-black rounded-2xl border-2 border-[#007FFF]/10 active:scale-95 transition-all">
          Explore All Categories
        </Link>
      </div>
    </section>
  );
};

export default TopCategories;