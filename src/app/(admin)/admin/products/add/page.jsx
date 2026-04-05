"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Image as ImageIcon,
  Layout,
  Tag,
  Settings,
  Loader2,
  Info,
  CloudUpload,
  Link as LinkIcon,
  Star,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { uploadImage } from "@/utils/uploadImage";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const AddProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageTab, setImageTab] = useState("upload");
  const [specList, setSpecList] = useState([{ name: "", value: "" }]);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    brand: "",
    category: "",
    subCategory: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    isFeatured: false,
    isTrending: false,
    isNewArrival: true,
    status: "active",
    images: [],
    tags: [""],
  });

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCats();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgLoading(true);
    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setImgLoading(false);
    }
  };

  const handleArrayChange = (index, value, field) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayField = (index, field) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...specList];
    updated[index][field] = value;
    setSpecList(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const specsObject = specList.reduce((obj, item) => {
        if (item.name.trim()) obj[item.name.trim()] = item.value;
        return obj;
      }, {});

      const adminData = Cookies.get("admin_user");
      const admin = adminData ? JSON.parse(adminData) : null;

      const finalData = {
        ...formData,
        specifications: specsObject,
        price: Number(formData.price),
        discountPrice: Number(formData.discountPrice),
        stock: Number(formData.stock),
        tags: formData.tags.filter((t) => t.trim() !== ""),
        addedBy: admin
          ? { name: admin.name, email: admin.email, role: admin.role }
          : {},
      };

      await axiosInstance.post("/products", finalData);
      toast.success("Product Published Successfully!");
      router.push("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex items-center justify-between bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-[#001B3D] font-black uppercase text-[10px] tracking-widest transition-all"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <h2 className="text-xl font-black text-[#001B3D] uppercase tracking-tighter">
          Publish <span className="text-[#007FFF]">Product</span>
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-5">
              <Info className="text-[#007FFF]" size={20} />
              <h3 className="font-black text-[#001B3D] uppercase text-xs tracking-widest">
                General Information
              </h3>
            </div>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="iPhone 15 Pro Max..."
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#007FFF]"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Brand (Apple)"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
              <input
                required
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="SKU Code"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
            </div>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Product Description..."
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#007FFF] resize-none"
            />
          </div>

          <div className="bg-[#001B3D] p-10 rounded-[3rem] shadow-xl text-white space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <h3 className="font-black uppercase text-xs tracking-widest flex items-center gap-2">
                <Settings size={18} /> Technical Specs
              </h3>
              <button
                type="button"
                onClick={() =>
                  setSpecList([...specList, { name: "", value: "" }])
                }
                className="text-[#007FFF] font-black text-[10px] uppercase tracking-widest"
              >
                + Add Field
              </button>
            </div>
            {specList.map((spec, i) => (
              <div key={i} className="flex max-md:flex-col gap-3">
                <input
                  value={spec.name}
                  onChange={(e) => handleSpecChange(i, "name", e.target.value)}
                  placeholder="Spec Name"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-xs outline-none focus:border-[#007FFF]"
                />
                <input
                  value={spec.value}
                  onChange={(e) => handleSpecChange(i, "value", e.target.value)}
                  placeholder="Value"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-xs outline-none focus:border-[#007FFF]"
                />
                <button
                  type="button"
                  onClick={() =>
                    setSpecList(specList.filter((_, idx) => idx !== i))
                  }
                  className="text-red-400 p-2 max-md:ml-30"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-50 pb-5">
              <div className="flex items-center gap-3">
                <Tag className="text-[#007FFF]" size={20} />
                <h3 className="font-black text-[#001B3D] uppercase text-xs tracking-widest">
                  Product Tags
                </h3>
              </div>
              <button
                type="button"
                onClick={() => addArrayField("tags")}
                className="text-[#007FFF] font-black text-[10px] uppercase tracking-widest"
              >
                + Add Tag
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {formData.tags.map((tag, i) => (
                <div key={i} className="relative">
                  <input
                    value={tag}
                    onChange={(e) =>
                      handleArrayChange(i, e.target.value, "tags")
                    }
                    placeholder="Tag (e.g. 5G)"
                    className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-xs outline-none focus:ring-2 focus:ring-[#007FFF]"
                  />
                  {formData.tags.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField(i, "tags")}
                      className="absolute right-2 top-2.5 text-red-400"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex bg-gray-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setImageTab("upload")}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${imageTab === "upload" ? "bg-white text-[#007FFF] shadow-sm" : "text-gray-400"}`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setImageTab("url")}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${imageTab === "url" ? "bg-white text-[#007FFF] shadow-sm" : "text-gray-400"}`}
              >
                Direct URL
              </button>
            </div>

            {imageTab === "upload" ? (
              <label className="border-2 border-dashed border-gray-200 rounded-[2.5rem] p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#007FFF] transition-all bg-gray-50/50">
                {imgLoading ? (
                  <Loader2 className="animate-spin text-[#007FFF]" />
                ) : (
                  <>
                    <CloudUpload className="text-gray-300 mb-2" size={40} />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      ImgBB Upload
                    </span>
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            ) : (
              <div className="flex gap-2">
                <input
                  id="url-input"
                  type="text"
                  placeholder="https://..."
                  className="flex-1 bg-gray-50 border-none rounded-xl py-3.5 px-4 text-xs outline-none focus:ring-2 focus:ring-[#007FFF]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const val = document.getElementById("url-input").value;
                    if (val)
                      setFormData((p) => ({
                        ...p,
                        images: [...p.images, val],
                      }));
                    document.getElementById("url-input").value = "";
                  }}
                  className="bg-[#001B3D] text-white px-4 rounded-xl"
                >
                  <Plus size={18} />
                </button>
              </div>
            )}

            <div className="grid grid-cols-4 gap-3">
              {formData.images.map((img, i) => (
                <div key={i} className="relative group aspect-square">
                  <img
                    src={img}
                    className="h-full w-full object-cover rounded-xl border border-gray-100"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        images: p.images.filter((_, idx) => idx !== i),
                      }))
                    }
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">
            <select
              required
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none appearance-none cursor-pointer"
            >
              <option value="">Main Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              required
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              placeholder="Sub Category (e.g. Phones)"
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                required
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                type="number"
                placeholder="Regular Price"
                className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-sm outline-none"
              />
              <input
                required
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleInputChange}
                type="number"
                placeholder="Offer Price"
                className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-sm outline-none"
              />
            </div>
            <input
              required
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              type="number"
              placeholder="Stock Level"
              className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-sm outline-none"
            />

            <div className="space-y-3 pt-2">
              {[
                {
                  id: "isFeatured",
                  label: "Featured Product",
                  icon: <Sparkles size={14} />,
                  color: "text-blue-500",
                },
                {
                  id: "isTrending",
                  label: "Trending Item",
                  icon: <TrendingUp size={14} />,
                  color: "text-orange-500",
                },
                {
                  id: "isNewArrival",
                  label: "New Arrival",
                  icon: <CheckCircle2 size={14} />,
                  color: "text-green-500",
                },
              ].map((item) => (
                <label
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <div
                    className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${item.color}`}
                  >
                    {item.icon} {item.label}
                  </div>
                  <input
                    type="checkbox"
                    name={item.id}
                    checked={formData[item.id]}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-[#007FFF]"
                  />
                </label>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#007FFF] text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Publish Product <Save size={20} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
