"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Hammer, Home, Settings, Zap, Globe, Construction } from "lucide-react";

const UnderConstruction = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#000B18] text-white flex flex-col items-center justify-center p-6 overflow-hidden relative font-sans">
      
      {/* Background Layer: Animated Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      {/* Floating Particle Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && [...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              opacity: 0 
            }}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0, 0.3, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute text-blue-400/20"
          >
            <Settings size={20 + Math.random() * 20} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center flex flex-col items-center max-w-3xl w-full">
        
        {/* Main Animated Icon */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 p-6 bg-blue-500/10 rounded-3xl border border-blue-500/20 backdrop-blur-sm relative group"
        >
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl group-hover:bg-blue-500/40 transition-all duration-500 rounded-full" />
          <Construction size={80} className="text-blue-400 relative z-10" />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">
            <Zap size={14} className="animate-pulse" /> Work in Progress
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic">
            WE ARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">BUILDING</span> <br />
            SOMETHING COOL
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed font-medium">
            আমাদের এই পেজটি বর্তমানে ডেভেলপমেন্ট মোডে আছে। আমরা একটি অসাধারণ ইউজার এক্সপেরিয়েন্স তৈরি করতে কাজ করছি। খুব শীঘ্রই ফিরে আসছি!
          </p>
        </motion.div>

        {/* Construction Progress Bar */}
        <div className="w-full max-w-md mt-12 mb-10 px-4">
            <div className="flex justify-between mb-2 text-[10px] font-bold uppercase tracking-widest text-blue-400/60">
                <span>System Status: Optimized</span>
                <span>85% Complete</span>
            </div>
            <div className="h-2 w-full bg-blue-950 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 relative"
                >
                    <motion.div 
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-white/30 skew-x-12" 
                    />
                </motion.div>
            </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6"
        >
          <Link 
            href="/" 
            className="flex items-center justify-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-blue-500 transition-all active:scale-95 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Home size={16} className="relative z-10" />
            <span className="relative z-10">Back to Home</span>
          </Link>
          
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-3 px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 group shadow-xl"
          >
            <Settings size={16} className="group-hover:rotate-180 transition-transform duration-700" />
            Check Updates
          </button>
        </motion.div>
      </div>

      {/* Footer Brand */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-white/40"
      >
        <Globe size={12} /> TEKLIY DIGITAL ARCHITECTURE
      </motion.div>
    </div>
  );
};

export default UnderConstruction;