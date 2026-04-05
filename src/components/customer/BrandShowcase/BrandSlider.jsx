"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const BrandSlider = ({ brands }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={4000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        slidesPerView={3}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 4, spaceBetween: 40 },
          1024: { slidesPerView: 6, spaceBetween: 60 },
          1280: { slidesPerView: 8, spaceBetween: 80 },
        }}
        className="brand-swiper ease-linear"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id} className="flex items-center justify-center">
            <div className="relative group grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer py-4">
              <img
                src={brand.logo}
                alt={`${brand.name} official partner logo`}
                className="h-8 md:h-12 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSlider;