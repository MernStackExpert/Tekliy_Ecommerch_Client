"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Eye, Loader2, Package, Calendar, 
  X, User, MapPin, ShoppingCart, Filter,
  CheckCircle2, XCircle, Trash2
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

const TerminatedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchHistory = async () => {
    try {
      const res = await axiosInstance.get("/orders");
      const historyOnes = res.data.orders.filter(order => 
        order.orderStatus === "delivered" || order.orderStatus === "terminated"
      );
      setOrders(historyOnes);
    } catch (error) {
      toast.error("Error loading order history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this record permanent?")) return;
    try {
      await axiosInstance.delete(`/orders/${id}`);
      toast.success("Order record deleted");
      fetchHistory();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(search.toLowerCase()) || order._id.includes(search);
    const matchesFilter = filter === "all" ? true : order.orderStatus === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <div className="h-[70vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#007FFF]" size={40} /></div>;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#001B3D] uppercase tracking-tighter">Order <span className="text-[#007FFF]">History</span></h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Archived delivered and cancelled orders</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
          <div className="relative flex-1 w-full">
            <input 
              type="text" placeholder="Search history..." value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 pl-14 text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#007FFF] transition-all" 
            />
            <Search className="absolute left-5 top-4 text-gray-300 w-5 h-5" />
          </div>
          
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-[#001B3D] outline-none shadow-sm cursor-pointer"
          >
            <option value="all">All Records</option>
            <option value="delivered">Delivered</option>
            <option value="terminated">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">ID & Date</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-[#001B3D] font-bold text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-gray-400 text-[10px] font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[#001B3D] font-bold text-sm">{order.customerName}</p>
                    <p className="text-[#007FFF] font-black text-xs">৳{order.totalAmount.toLocaleString()}</p>
                  </td>
                  <td className="px-8 py-6">
                    {order.orderStatus === "delivered" ? (
                      <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full text-[10px] font-black uppercase w-fit">
                        <CheckCircle2 size={12} /> Delivered
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-red-600 bg-red-50 px-3 py-1 rounded-full text-[10px] font-black uppercase w-fit">
                        <XCircle size={12} /> Cancelled
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => setSelectedOrder(order)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-[#007FFF] hover:text-white transition-all shadow-sm"><Eye size={18} /></button>
                      <button onClick={() => handleDelete(order._id)} className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="px-8 py-20 text-center text-gray-400 font-black uppercase text-xs tracking-widest">No history found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-[#001B3D]/70 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden max-h-[90vh] flex flex-col">
              <div className={`p-8 text-white flex justify-between items-center ${selectedOrder.orderStatus === 'delivered' ? 'bg-green-600' : 'bg-red-600'}`}>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter">Archived Order</h3>
                  <p className="opacity-70 text-[10px] font-bold uppercase tracking-widest">ID: {selectedOrder._id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="hover:bg-black/10 p-2 rounded-full transition-colors"><X size={24} /></button>
              </div>

              <div className="p-8 overflow-y-auto space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Customer</h4>
                    <p className="text-[#001B3D] font-bold">{selectedOrder.customerName}</p>
                    <p className="text-gray-500 text-sm">{selectedOrder.customerPhone}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Address</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{selectedOrder.shippingAddress}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Items Detail</h4>
                  <div className="space-y-2">
                    {selectedOrder.products.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <p className="text-[#001B3D] font-bold text-sm">{item.name} <span className="text-gray-400 font-medium ml-2">x{item.quantity}</span></p>
                        </div>
                        <p className="text-[#001B3D] font-black text-sm">৳{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Payment Status</p>
                    <p className={`font-black uppercase text-sm ${selectedOrder.paymentStatus === 'approved' ? 'text-green-600' : 'text-orange-500'}`}>
                      {selectedOrder.paymentStatus}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Grand Total</p>
                    <p className="text-2xl font-black text-[#001B3D]">৳{selectedOrder.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                <button onClick={() => setSelectedOrder(null)} className="w-full bg-[#001B3D] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">Close Record</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TerminatedOrders;