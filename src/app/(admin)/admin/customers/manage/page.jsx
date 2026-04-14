"use client";
import React, { useEffect, useState } from "react";
import { 
  Search, Eye, Trash2, UserCheck, ShieldAlert, 
  Loader2, Mail, Phone, Calendar, X, ShieldCheck 
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/admin/all-users"); 
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = async (id, data) => {
    try {
      await axiosInstance.patch(`/admin/update-status/${id}`, data);
      toast.success("User updated successfully");
      fetchUsers();
      if (selectedUser) setSelectedUser(null);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
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
          <h2 className="text-3xl font-black text-[#001B3D] uppercase tracking-tighter">Manage <span className="text-[#007FFF]">Users</span></h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Control access & permissions</p>
        </div>
        <div className="relative max-w-md w-full">
          <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 pl-14 text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#007FFF]" />
          <Search className="absolute left-5 top-4 text-gray-300 w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">User Info</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Role</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={user.img} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-gray-100" />
                      <div>
                        <p className="text-[#001B3D] font-bold text-sm">{user.name}</p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${user.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => setSelectedUser(user)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-[#007FFF] hover:text-white transition-all"><Eye size={18} /></button>
                      
                      {user.status === "pending" && (
                        <button onClick={() => handleUpdate(user._id, { status: "active" })} className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"><UserCheck size={18} /></button>
                      )}

                      <button 
                        onClick={() => handleUpdate(user._id, { role: user.role === 'admin' ? 'user' : 'admin' })}
                        className={`p-3 rounded-xl transition-all ${user.role === 'admin' ? 'bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white' : 'bg-gray-50 text-gray-400 hover:bg-purple-600 hover:text-white'}`}
                        title="Toggle Admin Role"
                      >
                        <ShieldCheck size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div onClick={() => setSelectedUser(null)} className="absolute inset-0 bg-[#001B3D]/70 backdrop-blur-md" />
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl relative z-10 overflow-hidden">
            <div className="bg-[#001B3D] p-8 text-white flex justify-between items-center">
              <h3 className="text-xl font-black uppercase tracking-tighter">User Profile</h3>
              <button onClick={() => setSelectedUser(null)} className="hover:bg-white/10 p-2 rounded-full"><X size={20}/></button>
            </div>
            <div className="p-10 text-center space-y-6">
              <img src={selectedUser.img} className="w-32 h-32 rounded-full mx-auto border-4 border-gray-50 object-cover shadow-lg" alt="" />
              <div>
                <h4 className="text-2xl font-black text-[#001B3D]">{selectedUser.name}</h4>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">{selectedUser.role} • {selectedUser.status}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl space-y-4 text-left">
                <div className="flex items-center gap-4"><Mail className="text-[#007FFF]" size={18} /><span className="text-sm font-bold text-gray-600">{selectedUser.email}</span></div>
                <div className="flex items-center gap-4"><Phone className="text-[#007FFF]" size={18} /><span className="text-sm font-bold text-gray-600">{selectedUser.phone}</span></div>
                <div className="flex items-center gap-4"><Calendar className="text-[#007FFF]" size={18} /><span className="text-sm font-bold text-gray-600">Joined: {new Date(selectedUser.createdAt).toLocaleDateString()}</span></div>
              </div>
              {selectedUser.status === "pending" && (
                <button onClick={() => handleUpdate(selectedUser._id, { status: "active" })} className="w-full bg-green-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-200">Approve Access</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;