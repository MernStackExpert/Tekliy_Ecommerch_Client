"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, Eye, Edit3, Trash2, Plus, 
  Loader2, Layers, ChevronLeft, ChevronRight 
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 20;
  const router = useRouter();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Backend api: /products?page=1&limit=20&search=...
      const res = await axiosInstance.get(`/products?page=${currentPage}&limit=${limit}&search=${search}`);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setTotalProducts(res.data.totalProducts);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]); // page change holei data fetch hobe

  // Search trigger korar jonno (debounce use korle bhalo hoy, tobe ekhane manual search button ba enter press system kora jai)
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(1);
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Product delete korle ar fire paben na!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007FFF",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete!",
      customClass: { popup: "rounded-[2rem]" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/products/${id}`);
          toast.success("Deleted!");
          fetchProducts();
        } catch (error) {
          toast.error("Failed to delete");
        }
      }
    });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#001B3D] uppercase tracking-tighter">
            Inventory <span className="text-[#007FFF]">Management</span>
          </h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">
            Showing {(currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, totalProducts)} of {totalProducts} Products
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
          <div className="relative flex-1">
            <input 
              type="text"
              placeholder="Type & Press Enter to search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 pl-14 text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#007FFF] transition-all"
            />
            <Search className="absolute left-5 top-4 text-gray-300 w-5 h-5" />
          </div>
          <button 
            onClick={() => router.push("/admin/products/add")}
            className="bg-[#001B3D] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-[#007FFF] transition-all shadow-lg"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-[#007FFF]" size={40} /></div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Product info</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Category</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Stock & Price</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.length > 0 ? products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={product.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover bg-gray-100" />
                        <div>
                          <p className="text-[#001B3D] font-bold text-sm leading-tight">{product.name}</p>
                          <p className="text-gray-400 text-[9px] font-bold uppercase">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold">
                        <Layers size={12} className="text-[#007FFF]" /> {product.subCategory}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[#001B3D] font-black text-sm">৳{product.discountPrice.toLocaleString()}</span>
                        <span className={`text-[9px] font-black uppercase ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {product.stock} In Stock
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => router.push(`/admin/products/${product._id}`)} className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-[#007FFF] hover:text-white transition-all"><Eye size={16} /></button>
                        <button onClick={() => router.push(`/admin/products/update/${product._id}`)} className="p-2.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-500 hover:text-white transition-all"><Edit3 size={16} /></button>
                        <button onClick={() => handleDelete(product._id)} className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="text-center py-20 text-gray-400 uppercase text-[10px] font-black">No products found</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Pagination Controller */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-3 bg-white border border-gray-100 rounded-xl text-[#001B3D] disabled:opacity-30 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                  currentPage === index + 1 
                  ? 'bg-[#007FFF] text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-3 bg-white border border-gray-100 rounded-xl text-[#001B3D] disabled:opacity-30 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;