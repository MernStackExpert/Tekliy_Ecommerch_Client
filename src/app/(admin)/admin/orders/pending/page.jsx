"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Eye, CheckCircle, XCircle, 
  Loader2, Package, Calendar, X, User, 
  MapPin, CreditCard, ShoppingCart
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/orders");
      const pendingOnes = res.data.orders.filter(order => order.orderStatus === "pending");
      setOrders(pendingOnes);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axiosInstance.patch(`/orders/${id}`, { 
        orderStatus: "approved",
        paymentStatus: "pending" 
      });
      toast.success("Order Approved!");
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      toast.error("Approval failed");
    }
  };

  const handleCancel = async (id) => {
    try {
      await axiosInstance.patch(`/orders/${id}`, { orderStatus: "terminated" });
      toast.error("Order Terminated");
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      toast.error("Failed to cancel");
    }
  };

  const filteredOrders = orders.filter(order => 
    order.customerName.toLowerCase().includes(search.toLowerCase()) || order._id.includes(search)
  );

  if (loading) return (
    <div className="h-[70vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#007FFF]" size={40} />
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#001B3D] uppercase tracking-tighter">Pending <span className="text-[#007FFF]">Orders</span></h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Check and approve new requests</p>
        </div>
        <div className="relative max-w-md w-full">
          <input type="text" placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 pl-14 text-sm outline-none shadow-sm" />
          <Search className="absolute left-5 top-4 text-gray-300 w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Order Info</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-[#001B3D] font-bold text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase"><Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-8 py-6 text-[#001B3D] font-bold text-sm">{order.customerName}</td>
                  <td className="px-8 py-6 text-[#007FFF] font-black text-lg">৳{order.totalAmount.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => setSelectedOrder(order)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-[#007FFF] hover:text-white transition-all"><Eye size={18} /></button>
                      <button onClick={() => handleApprove(order._id)} className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"><CheckCircle size={18} /></button>
                      <button onClick={() => handleCancel(order._id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><XCircle size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-[#001B3D]/70 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden max-h-[90vh] flex flex-col">
              <div className="bg-[#001B3D] p-8 text-white flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter">Order Details</h3>
                  <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">ID: {selectedOrder._id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="hover:bg-white/10 p-2 rounded-full transition-colors"><X size={24} /></button>
              </div>

              <div className="p-8 overflow-y-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2"><User size={14} /> Customer Info</h4>
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <p className="text-[#001B3D] font-bold">{selectedOrder.customerName}</p>
                      <p className="text-gray-500 text-sm">{selectedOrder.customerEmail}</p>
                      <p className="text-gray-500 text-sm font-medium">{selectedOrder.customerPhone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2"><MapPin size={14} /> Shipping Address</h4>
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <p className="text-gray-500 text-sm leading-relaxed">{selectedOrder.shippingAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2"><ShoppingCart size={14} /> Ordered Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.products.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-white" />
                          <div>
                            <p className="text-[#001B3D] font-bold text-sm leading-tight">{item.name}</p>
                            <p className="text-gray-400 text-[10px] font-bold">Qty: {item.quantity} × ৳{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <p className="text-[#001B3D] font-black text-sm">৳{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-[#007FFF]/5 rounded-3xl border border-[#007FFF]/10">
                  <div className="flex items-center gap-3 text-[#007FFF]">
                    <CreditCard size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Total Payable</p>
                    <p className="text-2xl font-black text-[#001B3D]">৳{selectedOrder.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-gray-100 flex gap-4 bg-gray-50/50">
                <button onClick={() => handleApprove(selectedOrder._id)} className="flex-1 bg-[#001B3D] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#007FFF] transition-all shadow-lg shadow-blue-900/10">Approve Order</button>
                <button onClick={() => handleCancel(selectedOrder._id)} className="px-8 border-2 border-red-100 text-red-500 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-50 transition-all">Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PendingOrders;