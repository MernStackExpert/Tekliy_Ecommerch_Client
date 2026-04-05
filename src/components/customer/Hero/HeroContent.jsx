"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroContent = ({ banners }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <div className="w-full h-[300px] md:h-[500px] lg:h-[600px] bg-gray-100 rounded-3xl animate-pulse"></div>
      </div>
    );
  }

  if (!banners || banners.length === 0) return null;

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-6">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="rounded-3xl overflow-hidden shadow-2xl h-[300px] md:h-[500px] lg:h-[600px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner._id || index}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${banner.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/80 to-transparent"></div>

              <div className="relative z-10 px-8 md:px-20 max-w-2xl">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl md:text-6xl font-black text-white leading-tight"
                >
                  {banner.title || "Next Gen Tech at TEKLIY"}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-4 text-[var(--accent)] text-lg md:text-xl font-medium"
                >
                  Upgrade your lifestyle with our premium gadgets.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-8"
                >
                  <button className="btn-primary py-3 md:py-4 px-8 md:px-10 text-lg font-bold shadow-xl">
                    Shop Now
                  </button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: var(--accent) !important;
          width: 12px;
          height: 12px;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 6px;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default HeroContent;