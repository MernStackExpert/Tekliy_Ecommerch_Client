"use client";
import React, { useState } from "react";
import { ShoppingCart, Zap, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CheckoutModal from "../CheckoutModal/CheckoutModal";

const ProductInfo = ({ product }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const singleProductData = {
    _id: product._id,
    name: product.name,
    price: product.discountPrice || product.price,
    image: product.images[0],
    quantity: quantity
  };

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <span className="bg-blue-50 text-[#007FFF] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
          {product.brand}
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-[#001B3D] mt-3 leading-tight uppercase">
          {product.name}
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(product.ratings || 5))}
          </div>
          <span className="text-gray-400 text-sm font-medium">({product.numOfReviews} Global Reviews)</span>
        </div>
      </div>

      <div className="bg-gray-50/50 p-6 rounded-3xl mb-8">
        <div className="flex items-baseline gap-4">
          <span className="text-4xl font-black text-[#007FFF]">
            ৳{product.discountPrice ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}
          </span>
          {product.discountPrice && (
            <span className="text-xl text-gray-400 line-through font-medium">
              ৳{product.price.toLocaleString()}
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-4 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2 bg-white">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-2xl px-2 text-gray-400 cursor-pointer">-</button>
          <span className="px-6 font-bold text-[#001B3D]">{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)} className="text-2xl px-2 text-gray-400 cursor-pointer">+</button>
        </div>
        <button
        onClick={() => addToCart(product, quantity)}
         className="flex-1 bg-[#001B3D] text-white rounded-xl font-bold py-4 flex items-center justify-center gap-2 hover:bg-[#007FFF] transition-all shadow-xl shadow-blue-900/10 cursor-pointer">
          <ShoppingCart className="w-5 h-5" /> Add to Cart
        </button>



        <button
        onClick={() => setIsCheckoutOpen(true)}
         className="flex-1 bg-[#007FFF] text-white rounded-xl font-bold py-4 flex items-center justify-center gap-2 hover:bg-[#001B3D] transition-all shadow-xl shadow-blue-500/20 cursor-pointer">
          <Zap className="w-5 h-5" /> Buy Now
        </button>

        <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        singleProduct={singleProductData} 
      />
      </div>



      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-8">
        <div className="flex items-center gap-3">
          <Truck className="text-[#007FFF] w-5 h-5" />
          <span className="text-xs font-bold text-gray-500 uppercase">Free Delivery</span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-[#007FFF] w-5 h-5" />
          <span className="text-xs font-bold text-gray-500 uppercase">1 Year Warranty</span>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="text-[#007FFF] w-5 h-5" />
          <span className="text-xs font-bold text-gray-500 uppercase">7 Days Return</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;