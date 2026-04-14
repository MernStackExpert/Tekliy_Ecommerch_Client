"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Zap, Globe } from "lucide-react";

const NotFound = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#001B3D] text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      
      {/* Background Glows */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#007FFF] rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Floating Icons Background */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              left: `${Math.random() * 100}%`, 
              y: "110%", 
              opacity: 0 
            }}
            animate={{ 
              y: "-10%", 
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute text-[#007FFF]/30"
          >
            <Zap size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center flex flex-col items-center max-w-2xl w-full">
        
        {/* 404 Text - Removed the Lottie Player from above this */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="text-[10rem] sm:text-[15rem] font-black leading-none tracking-tighter select-none"
          style={{
            background: "linear-gradient(to bottom, #FFFFFF 20%, #007FFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 20px 40px rgba(0,127,255,0.4))"
          }}
        >
          404
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 -mt-2 px-4"
        >
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight italic">
            Page <span className="text-[#007FFF]">Not Found</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed font-medium">
            Oops! The page you're looking for has been moved or doesn't exist. 
            Let's get you back to base.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto px-6"
        >
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 group shadow-xl"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          
          <Link 
            href="/" 
            className="flex items-center justify-center gap-3 px-10 py-4 bg-[#007FFF] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-95 group"
          >
            <Home size={16} />
            Return Home
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-white/40"
      >
        <Globe size={12} /> TEKLIY GLOBAL NETWORK
      </motion.div>
    </div>
  );
};

export default NotFound;