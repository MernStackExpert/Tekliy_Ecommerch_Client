import React from "react";
import axios from "axios";
import ShopClient from "@/components/customer/Shop/ShopClient";

const ShopPage = async ({ searchParams }) => {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();
  
  let data = { products: [], totalPages: 1 };

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?${queryString}`);
    data = res.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-8 md:py-12">
      <ShopClient 
        initialProducts={data.products} 
        totalPages={data.totalPages} 
      />
    </main>
  );
};

export default ShopPage;