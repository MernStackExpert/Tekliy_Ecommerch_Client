"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Truck, CreditCard, ShoppingBag, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

const CheckoutModal = ({ isOpen, onClose, singleProduct = null }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const itemsToOrder = singleProduct ? [singleProduct] : cartItems;
  const totalAmount = singleProduct ? (singleProduct.price * singleProduct.quantity) : cartTotal;

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    whatsappNumber: "",
    shippingAddress: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      ...formData,
      products: itemsToOrder.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      totalAmount,
      paymentMethod: "Cash on Delivery",
    };

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderData);
      if (res.status === 201) {
        setIsSuccess(true);
        if (!singleProduct) clearCart();
        toast.success("Order placed successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#001B3D]/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white p-10 rounded-[2.5rem] max-w-md w-full text-center shadow-2xl">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-2xl font-black text-[#001B3D] uppercase">Order Confirmed!</h2>
              <p className="text-gray-500 mt-3 font-medium">Thank you for choosing TEKLIY. We will contact you shortly to verify your order.</p>
              <button onClick={() => { setIsSuccess(false); onClose(); }} className="mt-8 w-full bg-[#001B3D] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#007FFF] transition-all">Close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-4 overflow-y-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-[#001B3D]/60 backdrop-blur-sm" />
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 50, opacity: 0 }}
            className="relative bg-white w-full max-w-[900px] min-h-screen md:min-h-0 md:rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-all">
              <X size={20} />
            </button>

            <div className="flex-1 p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-[#001B3D] uppercase tracking-tighter">Checkout <span className="text-[#007FFF]">Details</span></h2>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Complete your premium order</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name *</label>
                    <input required name="customerName" value={formData.customerName} onChange={handleInputChange} type="text" placeholder="John Doe" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Email (Optional)</label>
                    <input name="customerEmail" value={formData.customerEmail} onChange={handleInputChange} type="email" placeholder="john@example.com" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Phone Number *</label>
                    <input required name="customerPhone" value={formData.customerPhone} onChange={handleInputChange} type="tel" placeholder="017XXXXXXXX" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">WhatsApp (Optional)</label>
                    <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} type="tel" placeholder="017XXXXXXXX" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Delivery Address *</label>
                  <textarea required name="shippingAddress" value={formData.shippingAddress} onChange={handleInputChange} rows="3" placeholder="House no, Road no, Area, City" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none resize-none" />
                </div>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
                  <div className="bg-[#007FFF] p-2 rounded-lg text-white"><CreditCard size={18} /></div>
                  <div>
                    <p className="text-[#001B3D] font-bold text-sm">Cash on Delivery</p>
                    <p className="text-[#007FFF] text-[10px] font-bold uppercase">Pay when you receive the product</p>
                  </div>
                </div>

                <button disabled={loading} type="submit" className="w-full bg-[#001B3D] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#007FFF] transition-all shadow-xl shadow-blue-900/10 disabled:opacity-70">
                  {loading ? <Loader2 className="animate-spin" /> : <>Confirm Order <ArrowRight size={20} /></>}
                </button>
              </form>
            </div>

            <div className="hidden md:flex w-[340px] bg-gray-50 p-12 flex-col">
              <h3 className="text-[#001B3D] font-black text-lg uppercase mb-8">Order Summary</h3>
              <div className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-hide">
                {itemsToOrder.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex-shrink-0 border border-gray-100 p-2"><img src={item.image} alt="" className="w-full h-full object-contain" /></div>
                    <div className="flex-1">
                      <p className="text-[#001B3D] font-bold text-xs line-clamp-1">{item.name}</p>
                      <p className="text-gray-400 text-[10px] font-bold mt-1 uppercase">Qty: {item.quantity}</p>
                      <p className="text-[#007FFF] font-black text-sm mt-0.5">৳{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 text-[10px] font-black uppercase">Total Amount</span>
                  <span className="text-2xl font-black text-[#001B3D]">৳{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;