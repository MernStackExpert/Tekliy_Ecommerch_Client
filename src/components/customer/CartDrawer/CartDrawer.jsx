"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import CheckoutModal from "../CheckoutModal/CheckoutModal";

const CartDrawer = ({ isOpen, onClose }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#001B3D]/40 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 md:top-4 md:right-4 md:bottom-4 w-full md:w-[520px] bg-white z-[101] shadow-2xl md:rounded-[2.5rem] flex flex-col overflow-hidden"
          >
            <div className="p-6 md:p-8 flex items-center justify-between bg-white border-b border-gray-50">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="bg-[#007FFF] p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
                    <ShoppingCart size={24} />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-[#001B3D] text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black border-2 border-white">
                    {cartCount}
                  </span>
                </div>
                <div>
                  <h2 className="text-[#001B3D] font-black text-xl md:text-2xl uppercase tracking-tighter">
                    Your Cart
                  </h2>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    Premium Selection
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="group p-3 hover:bg-red-50 rounded-2xl transition-all duration-300 cursor-pointer"
              >
                <X
                  size={24}
                  className="text-gray-400 group-hover:text-red-500 transition-colors"
                />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-hide">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-10">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-4">
                    <ShoppingBag size={48} />
                  </div>
                  <h3 className="text-[#001B3D] text-lg font-black uppercase">
                    Cart is Empty
                  </h3>
                  <button
                    onClick={onClose}
                    className="mt-4 text-[#007FFF] font-black text-sm uppercase hover:underline"
                  >
                    Start Exploring
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <motion.div
                      layout
                      key={item._id}
                      className="group relative flex gap-4 bg-gray-50/50 p-3 md:p-4 rounded-[1.5rem] border border-transparent hover:border-[#007FFF]/10 hover:bg-white hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="text-[#001B3D] font-bold text-sm md:text-base line-clamp-1 group-hover:text-[#007FFF] transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-[#007FFF] font-black mt-0.5 text-base md:text-lg">
                              ৳{item.price.toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="p-1.5 text-gray-300 hover:text-red-500 transition-all cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-lg p-0.5 shadow-sm">
                            <button
                              onClick={() => updateQuantity(item._id, "dec")}
                              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-[#001B3D] cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-[#001B3D] font-black text-xs w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, "inc")}
                              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#001B3D] hover:text-white text-[#001B3D] cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-[#001B3D]/40 font-bold text-[10px] uppercase tracking-widest">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 md:p-8 bg-white border-t border-gray-50 shadow-[0_-15px_30px_rgba(0,0,0,0.02)]">
                <div className="mb-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-1">
                        Total Amount
                      </p>
                      <span className="text-3xl md:text-4xl font-black text-[#001B3D] tracking-tighter">
                        ৳{cartTotal.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-400 font-bold text-[10px] mb-1">
                      VAT Included
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="group w-full bg-[#001B3D] text-white py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#007FFF] transition-all duration-300 shadow-xl shadow-blue-900/10 active:scale-[0.98]"
                >
                  Confirm Order
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <CheckoutModal
                  isOpen={isCheckoutOpen}
                  onClose={() => setIsCheckoutOpen(false)}
                />
                <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-4">
                  Secure checkout by TEKLIY
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
