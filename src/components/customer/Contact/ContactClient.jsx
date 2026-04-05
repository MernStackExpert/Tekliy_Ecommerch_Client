"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const ContactClient = ({ shopInfo }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setLoading(false);
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-12 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-[#001B3D] uppercase tracking-tighter"
        >
          Need <span className="text-[#007FFF]">Support?</span>
        </motion.h1>
        <p className="text-gray-400 mt-4 font-medium uppercase text-xs tracking-widest">We are here to help you with your premium gadgets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:shadow-blue-50 transition-all duration-500">
              <div className="bg-[#007FFF] w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
                <Phone size={24} />
              </div>
              <h3 className="text-[#001B3D] font-black uppercase text-xs tracking-widest mb-2">Call Us</h3>
              <p className="text-gray-600 font-bold">{shopInfo.phone}</p>
            </div>

            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:shadow-blue-50 transition-all duration-500">
              <div className="bg-[#001B3D] w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-900/10">
                <Mail size={24} />
              </div>
              <h3 className="text-[#001B3D] font-black uppercase text-xs tracking-widest mb-2">Email Support</h3>
              <p className="text-gray-600 font-bold break-all">{shopInfo.email}</p>
            </div>
          </div>

          <div className="p-8 bg-gray-50 rounded-[3rem] border border-gray-100 space-y-8">
            <div className="flex gap-6 items-start">
              <div className="p-3 bg-white rounded-2xl text-[#007FFF] shadow-sm"><MapPin size={24} /></div>
              <div>
                <h4 className="text-[#001B3D] font-black uppercase text-[10px] tracking-widest mb-1">Our Location</h4>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{shopInfo.address}</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="p-3 bg-white rounded-2xl text-[#007FFF] shadow-sm"><Clock size={24} /></div>
              <div>
                <h4 className="text-[#001B3D] font-black uppercase text-[10px] tracking-widest mb-1">Working Hours</h4>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{shopInfo.officeTime}</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50/50 rounded-[2rem] flex items-center gap-4">
            <ShieldCheck className="text-[#007FFF]" size={32} />
            <p className="text-[#001B3D] text-xs font-bold uppercase tracking-tight">Your data is safe with our encrypted support system</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-blue-900/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#007FFF]/5 rounded-bl-full"></div>
          
          <div className="mb-10 flex items-center gap-4">
            <div className="w-1.5 h-8 bg-[#007FFF] rounded-full"></div>
            <h2 className="text-2xl font-black text-[#001B3D] uppercase tracking-tighter">Send a <span className="text-[#007FFF]">Message</span></h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Your Full Name</label>
              <input required type="text" placeholder="John Doe" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none transition-all" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Email Address</label>
              <input required type="email" placeholder="example@mail.com" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none transition-all" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Your Message</label>
              <textarea required rows="4" placeholder="How can we help you?" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none transition-all resize-none" />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-[#001B3D] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#007FFF] transition-all shadow-xl shadow-blue-900/10 active:scale-95 disabled:opacity-70"
            >
              {loading ? "Sending..." : <>Send Message <Send size={18} /></>}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactClient;