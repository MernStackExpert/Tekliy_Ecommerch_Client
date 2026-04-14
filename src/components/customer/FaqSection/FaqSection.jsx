import React from "react";
import axios from "axios";
import FaqAccordion from "./FaqAccordion";
import Link from "next/link";

const FaqSection = async () => {
  let faqs = [];
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faqs`);
    faqs = res.data || [];
  } catch (error) {
    console.error("Error:", error.message);
  }

  if (faqs.length === 0) return null;

  return (
    <section className="max-w-[1000px] mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-[#001B3D] tracking-tighter uppercase">
          Frequently Asked <span className="text-[#007FFF]">Questions</span>
        </h2>
        <p className="text-gray-500 font-medium mt-3">Everything you need to know about our products and services</p>
        <div className="w-24 h-1.5 bg-[#007FFF] mt-4 rounded-full mx-auto"></div>
      </div>

      <div className="space-y-4">
        <FaqAccordion faqs={faqs} />
      </div>

      <div className="mt-12 text-center p-8 bg-[#f0f7ff] rounded-[2rem] border border-[#007FFF]/10">
        <p className="text-[#001B3D] font-bold">Still have questions?</p>
        <p className="text-gray-500 text-sm py-5">Can't find the answer you're looking for? Please chat to our friendly team.</p>
        <Link href="/contact" className="mt-5 px-8 py-3 bg-[#001B3D] text-white rounded-xl font-bold hover:bg-[#007FFF] transition-all ">
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default FaqSection;