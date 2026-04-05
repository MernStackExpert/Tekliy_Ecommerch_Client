import React from "react";
import axios from "axios";
import ProductGallery from "@/components/customer/ProductDetails/ProductGallery";
import ProductInfo from "@/components/customer/ProductDetails/ProductInfo";
import RelatedProducts from "@/components/customer/ProductDetails/RelatedProducts";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  let product = null;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    product = res.data;
  } catch (error) {
    console.error("Error:", error.message);
  }

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-[#001B3D]">
        Product not found!
      </div>
    );
  }

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-8 md:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
        <Link href="/" className="hover:text-[#007FFF] flex items-center gap-1 transition-colors">
          <Home className="w-4 h-4" /> Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-[#007FFF] transition-colors">
          {product.subCategory || "Gadgets"}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#001B3D] font-bold truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl md:text-4xl font-black text-[#001B3D] mb-8 uppercase tracking-tighter">
          Full <span className="text-[#007FFF]">Specifications</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {Object.entries(product.specifications || {}).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-50/50 px-2 transition-colors">
              <span className="text-gray-500 font-bold text-sm uppercase">{key}</span>
              <span className="text-[#001B3D] font-extrabold text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <RelatedProducts 
        categoryId={product.category} 
        currentProductId={product._id} 
      />
    </main>
  );
};

export default ProductDetailsPage;