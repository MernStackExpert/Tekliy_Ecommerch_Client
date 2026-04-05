"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Search as SearchIcon, SlidersHorizontal, RotateCcw, ChevronRight } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ShopClient = ({ initialProducts, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [categories, setCategories] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        setCategories(res.data);
      } catch (err) { console.error(err); }
    };
    fetchCats();
  }, []);

  const updateFilters = useCallback((updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.keys(updates).forEach(key => {
      if (updates[key]) params.set(key, updates[key]);
      else params.delete(key);
    });
    if (!updates.page) params.set("page", "1");
    router.push(`/shop?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== (searchParams.get("search") || "")) {
        const params = new URLSearchParams();
        if (searchTerm) params.set("search", searchTerm);
        router.push(`/shop?${params.toString()}`, { scroll: false });
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router, searchParams]);

  const clearAllFilters = () => {
    setSearchTerm("");
    router.push("/shop");
    setIsMobileFilterOpen(false);
  };

  const activeCategory = searchParams.get("category");

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-[#001B3D] font-black uppercase text-[10px] tracking-widest mb-5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#007FFF] rounded-full"></div> Categories
        </h3>
        <div className="flex flex-col gap-1.5">
          <button 
            onClick={() => updateFilters({ category: "" })}
            className={`text-left px-5 py-3.5 rounded-2xl text-xs font-black transition-all flex items-center justify-between group ${!activeCategory ? "bg-[#001B3D] text-white shadow-lg shadow-blue-900/10" : "text-gray-400 hover:bg-white hover:text-[#001B3D] border border-transparent hover:border-gray-100"}`}
          >
            ALL PRODUCTS
            {!activeCategory && <ChevronRight size={14} />}
          </button>
          {categories.map((cat) => (
            <button 
              key={cat._id}
              onClick={() => updateFilters({ category: cat.name })}
              className={`text-left px-5 py-3.5 rounded-2xl text-xs font-black transition-all flex items-center justify-between group ${activeCategory === cat.name ? "bg-[#007FFF] text-white shadow-lg shadow-blue-100" : "text-gray-400 hover:bg-white hover:text-[#001B3D] border border-transparent hover:border-gray-100"}`}
            >
              {cat.name.toUpperCase()}
              {activeCategory === cat.name && <ChevronRight size={14} />}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-gray-100">
        <h3 className="text-[#001B3D] font-black uppercase text-[10px] tracking-widest mb-5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#007FFF] rounded-full"></div> Price Limit
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold text-gray-400 ml-1 uppercase">Min Price</span>
            <input 
              type="number" placeholder="৳ 0" 
              defaultValue={searchParams.get("minPrice") || ""}
              className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-[#007FFF] transition-all"
              onBlur={(e) => updateFilters({ minPrice: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold text-gray-400 ml-1 uppercase">Max Price</span>
            <input 
              type="number" placeholder="৳ 50k" 
              defaultValue={searchParams.get("maxPrice") || ""}
              className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-[#007FFF] transition-all"
              onBlur={(e) => updateFilters({ maxPrice: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-50">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search premium gadgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 pl-14 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none transition-all placeholder:text-gray-400"
          />
          <SearchIcon className="absolute left-5 top-4 text-gray-400 w-5 h-5" />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex-1 flex items-center justify-center gap-2 bg-[#001B3D] text-white px-6 py-4 rounded-2xl font-bold text-sm active:scale-95 transition-all shadow-xl shadow-blue-900/10"
          >
            <SlidersHorizontal size={18} /> Filters
          </button>
          
          <select 
            onChange={(e) => {
              const [sortBy, order] = e.target.value.split("-");
              updateFilters({ sortBy, order });
            }}
            className="flex-1 lg:flex-none bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-[#001B3D] outline-none cursor-pointer"
          >
            <option value="createdAt-desc">Newest</option>
            <option value="price-asc">Price: Low</option>
            <option value="price-desc">Price: High</option>
          </select>

          <button 
            onClick={clearAllFilters}
            className="hidden sm:flex items-center gap-2 bg-red-50 text-red-500 px-6 py-4 rounded-2xl font-bold text-sm hover:bg-red-100 transition-all"
          >
            <RotateCcw size={18} /> Clear
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="hidden lg:block w-72 space-y-8 sticky top-32 h-fit bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100">
          <FilterContent />
        </aside>

        <div className="flex-1">
          {initialProducts.length === 0 ? (
            <div className="py-20 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
              <h3 className="text-[#001B3D] text-xl font-black uppercase tracking-tighter">No Gadgets Found</h3>
              <p className="text-gray-400 mt-2 font-medium text-sm">Try resetting your filters or search query.</p>
              <button onClick={clearAllFilters} className="mt-6 text-[#007FFF] font-black text-xs uppercase underline underline-offset-4">Reset Shop</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {initialProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-2 flex-wrap">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => updateFilters({ page: i + 1 })}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl font-black text-sm transition-all ${Number(searchParams.get("page") || 1) === i + 1 ? "bg-[#001B3D] text-white scale-110 shadow-xl shadow-blue-900/20" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-[#001B3D]/40 backdrop-blur-sm z-[150] lg:hidden"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[3rem] p-8 z-[151] lg:hidden max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black text-[#001B3D] uppercase tracking-tighter">Filters</h2>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Adjust your search</p>
                </div>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-3 bg-gray-50 rounded-2xl text-gray-400"
                >
                  <X size={24} />
                </button>
              </div>
              
              <FilterContent />

              <div className="mt-10 grid grid-cols-2 gap-4">
                <button onClick={clearAllFilters} className="py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest">Clear All</button>
                <button onClick={() => setIsMobileFilterOpen(false)} className="py-4 bg-[#007FFF] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200">Apply</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopClient;