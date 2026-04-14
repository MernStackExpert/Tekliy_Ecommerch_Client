"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  UserPlus, Mail, Lock, Phone, 
  Image as ImageIcon, Loader2, ArrowLeft, 
  ShieldCheck, CloudUpload, X, Save
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { uploadImage } from "@/utils/uploadImage";
import toast from "react-hot-toast";

const CreateUser = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    img: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgLoading(true);
    try {
      const url = await uploadImage(file);
      setFormData({ ...formData, img: url });
      toast.success("Profile picture uploaded!");
    } catch (err) {
      toast.error("Image upload failed!");
    } finally {
      setImgLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/admin/register", formData);
      toast.success("User created successfully! Waiting for approval.");
      router.push("/admin/customers/manage");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-gray-400 hover:text-[#001B3D] font-black uppercase text-[10px] tracking-widest transition-all"
        >
          <ArrowLeft size={16} /> Back to List
        </button>
        <h2 className="text-2xl font-black text-[#001B3D] uppercase tracking-tighter">
          Register New <span className="text-[#007FFF]">Staff</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Avatar Upload */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full rounded-full bg-gray-50 border-4 border-white shadow-inner flex items-center justify-center overflow-hidden">
                {imgLoading ? (
                  <Loader2 className="animate-spin text-[#007FFF]" />
                ) : formData.img ? (
                  <img src={formData.img} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-gray-200" size={40} />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-[#001B3D] text-white rounded-full cursor-pointer hover:bg-[#007FFF] transition-all shadow-lg">
                <CloudUpload size={16} />
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <h4 className="font-black text-[#001B3D] uppercase text-xs tracking-widest">Profile Picture</h4>
            <p className="text-gray-400 text-[9px] mt-2 leading-relaxed">Upload a clear photo for identification.</p>
          </div>

          <div className="bg-[#001B3D] p-8 rounded-[2.5rem] shadow-xl text-white">
            <ShieldCheck className="text-[#007FFF] mb-4" size={32} />
            <h4 className="font-black uppercase text-xs tracking-widest mb-2">Access Level</h4>
            <p className="text-white/50 text-[10px] leading-relaxed">By default, new users are created with 'User' role and 'Pending' status. You can upgrade them after registration.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name</label>
                <div className="relative">
                  <input required name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="John Doe" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#007FFF]" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Phone Number</label>
                <div className="relative">
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="text" placeholder="017XXXXXXXX" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#007FFF]" />
                  <Phone className="absolute right-5 top-4 text-gray-300" size={18} />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Email Address</label>
                <div className="relative">
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="staff@tekliy.com" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#007FFF]" />
                  <Mail className="absolute right-5 top-4 text-gray-300" size={18} />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Account Password</label>
                <div className="relative">
                  <input required name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="••••••••" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#007FFF]" />
                  <Lock className="absolute right-5 top-4 text-gray-300" size={18} />
                </div>
              </div>
            </div>

            <button 
              disabled={loading || imgLoading || !formData.img}
              type="submit" 
              className="w-full bg-[#001B3D] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#007FFF] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Create Account <UserPlus size={18}/></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;