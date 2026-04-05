"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Tag, Database, Calendar, Clock, 
  User, ShieldCheck, Star, TrendingUp, Sparkles, 
  Layers, Package, CheckCircle2, History
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return (
    <div className="h-[70vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#007FFF]"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-[#001B3D] font-black uppercase text-[10px] tracking-widest transition-all"
      >
        <ArrowLeft size={16} /> Back to Inventory
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-white p-4 rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <img src={product.images[0]} className="w-full h-[500px] object-cover rounded-[3rem]" alt="" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <img key={i} src={img} className="h-24 w-full object-cover rounded-2xl border border-gray-100 bg-white p-1" alt="" />
            ))}
          </div>
        </div>

        <div className="xl:col-span-7 space-y-8">
          <div className="flex flex-wrap gap-3">
            {product.isFeatured && <span className="flex items-center gap-1.5 bg-blue-50 text-[#007FFF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"><Sparkles size={12} /> Featured</span>}
            {product.isTrending && <span className="flex items-center gap-1.5 bg-orange-50 text-orange-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"><TrendingUp size={12} /> Trending</span>}
            {product.isNewArrival && <span className="flex items-center gap-1.5 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"><CheckCircle2 size={12} /> New Arrival</span>}
          </div>

          <div>
            <div className="flex items-center gap-2 text-[#007FFF] font-black uppercase text-[10px] tracking-widest">
              <Layers size={14} /> {product.brand} • {product.subCategory}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#001B3D] tracking-tighter mt-4 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-6 mt-4">
               <div className="flex items-center gap-1.5 text-yellow-500">
                  <Star size={18} fill="currentColor" />
                  <span className="text-sm font-black">{product.ratings} <span className="text-gray-400 font-bold">({product.numOfReviews} Reviews)</span></span>
               </div>
               <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${product.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                Status: {product.status}
               </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Offer Price</p>
              <h3 className="text-2xl font-black text-[#007FFF]">৳{product.discountPrice.toLocaleString()}</h3>
              <p className="text-gray-300 text-xs line-through font-bold uppercase mt-1">MRP: ৳{product.price.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Available Stock</p>
              <h3 className={`text-2xl font-black ${product.stock > 0 ? 'text-[#001B3D]' : 'text-red-500'}`}>{product.stock} Units</h3>
              <p className="text-gray-400 text-[10px] font-black uppercase mt-1 tracking-widest">SKU: {product.sku}</p>
            </div>
            <div className="bg-[#001B3D] p-6 rounded-[2rem] shadow-xl shadow-blue-900/10 flex flex-col justify-center">
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">Added By</p>
              <h3 className="text-white font-bold text-sm uppercase tracking-tight">{product.addedBy?.name}</h3>
              <p className="text-white/40 text-[9px] font-bold mt-1 truncate">{product.addedBy?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
              <Database size={14} /> Technical Specifications
            </h4>
            <div className="bg-gray-50 p-8 rounded-[2.5rem] grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 border border-gray-100">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex flex-col border-b border-gray-200/50 pb-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{key}</span>
                  <span className="text-[#001B3D] font-bold text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4">
                <Calendar className="text-[#007FFF]" size={20} />
                <div>
                   <p className="text-[10px] font-black uppercase text-gray-400">Created At</p>
                   <p className="text-xs font-bold text-[#001B3D]">{new Date(product.createdAt).toLocaleString()}</p>
                </div>
             </div>
             <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4">
                <History className="text-[#007FFF]" size={20} />
                <div>
                   <p className="text-[10px] font-black uppercase text-gray-400">Last Updated</p>
                   <p className="text-xs font-bold text-[#001B3D]">{new Date(product.updatedAt).toLocaleString()}</p>
                </div>
             </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-2">
            {product.tags.map((tag, i) => (
              <span key={i} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-widest border border-gray-100">
                <Tag size={12} className="text-[#007FFF]" /> {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;