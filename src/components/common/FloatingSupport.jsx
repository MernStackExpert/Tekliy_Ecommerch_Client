"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Headphones, 
  X 
} from "lucide-react";

const FloatingSupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      name: "WhatsApp",
      icon: <MessageCircle size={20} />,
      color: "bg-[#25D366]",
      link: "https://wa.me/8801709243323",
    },
    {
      name: "Call Us",
      icon: <Phone size={20} />,
      color: "bg-[#007FFF]",
      link: "tel:+8801709243323",
    },
    {
      name: "Email",
      icon: <Mail size={20} />,
      color: "bg-[#EA4335]",
      link: "mailto:info.tekliy@gmail.com",
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[999]">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col gap-4 mb-4 items-end">
            {contactOptions.map((option, index) => (
              <motion.a
                key={option.name}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`${option.color} text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 group overflow-hidden`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest max-w-0 group-hover:max-w-[100px] transition-all duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {option.name}
                </span>
                {option.icon}
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${
          isOpen ? "bg-red-500" : "bg-[#001B3D]"
        } text-white p-5 rounded-3xl shadow-2xl border-2 border-white/10 flex items-center justify-center transition-colors duration-300 relative overflow-hidden group`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#007FFF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X size={28} className="relative z-10" />
        ) : (
          <Headphones size={28} className="relative z-10" />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingSupport;