import React from "react";
import axios from "axios";
import ContactClient from "@/components/customer/Contact/ContactClient";

const ContactPage = async () => {
  let shopInfo = {
    phone: "+880 1709243323",
    email: "info.tekliy@gmail.com",
    address: "87/899, Bibir Pukur Par Road Barishal Sadar, Barishal 8200 Bangladesh, 8200",
    whatsapp: "+880 1709243323",
    officeTime: "Sat - Thu, 10:00 AM - 8:00 PM"
  };

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shop-info`);
    if (res.data) shopInfo = res.data;
  } catch (error) {
    console.error("Error fetching shop info:", error.message);
  }

  return (
    <main className="min-h-screen bg-white">
      <ContactClient shopInfo={shopInfo} />
    </main>
  );
};

export default ContactPage;