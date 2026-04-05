"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, ShoppingBag, Truck, Layers, 
  Users, Settings, LogOut, Menu, X, Bell, Loader2, ChevronDown 
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("tekliy_admin_token");
    const userJson = Cookies.get("admin_user");

    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    if (!token || !userJson) {
      router.push("/admin/login");
    } else {
      setIsLoading(false);
      fetchStats();
    }

    if (pathname.includes("/admin/orders")) {
      setIsOrdersOpen(true);
    }
  }, [pathname, router]);

  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get("/stats/dashboard-stats");
      setPendingCount(res.data.orderStats?.pending || 0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("tekliy_admin_token");
    Cookies.remove("admin_user");
    router.push("/admin/login");
  };

  if (isLoading && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-[#001B3D] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin mb-4 text-[#007FFF]" size={40} />
        <p className="text-xs font-black uppercase tracking-[0.3em] opacity-50">Verifying Admin...</p>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-[#001B3D]/40 backdrop-blur-sm z-[100] lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-[#001B3D] text-white z-[101] transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-8">
          <Link href="/admin" className="text-2xl font-black tracking-tighter uppercase">
            TEKLIY <span className="text-[#007FFF]">ADMIN</span>
          </Link>
        </div>

        <nav className="mt-4 px-4 space-y-1">
          <Link
            href="/admin"
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${pathname === "/admin" ? "bg-[#007FFF] text-white shadow-lg" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <div>
            <button
              onClick={() => setIsOrdersOpen(!isOrdersOpen)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm transition-all ${pathname.includes("/admin/orders") ? "text-white bg-white/5" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <div className="flex items-center gap-4">
                <Truck size={20} />
                Orders
              </div>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isOrdersOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isOrdersOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden ml-6 mt-1 space-y-1"
                >
                  {[
                    { name: "Pending Orders", path: "/admin/orders/pending" },
                    { name: "Delivered Orders", path: "/admin/orders/delivered" },
                    { name: "Terminated", path: "/admin/orders/terminated" },
                  ].map((subItem) => (
                    <Link
                      key={subItem.path}
                      href={subItem.path}
                      className={`block px-6 py-3 rounded-xl text-[13px] font-bold transition-all ${pathname === subItem.path ? "text-[#007FFF] bg-[#007FFF]/10" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[
            { name: "Products", icon: <ShoppingBag size={20} />, path: "/admin/products" },
            { name: "Categories", icon: <Layers size={20} />, path: "/admin/categories" },
            { name: "Customers", icon: <Users size={20} />, path: "/admin/customers" },
            { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${pathname === item.path ? "bg-[#007FFF] text-white shadow-lg" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-8">
          <button onClick={handleLogout} className="flex items-center gap-4 text-gray-400 hover:text-red-400 font-bold text-sm transition-colors uppercase tracking-widest cursor-pointer">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
          <button className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-xl" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="hidden md:block">
            <h1 className="text-[#001B3D] font-black uppercase text-xs tracking-widest">Console Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/orders/pending" className="relative p-2 text-gray-400 hover:text-[#001B3D] transition-colors">
              <Bell size={22} />
              {pendingCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-black border-2 border-white px-1 animate-pulse">
                  {pendingCount > 9 ? "9+" : pendingCount}
                </span>
              )}
            </Link>
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-[#007FFF] font-black text-xs border border-blue-200 uppercase">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;