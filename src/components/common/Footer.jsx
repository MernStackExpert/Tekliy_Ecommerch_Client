import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaPhoneAlt, 
  FaRegEnvelope, 
  FaPaperPlane 
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#001B3D] text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        <div className="space-y-6">
          <Link href="/">
            <Image 
              src="/TEKLIY.jpeg" 
              alt="TEKLIY" 
              width={140} 
              height={50} 
              className="brightness-125" 
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Experience the future of technology with TEKLIY. Your premier destination for high-end gadgets and innovative electronics.
          </p>
          <div className="flex items-center gap-4">
            {[
              { Icon: FaFacebookF, href: "#" },
              { Icon: FaInstagram, href: "#" },
              { Icon: FaTwitter, href: "#" },
              { Icon: FaYoutube, href: "#" }
            ].map((social, i) => (
              <Link 
                key={i} 
                href={social.href} 
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#007FFF] hover:scale-110 transition-all duration-300 border border-white/10"
              >
                <social.Icon className="text-lg" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-black mb-6 uppercase tracking-wider text-[#007FFF]">Quick Links</h4>
          <ul className="space-y-4">
            {["Home", "Shop All", "Trending", "New Arrivals", "Track Order"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all inline-block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#007FFF]"></span> {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-black mb-6 uppercase tracking-wider text-[#007FFF]">Support</h4>
          <ul className="space-y-4">
            {["Privacy Policy", "Terms & Conditions", "Refund Policy", "Contact Us", "Help Center"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all inline-block">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-black mb-6 uppercase tracking-wider text-[#007FFF]">Newsletter</h4>
          <p className="text-gray-400 text-sm">Subscribe to get special offers and once-in-a-lifetime deals.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 outline-none focus:border-[#007FFF] transition-all text-sm"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-[#007FFF] px-4 rounded-lg hover:bg-[#0052CC] transition-all flex items-center justify-center">
              <FaPaperPlane className="text-white text-xs" />
            </button>
          </div>
          <div className="flex flex-col gap-3 pt-2">
             <div className="flex items-center gap-3 text-sm text-gray-400">
                <FaPhoneAlt className="text-[#007FFF]" /> <span>+880 1908 716502</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-gray-400">
                <FaRegEnvelope className="text-[#007FFF]" /> <span>mdnirob30k@gmail.com</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-gray-400">
                <MdLocationOn className="text-[#007FFF] text-lg" /> <span>Rajshahi, Bangladesh</span>
             </div>
          </div>
        </div>

      </div>

      <div className="max-w-[1440px] mx-auto px-4 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-500 text-xs">
          © 2026 <span className="text-[#007FFF] font-bold">TEKLIY</span>. All Rights Reserved. Designed by <span className="text-white">MD NIROB ISLAM</span>
        </p>
        
        <div className="flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" className="h-6" />
          <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Mastercard" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-6" />
          <img src="https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg" alt="bKash" className="h-10" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;