import React from "react";
import axios from "axios";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";

const RelatedProducts = async ({ categoryId, currentProductId }) => {
  let relatedList = [];

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products?category=${categoryId}&limit=9`
    );
    
    relatedList = (res.data.products || [])
      .filter((p) => p._id !== currentProductId)
      .slice(0, 8);
  } catch (error) {
    console.error("Error fetching related products:", error.message);
  }

  if (relatedList.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-2xl md:text-4xl font-black text-[#001B3D] tracking-tighter uppercase">
            You May Also <span className="text-[#007FFF]">Like</span>
          </h2>
          <div className="w-20 h-1.5 bg-[#007FFF] mt-2 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {relatedList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link 
          href="/shop" 
          className="group flex items-center gap-3 bg-[#f0f7ff] hover:bg-[#007FFF] text-[#007FFF] hover:text-white px-10 py-4 rounded-2xl font-black transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-200"
        >
          Explore All Products
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default RelatedProducts;