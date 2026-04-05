"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, Truck, DollarSign, MessageSquare, 
  Layers, ShieldCheck, ArrowUpRight, Loader2 
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/stats/dashboard-stats");
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="h-[70vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#007FFF]" size={40} />
    </div>
  );

  const cardData = [
    { title: "Total Revenue", value: `৳${stats?.totalRevenue.toLocaleString()}`, icon: <DollarSign size={24} />, color: "bg-blue-500" },
    { title: "Total Orders", value: stats?.totalOrders, icon: <Truck size={24} />, color: "bg-purple-500" },
    { title: "Total Products", value: stats?.totalProducts, icon: <ShoppingBag size={24} />, color: "bg-orange-500" },
    { title: "Unread Messages", value: stats?.unreadMessages, icon: <MessageSquare size={24} />, color: "bg-red-500" },
  ];

  const pieData = [
    { name: 'Pending', value: stats?.orderStats?.pending },
    { name: 'Completed', value: stats?.orderStats?.completed },
  ];

  const COLORS = ['#FFBB28', '#00C49F'];

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#001B3D] uppercase tracking-tighter">Console <span className="text-[#007FFF]">Overview</span></h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Live Store Analytics</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-[#001B3D] uppercase">System Online</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((item, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`${item.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <ArrowUpRight className="text-gray-200" size={20} />
            </div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.title}</p>
            <h3 className="text-3xl font-black text-[#001B3D] tracking-tighter">{item.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-[#001B3D] p-8 rounded-[3rem] shadow-2xl overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-white font-black uppercase text-xs tracking-widest mb-8">Revenue Growth</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{n: 'Start', v: 0}, {n: 'Total', v: stats?.totalRevenue}]}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007FFF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#007FFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="v" stroke="#007FFF" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Order Pie Chart */}
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center">
          <h3 className="text-[#001B3D] font-black uppercase text-xs tracking-widest mb-6 w-full text-center">Order Status</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FFBB28]"></div><span className="text-[10px] font-black uppercase text-gray-400">Pending</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#00C49F]"></div><span className="text-[10px] font-black uppercase text-gray-400">Completed</span></div>
          </div>
        </div>
      </div>

      {/* Other Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-[2rem] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm"><Layers className="text-[#007FFF]" size={20}/></div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400">Categories</p>
              <h4 className="text-xl font-black text-[#001B3D]">{stats?.totalCategories} Active</h4>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-[2rem] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm"><ShieldCheck className="text-green-500" size={20}/></div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400">Admin Users</p>
              <h4 className="text-xl font-black text-[#001B3D]">{stats?.totalAdmins} Verified</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;