import React from "react";
import axios from "axios";
import CollectionSlider from "./CollectionSlider";

export const metadata = {
  title: "Shop by Collection | TEKLIY",
  description: "Explore trending, new arrival, and top tech collections in Bangladesh",
};

const Collection = async () => {
  let collections = [];

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    const data = res.data || [];

    collections = data.map((item, index) => ({
      id: index + 1,
      title: item.name,
      imageUrl: item.img,
      link: `/shop?category=${item.slug}`,
    }));
  } catch (error) {
    console.error("Error:", error.message);
  }

  if (collections.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-black text-[#001B3D] tracking-tighter">
          Shop by collection
        </h2>
        <div className="w-24 h-1.5 bg-[#007FFF] mx-auto mt-4 rounded-full"></div>
      </div>

      <CollectionSlider collections={collections} />
    </section>
  );
};

export default Collection;