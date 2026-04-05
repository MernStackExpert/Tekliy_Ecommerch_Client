"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();.

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/admin/login", formData);
      if (res.status === 200) {
        Cookies.set("tekliy_admin_token", res.data.token, { expires: 7 });
        Cookies.set("admin_user", JSON.stringify(res.data.user), { expires: 7 });
        toast.success("Access Granted! Welcome Back.");
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000B1A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#007FFF]/10 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#007FFF]/10 rounded-full blur-[140px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[450px] bg-[#001529]/80 backdrop-blur-xl rounded-[3rem] p-10 md:p-14 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
      >
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-white/5 rounded-3xl mb-6 border border-white/10">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
              TEKLIY <span className="text-[#007FFF]">ADMIN</span>
            </h1>
          </div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">Secure Control Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-gray-500 ml-1 tracking-widest">Admin Email</label>
            <div className="relative group">
              <input 
                required
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@tekliy.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 px-6 pl-14 text-sm text-white placeholder:text-gray-600 focus:border-[#007FFF] focus:bg-white/10 outline-none transition-all duration-300" 
              />
              <Mail className="absolute left-5 top-4.5 text-gray-500 group-focus-within:text-[#007FFF] transition-colors w-5 h-5" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-gray-500 ml-1 tracking-widest">Master Password</label>
            <div className="relative group">
              <input 
                required
                name="password"
                type={showPassword ? "text" : "password"} 
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 px-6 pl-14 pr-14 text-sm text-white placeholder:text-gray-600 focus:border-[#007FFF] focus:bg-white/10 outline-none transition-all duration-300" 
              />
              <Lock className="absolute left-5 top-4.5 text-gray-500 group-focus-within:text-[#007FFF] transition-colors w-5 h-5" />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-4.5 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-[#007FFF] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#0066CC] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_25px_rgba(0,127,255,0.3)] disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </div>
        </form>

        <div className="mt-12 text-center border-t border-white/5 pt-8">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest leading-loose">
            Enterprise Grade Security <br />
            &copy; {new Date().getFullYear()} TEKLIY PREMIUM
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;