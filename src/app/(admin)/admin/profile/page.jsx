"use client";
import React, { useState, useEffect } from "react";
import { User, Camera, Lock, Save, Loader2, Mail, Phone, ShieldCheck, Key, Calendar } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { uploadImage } from "@/utils/uploadImage";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [formData, setFormData] = useState({ name: "", img: "", currentPassword: "", newPassword: "" });

  const defaultUserImg = "https://th.bing.com/th/id/OIP.VX34_cNcA90IYsB4-F-IAAHaHa?w=196&h=196&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/admin/profile");
        if (res.data) {
          setAdminData(res.data);
          setFormData({
            name: res.data.name || "",
            img: (res.data.img && res.data.img !== "null") ? res.data.img : "",
            currentPassword: "",
            newPassword: "",
          });
        }
      } catch (error) {
        toast.error("Unauthorized or session expired");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgLoading(true);
    try {
      const url = await uploadImage(file);
      setFormData(prev => ({ ...prev, img: url }));
      toast.success("Image selected");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setImgLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const payload = { name: formData.name, img: formData.img };
      if (formData.newPassword) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
      }
      await axiosInstance.put("/admin/update-profile", payload);
      toast.success("Updated!");
      setAdminData(prev => ({ ...prev, ...payload }));
      setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "" }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) return <div className="h-[70vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#007FFF]" size={40} /></div>;

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-[#001B3D] uppercase tracking-tighter">My <span className="text-[#007FFF]">Profile</span></h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm text-center">
            <div className="relative w-36 h-36 mx-auto mb-6">
              <div className="w-full h-full rounded-[2.8rem] overflow-hidden border-4 border-gray-50 shadow-inner bg-gray-50 flex items-center justify-center">
                {imgLoading ? <Loader2 className="animate-spin text-[#007FFF]" /> : (
                  <img src={formData.img || defaultUserImg} className="w-full h-full object-cover" alt="" />
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 bg-[#007FFF] text-white p-3 rounded-2xl cursor-pointer shadow-lg hover:scale-110 transition-transform">
                <Camera size={20} /><input type="file" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <h3 className="text-[#001B3D] font-black uppercase text-xl leading-tight">{adminData?.name}</h3>
            <span className="inline-block mt-3 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest bg-blue-50 text-blue-600">{adminData?.role}</span>
          </div>

          <div className="bg-[#001B3D] p-8 rounded-[3rem] text-white space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="text-[#007FFF]" size={20} />
              <div className="overflow-hidden">
                <p className="text-[8px] font-black uppercase text-gray-500">Email Address</p>
                <p className="text-xs font-bold truncate">{adminData?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-[#007FFF]" size={20} />
              <div>
                <p className="text-[8px] font-black uppercase text-gray-500">Phone Contact</p>
                <p className="text-xs font-bold">{adminData?.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ShieldCheck className="text-[#007FFF]" size={20} />
              <div>
                <p className="text-[8px] font-black uppercase text-gray-400">Account Status</p>
                <p className="text-xs font-bold uppercase">{adminData?.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="text-[#007FFF]" size={20} />
              <div>
                <p className="text-[8px] font-black uppercase text-gray-400">Joined On</p>
                <p className="text-xs font-bold">{adminData?.createdAt ? new Date(adminData.createdAt).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Update Full Name</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#007FFF] outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-50">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Current Password</label>
                <input type="password" value={formData.currentPassword} onChange={(e) => setFormData({...formData, currentPassword: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none" placeholder="Required for security" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">New Password</label>
                <input type="password" value={formData.newPassword} onChange={(e) => setFormData({...formData, newPassword: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none" placeholder="Set new password" />
              </div>
            </div>

            <button disabled={btnLoading || imgLoading} type="submit" className="w-full bg-[#007FFF] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#001B3D] transition-all disabled:opacity-50 shadow-xl shadow-blue-500/20">
              {btnLoading ? <Loader2 className="animate-spin" /> : <><Save size={18}/> Save Changes</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;