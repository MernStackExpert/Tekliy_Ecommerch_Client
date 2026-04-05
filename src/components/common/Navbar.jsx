"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="bg-[var(--primary)] text-[var(--white)] sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/TEKLIY.jpeg" 
                alt="TEKLIY Logo" 
                width={120} 
                height={40} 
                className="object-contain h-10 w-auto rounded-sm"
              />
            </Link>
          </div>

          <div className="hidden lg:block flex-1 max-w-md mx-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search premium gadgets..."
                className="w-full bg-white/10 border-none rounded-full py-2.5 px-5 pl-12 text-sm focus:ring-2 focus:ring-[var(--secondary)] outline-none transition-all placeholder:text-gray-400 text-white"
              />
              <Search className="absolute left-4 top-3 text-gray-400 w-4.5 h-4.5" />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-[15px] font-medium">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
            <Link href="/products" className="hover:text-[var(--accent)] transition-colors">Shop</Link>
            
            <div 
              className="relative group py-7"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="flex items-center space-x-1 hover:text-[var(--accent)] transition-colors outline-none">
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-full left-0 w-56 bg-[var(--white)] text-[var(--primary)] rounded-xl shadow-2xl py-3 transform transition-all duration-300 origin-top ${isCategoryOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'}`}>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <Link 
                      key={cat._id}
                      href={`/products?category=${cat.name}`}
                      className="block px-6 py-2.5 hover:bg-[var(--surface)] hover:text-[var(--secondary)] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))
                ) : (
                  <p className="px-6 py-2 text-sm text-gray-400">Loading...</p>
                )}
              </div>
            </div>

            <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">Support</Link>
            
            <Link href="/cart" className="relative hover:text-[var(--accent)] transition-all group">
              <div className="bg-white/10 p-2.5 rounded-full group-hover:bg-[var(--secondary)] transition-colors">
                <ShoppingCart className="w-5 h-5 text-[var(--white)]" />
              </div>
              <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--primary)] text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-[var(--primary)]">
                0
              </span>
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-5">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-[var(--white)]" />
              <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-[var(--primary)] text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                0
              </span>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 focus:outline-none">
              {isMenuOpen ? <X className="w-8 h-8 text-[var(--accent)]" /> : <Menu className="w-8 h-8 text-[var(--white)]" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden bg-[var(--primary)] border-t border-white/10 transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pt-6 pb-10 space-y-4">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search gadgets..."
              className="w-full bg-white/10 rounded-xl py-3 px-5 pl-12 outline-none text-sm text-white"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400 w-4.5 h-4.5" />
          </div>

          <Link href="/" className="block text-xl font-semibold border-b border-white/5 pb-3" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/products" className="block text-xl font-semibold border-b border-white/5 pb-3" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          
          <div>
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center justify-between w-full text-xl font-semibold border-b border-white/5 pb-3"
            >
              <span>Categories</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`bg-white/5 rounded-xl mt-2 transition-all duration-300 overflow-hidden ${isCategoryOpen ? "max-h-96 py-3" : "max-h-0"}`}>
              {categories.map((cat) => (
                <Link 
                  key={cat._id}
                  href={`/products?category=${cat.name}`}
                  className="block px-6 py-2.5 text-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/contact" className="block text-xl font-semibold border-b border-white/5 pb-3" onClick={() => setIsMenuOpen(false)}>Support</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;