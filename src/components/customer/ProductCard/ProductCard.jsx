"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }) => {

  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : 0;

    const { addToCart } = useCart();

  return (
    <div className="group relative bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-[#007FFF] text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Image Section */}
      <Link
        href={`/product/${product.category}/${product._id}`}
        className="relative block h-48 md:h-56 w-full overflow-hidden bg-gray-50"
      >
        <Image
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <div className="bg-white/90 p-2 rounded-full shadow-lg text-[#001B3D] hover:bg-[#007FFF] hover:text-white transition-all">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
          {product.brand}
        </p>
        <Link href={`/product/${product.category}/${product._id}`}>
          <h3 className="text-[#001B3D] font-bold text-sm md:text-base line-clamp-1 group-hover:text-[#007FFF] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[#007FFF] font-black text-lg md:text-xl">
            ৳
            {product.discountPrice
              ? product.discountPrice.toLocaleString()
              : product.price.toLocaleString()}
          </span>
          {product.discountPrice && (
            <span className="text-gray-400 line-through text-xs md:text-sm font-medium">
              ৳{product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
        onClick={() => addToCart(product)}
         className="mt-4 w-full py-2.5 bg-[#001B3D] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#007FFF] active:scale-95 transition-all shadow-md cursor-pointer">
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
