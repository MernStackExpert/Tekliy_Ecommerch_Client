"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const CollectionSlider = ({ collections }) => {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      freeMode={true}
      loop={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      spaceBetween={20}
      slidesPerView={1.2}
      breakpoints={{
        320: { slidesPerView: 1.3, spaceBetween: 15 },
        480: { slidesPerView: 2.2, spaceBetween: 20 },
        768: { slidesPerView: 3.2, spaceBetween: 25 },
        1024: { slidesPerView: 4, spaceBetween: 30, freeMode: false },
      }}
      className="collection-swiper !pb-10"
    >
      {collections.map((item) => (
        <SwiperSlide key={item.id}>
          <Link href={item.link} className="group block">
            <div className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:bg-white/90">
              <div className="relative h-48 md:h-64 w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001B3D]/60 to-transparent"></div>
              </div>
              <div className="py-5 text-center">
                <p className="text-[#001B3D] font-bold text-lg md:text-xl group-hover:text-[#007FFF] transition-colors">
                  {item.title}
                </p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CollectionSlider;