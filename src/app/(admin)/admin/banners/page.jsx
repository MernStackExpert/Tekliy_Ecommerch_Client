"use client";
import React, { useEffect, useState } from "react";
import { 
  Plus, Trash2, Edit3, Loader2, Image as ImageIcon, 
  Search, X, Save, CloudUpload, Link as LinkIcon, ExternalLink 
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { uploadImage } from "@/utils/uploadImage";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const BannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ title: "", imageUrl: "", link: "" });

  const fetchBanners = async () => {
    try {
      const res = await axiosInstance.get("/banners");
      setBanners(res.data);
    } catch (error) {
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgLoading(true);
    try {
      const url = await uploadImage(file);
      setFormData({ ...formData, imageUrl: url });
      toast.success("Banner image uploaded!");
    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setImgLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      if (editId) {
        await axiosInstance.patch(`/banners/${editId}`, formData);
        toast.success("Banner updated successfully!");
      } else {
        await axiosInstance.post("/banners", formData);
        toast.success("New banner added!");
      }
      resetForm();
      fetchBanners();
    } catch (error) {
      toast.error("Operation failed!");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove Banner?",
      text: "This will remove the banner from your homepage!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007FFF",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete!",
      customClass: { popup: "rounded-[2.5rem]" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/banners/${id}`);
          toast.success("Banner deleted");
          fetchBanners();
        } catch (error) {
          toast.error("Failed to delete");
        }
      }
    });
  };

  const resetForm = () => {
    setFormData({ title: "", imageUrl: "", link: "" });
    setEditId(null);
    setIsModalOpen(false);
  };

  const openEditModal = (banner) => {
    setEditId(banner._id);
    setFormData({ 
      title: banner.title || "", 
      imageUrl: banner.imageUrl, 
      link: banner.link || "" 
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#001B3D] uppercase tracking-tighter">
            Home <span className="text-[#007FFF]">Banners</span>
          </h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">
            Manage your store's visual advertisements
          </p>
        </div>

        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-[#001B3D] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-[#007FFF] transition-all shadow-lg"
        >
          <Plus size={18} /> Add New Banner
        </button>
      </div>

      {loading ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-[#007FFF]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {banners.map((banner) => (
            <div key={banner._id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="aspect-[21/9] relative overflow-hidden bg-gray-100">
                <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => openEditModal(banner)} className="p-3 bg-white/90 backdrop-blur shadow-sm rounded-xl text-blue-600 hover:bg-[#007FFF] hover:text-white transition-all"><Edit3 size={16} /></button>
                  <button onClick={() => handleDelete(banner._id)} className="p-3 bg-white/90 backdrop-blur shadow-sm rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="p-8 flex items-center justify-between">
                <div>
                  <h3 className="text-[#001B3D] font-black uppercase text-sm tracking-tight">{banner.title || "Untitled Banner"}</h3>
                  {banner.link && (
                    <a href={banner.link} target="_blank" className="flex items-center gap-1.5 text-[#007FFF] text-[10px] font-bold uppercase mt-1">
                      <ExternalLink size={12} /> {banner.link.slice(0, 30)}...
                    </a>
                  )}
                </div>
                <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                  {new Date(banner.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
          {banners.length === 0 && (
            <div className="lg:col-span-2 py-20 text-center border-2 border-dashed border-gray-100 rounded-[3rem]">
              <ImageIcon className="mx-auto text-gray-200 mb-4" size={48} />
              <p className="text-gray-400 font-black uppercase text-xs tracking-widest">No Banners Found</p>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#001B3D]/70 backdrop-blur-md" />
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl relative z-10 overflow-hidden">
            <div className="bg-[#001B3D] p-8 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter">{editId ? "Update" : "Add"} Banner</h3>
                <p className="text-blue-400 text-[9px] font-black uppercase tracking-widest mt-1">Hero Section Settings</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Banner Title (Optional)</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Summer Sale 2026" 
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#007FFF]" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Redirect Link</label>
                <div className="relative">
                   <input 
                    type="text" 
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="/products/category-id" 
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 pl-12 text-sm outline-none focus:ring-2 focus:ring-[#007FFF]" 
                  />
                  <LinkIcon className="absolute left-4 top-3.5 text-gray-300" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Banner Image (21:9 Recommended)</label>
                <label className="border-2 border-dashed border-gray-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#007FFF] transition-all bg-gray-50/50 relative overflow-hidden group min-h-[160px]">
                   {imgLoading ? (
                     <Loader2 className="animate-spin text-[#007FFF]" />
                   ) : formData.imageUrl ? (
                     <>
                        <img src={formData.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                        <CloudUpload className="relative z-10 text-[#001B3D]" size={32} />
                        <span className="relative z-10 text-[10px] font-black text-[#001B3D] uppercase mt-2">Change Image</span>
                     </>
                   ) : (
                     <>
                        <CloudUpload className="text-gray-300 mb-2" size={40} />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Click to upload via ImgBB</span>
                     </>
                   )}
                   <input type="file" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              <button 
                disabled={btnLoading || imgLoading || !formData.imageUrl}
                type="submit" 
                className="w-full bg-[#007FFF] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#001B3D] transition-all disabled:opacity-50 shadow-xl shadow-blue-500/20"
              >
                {btnLoading ? <Loader2 className="animate-spin" /> : <><Save size={18}/> {editId ? "Update Banner" : "Save Banner"}</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerPage;