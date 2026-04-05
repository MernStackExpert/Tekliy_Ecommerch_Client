"use client";
import React, { useState } from "react";
import Image from "next/image";

const ProductGallery = ({ images, name }) => {
  const [activeImg, setActiveImg] = useState(images?.[0] || "/placeholder.jpg");

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden group">
        <Image
          src={activeImg}
          alt={name}
          fill
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images?.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(img)}
            className={`relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
              activeImg === img ? "border-[#007FFF] bg-blue-50" : "border-gray-100 hover:border-gray-300"
            }`}
          >
            <Image src={img} alt={name} fill className="object-contain p-2" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;