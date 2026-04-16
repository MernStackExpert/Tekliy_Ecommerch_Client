"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

const CheckoutModal = ({ isOpen, onClose, singleProduct = null }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [deliveryType, setDeliveryType] = useState("inside");

  const itemsToOrder = singleProduct ? [singleProduct] : cartItems;
  const subTotal = singleProduct ? (singleProduct.price * singleProduct.quantity) : cartTotal;
  const deliveryCharge = deliveryType === "inside" ? 70 : 120;
  const totalAmount = subTotal + deliveryCharge;

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
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail || "N/A",
      whatsappNumber: formData.whatsappNumber || "N/A",
      shippingAddress: formData.shippingAddress,
      products: itemsToOrder.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subTotal,
      deliveryCharge,
      totalAmount,
      paymentMethod: "Cash on Delivery",
      orderStatus: "pending",
      createdAt: new Date(),
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
              <h2 className="text-2xl font-black text-[#001B3D] uppercase">Success!</h2>
              <p className="text-gray-500 mt-3 font-medium">Thank you for choosing TEKLIY. We will contact you shortly.</p>
              <button onClick={() => { setIsSuccess(false); onClose(); }} className="mt-8 w-full bg-[#001B3D] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#007FFF] transition-all cursor-pointer">Close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-4 overflow-y-auto bg-[#001B3D]/60 backdrop-blur-sm">
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="relative bg-white w-full max-w-[1000px] min-h-screen md:min-h-0 md:rounded-[3rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden my-auto">
            <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-all cursor-pointer">
              <X size={20} />
            </button>

            <div className="flex-1 p-6 md:p-12 overflow-y-auto">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-[#001B3D] uppercase tracking-tighter">Quick <span className="text-[#007FFF]">Checkout</span></h2>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Fill in the details to confirm order</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name *</label>
                    <input required name="customerName" value={formData.customerName} onChange={handleInputChange} type="text" placeholder="MD. Nirob" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Phone Number *</label>
                    <input required name="customerPhone" value={formData.customerPhone} onChange={handleInputChange} type="tel" placeholder="017XXXXXXXX" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">WhatsApp (Optional)</label>
                    <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} type="tel" placeholder="017XXXXXXXX" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Email (Optional)</label>
                    <input name="customerEmail" value={formData.customerEmail} onChange={handleInputChange} type="email" placeholder="example@mail.com" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Delivery Address *</label>
                  <textarea required name="shippingAddress" value={formData.shippingAddress} onChange={handleInputChange} rows="2" placeholder="Full address (Area, City)" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none resize-none" />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Select Area *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button type="button" onClick={() => setDeliveryType("inside")} className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${deliveryType === "inside" ? "border-[#007FFF] bg-blue-50/50" : "border-gray-100 hover:border-gray-200"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${deliveryType === "inside" ? "border-[#007FFF]" : "border-gray-300"}`}>
                          {deliveryType === "inside" && <div className="w-2 h-2 bg-[#007FFF] rounded-full" />}
                        </div>
                        <span className="text-sm font-bold text-[#001B3D]">Inside Dhaka</span>
                      </div>
                      <span className="text-xs font-black text-[#007FFF]">৳70</span>
                    </button>
                    <button type="button" onClick={() => setDeliveryType("outside")} className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${deliveryType === "outside" ? "border-[#007FFF] bg-blue-50/50" : "border-gray-100 hover:border-gray-200"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${deliveryType === "outside" ? "border-[#007FFF]" : "border-gray-300"}`}>
                          {deliveryType === "outside" && <div className="w-2 h-2 bg-[#007FFF] rounded-full" />}
                        </div>
                        <span className="text-sm font-bold text-[#001B3D]">Outside Dhaka</span>
                      </div>
                      <span className="text-xs font-black text-[#007FFF]">৳120</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border-2 border-[#007FFF] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#007FFF] p-2 rounded-lg text-white"><CreditCard size={18} /></div>
                    <span className="text-sm font-bold text-[#001B3D]">Cash on Delivery</span>
                  </div>
                  <CheckCircle2 className="text-[#007FFF]" size={20} />
                </div>

                <button disabled={loading} type="submit" className="w-full bg-[#001B3D] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#007FFF] transition-all shadow-xl shadow-blue-900/10 cursor-pointer">
                  {loading ? <Loader2 className="animate-spin" /> : <>Confirm Order <ArrowRight size={20} /></>}
                </button>
              </form>
            </div>

            <div className="hidden lg:flex w-[380px] bg-gray-50 p-12 flex-col">
              <h3 className="text-[#001B3D] font-black text-xl uppercase mb-8">Order Summary</h3>
              <div className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-hide">
                {itemsToOrder.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-20 h-20 bg-white rounded-2xl flex-shrink-0 border border-gray-100 p-2">
                      <img src={item.image} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#001B3D] font-bold text-sm line-clamp-2 leading-tight">{item.name}</p>
                      <p className="text-gray-400 text-[10px] font-bold mt-1 uppercase">Qty: {item.quantity} | ৳{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 space-y-3">
                <div className="flex justify-between text-gray-500 font-bold text-xs uppercase">
                  <span>Subtotal</span>
                  <span>৳{subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-bold text-xs uppercase">
                  <span>Shipping</span>
                  <span>৳{deliveryCharge}</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-gray-400 text-[10px] font-black uppercase">Total Amount</span>
                  <span className="text-3xl font-black text-[#001B3D]">৳{totalAmount.toLocaleString()}</span>
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