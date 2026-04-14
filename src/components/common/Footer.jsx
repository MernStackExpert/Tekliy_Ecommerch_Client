"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaRegEnvelope,
  FaPaperPlane,
  FaGithub,
  FaLinkedinIn,
  FaCode,
  FaGlobe,
} from "react-icons/fa";
import { MdLocationOn, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  const [text, setText] = useState("MD NIROB SARKAR");

  const original = "MD NIROB SARKAR";
  const binaryChars = ["0", "1"];

  const handleHover = () => {
    let iterations = 0;

    const interval = setInterval(() => {
      setText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return original[index];
            }
            return binaryChars[Math.floor(Math.random() * 2)];
          })
          .join(""),
      );

      if (iterations >= original.length) {
        clearInterval(interval);
      }

      iterations += 1 / 2;
    }, 40);
  };

  const skills = [
    {
      name: "React",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Node.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "MongoDB",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Next.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Tailwind",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "SEO",
      img: "https://cdn-icons-png.flaticon.com/512/1055/1055644.png",
    },
  ];

  return (
    <footer className="bg-[#001B3D] text-white pt-16 pb-8 border-t border-white/5 relative">
      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link href="/">
            <Image
              src="/TEKLIY-3.png"
              alt="TEKLIY"
              width={140}
              height={50}
              className="brightness-125"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Experience the future of technology with TEKLIY. Your premier
            destination for high-end gadgets and innovative electronics.
          </p>
          <div className="flex items-center gap-4">
            {[
              {
                Icon: FaFacebookF,
                href: "https://www.facebook.com/share/17Ny6spMjr/",
              },
              // { Icon: FaInstagram, href: "#" },
              // { Icon: FaTwitter, href: "#" },
              // { Icon: FaYoutube, href: "#" }
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                target="blank"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#007FFF] hover:scale-110 transition-all duration-300 border border-white/10"
              >
                <social.Icon className="text-lg" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-black mb-6 uppercase tracking-wider text-[#007FFF]">
            Quick Links
          </h4>
          <ul className="space-y-4">
            {[
              "Home",
              "Shop All",
              "Trending",
              "New Arrivals",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="/shop"
                  className="text-gray-400 hover:text-white hover:translate-x-2 transition-all inline-block flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#007FFF]"></span>{" "}
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-black mb-6 uppercase tracking-wider text-[#007FFF]">
            Support
          </h4>
          <ul className="space-y-4">
            {[
              "Privacy Policy",
              "Terms & Conditions",
              "Refund Policy",
              "Contact Us",
              "Help Center",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white hover:translate-x-2 transition-all inline-block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-black mb-6 uppercase tracking-wider text-[#007FFF]">
            Newsletter
          </h4>
          <p className="text-gray-400 text-sm">
            Subscribe to get special offers and once-in-a-lifetime deals.
          </p>
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
              <FaPhoneAlt className="text-[#007FFF]" />{" "}
              <span>+8801709243323</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <FaRegEnvelope className="text-[#007FFF]" />{" "}
              <span>info.tekliy@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <MdLocationOn className="text-[#007FFF] text-lg" />{" "}
              <span>
                87/899, Bibir Pukur Par Road Barishal Sadar, Barishal 8200
                Bangladesh, 8200
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-500 text-xs">
          © 2026 <span className="text-[#007FFF] font-bold">TEKLIY</span>. All
          Rights Reserved. Designed by
          <button
            onMouseEnter={handleHover}
            onClick={() => setIsDevModalOpen(true)}
            className="text-white ml-1 font-bold hover:text-[#007FFF] transition-all duration-300 underline decoration-[#007FFF]/30 underline-offset-4 cursor-pointer"
          >
            {text}
          </button>
        </p>

        <div className="flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
            alt="Visa"
            className="h-6"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
            alt="Mastercard"
            className="h-6"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="Paypal"
            className="h-6"
          />
          <img
            src="https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg"
            alt="bKash"
            className="h-10"
          />
        </div>
      </div>

      {/* Developer Information Modal */}
      <AnimatePresence>
        {isDevModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDevModalOpen(false)}
              className="absolute inset-0 bg-[#001B3D]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#001B3D] border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
            >
              {/* Header/Cover */}
              <div className="h-32 bg-gradient-to-r from-[#007FFF] to-[#001B3D] relative">
                <button
                  onClick={() => setIsDevModalOpen(false)}
                  className="absolute top-4 right-4 bg-white/10 p-2 rounded-full hover:bg-red-500 transition-colors"
                >
                  <MdClose size={20} />
                </button>
              </div>

              {/* Profile Image & Content */}
              <div className="px-8 pb-10 text-center">
                <div className="relative -mt-16 mb-4 flex justify-center">
                  <div className="w-32 h-32 rounded-3xl bg-[#001B3D] border-4 border-[#001B3D] shadow-xl overflow-hidden">
                    <img
                      src="https://github.com/MernStackExpert.png"
                      alt="Md Nirob Sarkar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tighter">
                  Md Nirob Sarkar
                </h3>
                <p className="text-[#007FFF] font-black uppercase text-[10px] tracking-[0.3em] mb-4">
                  Full Stack Developer & SEO Expert
                </p>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed italic">
                  "Building high-performance web applications with a focus on
                  modern user experience and search engine dominance."
                </p>

                {/* Skills Icons */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {skills.map((skill) => (
                    <div key={skill.name} className="group relative">
                      <img
                        src={skill.img}
                        alt={skill.name}
                        className="w-8 h-8 grayscale group-hover:grayscale-0 transition-all duration-300"
                        title={skill.name}
                      />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold opacity-0 group-hover:opacity-100 text-[#007FFF] transition-opacity uppercase whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Social & Contact Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Link
                    href="https://github.com/MernStackExpert"
                    target="_blank"
                    className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl hover:bg-[#007FFF] transition-all group"
                  >
                    <FaGithub size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">
                      Github
                    </span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/mdnirobsarkar/"
                    target="_blank"
                    className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl hover:bg-[#007FFF] transition-all group"
                  >
                    <FaLinkedinIn size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">
                      LinkedIn
                    </span>
                  </Link>
                  <Link
                    href="https://www.facebook.com/MernStackExpert"
                    target="_blank"
                    className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl hover:bg-[#007FFF] transition-all group"
                  >
                    <FaFacebookF size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">
                      Facebook
                    </span>
                  </Link>
                  {/* Email Button */}
                  <Link
                    href="mailto:mdnirob30k@gmail.com"
                    className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl hover:bg-[#007FFF] transition-all group border border-white/5"
                  >
                    <FaRegEnvelope size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">
                      Email
                    </span>
                  </Link>
                </div>
              </div>

              {/* Footer Bar */}
              <div className="bg-white/5 py-4 flex justify-center gap-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-[9px] font-bold text-gray-500 uppercase">
                  <FaCode className="text-[#007FFF]" /> MERN STACK
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold text-gray-500 uppercase">
                  <FaGlobe className="text-[#007FFF]" /> SEO EXPERT
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
