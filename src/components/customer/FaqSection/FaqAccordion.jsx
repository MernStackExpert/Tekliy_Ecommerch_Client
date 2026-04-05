"use client";
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FaqAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {faqs.map((faq, index) => (
        <div 
          key={faq._id} 
          className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
            openIndex === index 
            ? "border-[#007FFF] bg-white shadow-xl shadow-blue-100" 
            : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
          }`}
        >
          <button
            onClick={() => toggleFaq(index)}
            className="w-full flex items-center justify-between p-5 md:p-6 text-left outline-none"
          >
            <span className={`font-bold text-base md:text-lg transition-colors ${
              openIndex === index ? "text-[#007FFF]" : "text-[#001B3D]"
            }`}>
              {faq.question}
            </span>
            <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
              openIndex === index ? "bg-[#007FFF] text-white rotate-180" : "bg-white text-gray-400"
            }`}>
              {openIndex === index ? <FaMinus size={12} /> : <FaPlus size={12} />}
            </div>
          </button>

          <div 
            className={`transition-all duration-300 ease-in-out ${
              openIndex === index 
              ? "max-h-[500px] opacity-100 pb-6 px-6" 
              : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="h-[1px] bg-gray-100 mb-4 w-full"></div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {faq.ans}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default FaqAccordion;