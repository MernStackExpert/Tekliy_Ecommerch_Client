"use client";
import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Loader2,
  Image as ImageIcon,
  Search,
  X,
  Save,
  CloudUpload,
  Star,
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { uploadImage } from "@/utils/uploadImage";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState({ icon: false, img: false });
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    img: "",
    top: false,
  });

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgLoading((prev) => ({ ...prev, [type]: true }));
    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, [type]: url }));
      toast.success(`${type === "icon" ? "Icon" : "Banner"} uploaded!`);
    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setImgLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      if (editId) {
        await axiosInstance.patch(`/categories/${editId}`, formData);
        toast.success("Category updated!");
      } else {
        await axiosInstance.post("/categories", formData);
        toast.success("Category added!");
      }
      setFormData({ name: "", icon: "", img: "", top: false });
      setEditId(null);
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      toast.error("Operation failed!");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the category permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007FFF",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: "rounded-[2rem]" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/categories/${id}`);
          toast.success("Category deleted");
          fetchCategories();
        } catch (error) {
          toast.error("Failed to delete");
        }
      }
    });
  };

  const openEditModal = (cat) => {
    setEditId(cat._id);
    setFormData({
      name: cat.name,
      icon: cat.icon || "",
      img: cat.img || "",
      top: cat.top || false,
    });
    setIsModalOpen(true);
  };

  const filteredCats = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#001B3D] uppercase tracking-tighter">
            Store <span className="text-[#007FFF]">Categories</span>
          </h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">
            Manage your inventory categories
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 pl-14 text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#007FFF] transition-all"
            />
            <Search className="absolute left-5 top-4 text-gray-300 w-5 h-5" />
          </div>
          <button
            onClick={() => {
              setEditId(null);
              setFormData({ name: "", icon: "", img: "", top: false });
              setIsModalOpen(true);
            }}
            className="bg-[#001B3D] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-[#007FFF] transition-all shadow-lg"
          >
            <Plus size={18} /> New Category
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-[#007FFF]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCats.map((cat) => (
            <div
              key={cat._id}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
            >
              <div className="h-32 w-full overflow-hidden relative">
                <img
                  src={cat.img}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20" />
                {cat.top && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-white p-1.5 rounded-lg shadow-lg">
                    <Star size={14} fill="white" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 -mt-12 relative z-10">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white shadow-lg p-2">
                    <img
                      src={cat.icon}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-[#001B3D] font-black uppercase text-sm tracking-tight">
                    {cat.name}
                  </h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                    {cat.slug}
                  </p>
                </div>
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-[#007FFF] hover:text-white transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="flex-1 bg-red-50 text-red-500 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-red-500 hover:text-white transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-[#001B3D]/70 backdrop-blur-md"
          />
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl relative z-10 overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-[#001B3D] p-8 text-white flex justify-between items-center sticky top-0 z-20">
              <h3 className="text-xl font-black uppercase tracking-tighter">
                {editId ? "Update" : "Add"} Category
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                  Category Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Gaming Accessories"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#007FFF]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                    Category Icon
                  </label>
                  <div className="h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative">
                    {imgLoading.icon ? (
                      <Loader2 className="animate-spin text-[#007FFF]" />
                    ) : formData.icon ? (
                      <img
                        src={formData.icon}
                        className="w-full h-full object-contain p-4"
                      />
                    ) : (
                      <ImageIcon className="text-gray-200" size={32} />
                    )}
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "icon")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                    Category Image (Banner)
                  </label>
                  <div className="h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative">
                    {imgLoading.img ? (
                      <Loader2 className="animate-spin text-[#007FFF]" />
                    ) : formData.img ? (
                      <img
                        src={formData.img}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CloudUpload className="text-gray-200" size={32} />
                    )}
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "img")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star
                    size={16}
                    className={
                      formData.top ? "text-yellow-500" : "text-gray-300"
                    }
                    fill={formData.top ? "currentColor" : "none"}
                  />
                  <span className="text-[10px] font-black uppercase text-[#001B3D]">
                    Mark as Top Category
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.top}
                  onChange={(e) =>
                    setFormData({ ...formData, top: e.target.checked })
                  }
                  className="w-5 h-5 accent-[#007FFF]"
                />
              </div>

              <button
                disabled={btnLoading || imgLoading.icon || imgLoading.img}
                type="submit"
                className="w-full bg-[#007FFF] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#001B3D] transition-all disabled:opacity-50"
              >
                {btnLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Save size={18} />{" "}
                    {editId ? "Save Changes" : "Create Category"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
