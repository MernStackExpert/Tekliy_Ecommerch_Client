"use client";
import React, { useEffect, useState } from "react";
import { 
  Plus, Trash2, HelpCircle, Search, 
  X, Save, Loader2, MessageSquare, 
  ChevronDown, ChevronUp, Clock 
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  
  const [formData, setFormData] = useState({ question: "", ans: "" });

  const fetchFaqs = async () => {
    try {
      const res = await axiosInstance.get("/faqs");
      setFaqs(res.data);
    } catch (error) {
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      await axiosInstance.post("/faqs", formData);
      toast.success("New FAQ added!");
      setFormData({ question: "", ans: "" });
      setIsModalOpen(false);
      fetchFaqs();
    } catch (error) {
      toast.error("Failed to add FAQ");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete FAQ?",
      text: "This question will be removed from your site!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007FFF",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: "rounded-[2.5rem]" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/faqs/${id}`);
          toast.success("FAQ deleted");
          fetchFaqs();
        } catch (error) {
          toast.error("Delete failed");
        }
      }
    });
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#001B3D] uppercase tracking-tighter">
            System <span className="text-[#007FFF]">FAQs</span>
          </h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">
            Manage customer help center questions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
          <div className="relative flex-1">
            <input 
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 pl-14 text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#007FFF] transition-all"
            />
            <Search className="absolute left-5 top-4 text-gray-300 w-5 h-5" />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#001B3D] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-[#007FFF] transition-all shadow-lg shadow-blue-900/10"
          >
            <Plus size={18} /> Add FAQ
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-[#007FFF]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredFaqs.map((faq) => (
            <div key={faq._id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden transition-all">
              <div 
                onClick={() => setExpandedId(expandedId === faq._id ? null : faq._id)}
                className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-[#007FFF] rounded-xl flex items-center justify-center shrink-0">
                    <HelpCircle size={20} />
                  </div>
                  <h3 className="text-[#001B3D] font-bold text-sm tracking-tight">{faq.question}</h3>
                </div>
                <div className="flex items-center gap-4">
                   <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(faq._id); }}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                   >
                     <Trash2 size={18} />
                   </button>
                   {expandedId === faq._id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                </div>
              </div>

              <AnimatePresence>
                {expandedId === faq._id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 pt-0"
                  >
                    <div className="pl-14">
                      <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-gray-500 text-sm leading-relaxed">{faq.ans}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-[9px] font-black uppercase text-gray-300 tracking-widest">
                        <Clock size={12} />
                        Added on {new Date(faq.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <MessageSquare className="mx-auto text-gray-200 mb-4" size={48} />
              <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">No FAQs found</p>
            </div>
          )}
        </div>
      )}

      {/* Add FAQ Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} 
              className="absolute inset-0 bg-[#001B3D]/70 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="bg-[#001B3D] p-8 text-white flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter">Add New FAQ</h3>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mt-1">Store Knowledge Base</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">The Question</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder="e.g. How long does shipping take?" 
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#007FFF]" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">The Answer</label>
                  <textarea 
                    required 
                    rows="5"
                    value={formData.ans}
                    onChange={(e) => setFormData({ ...formData, ans: e.target.value })}
                    placeholder="Provide a detailed answer here..." 
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-[#007FFF] resize-none" 
                  />
                </div>

                <button 
                  disabled={btnLoading}
                  type="submit" 
                  className="w-full bg-[#007FFF] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#001B3D] transition-all disabled:opacity-50 shadow-xl shadow-blue-500/20"
                >
                  {btnLoading ? <Loader2 className="animate-spin" /> : <><Save size={18}/> Save Question</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQPage;