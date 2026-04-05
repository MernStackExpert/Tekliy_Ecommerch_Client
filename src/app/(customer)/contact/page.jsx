import React from "react";
import axios from "axios";
import ContactClient from "@/components/customer/Contact/ContactClient";

const ContactPage = async () => {
  let shopInfo = {
    phone: "+880 17XX-XXXXXX",
    email: "support@tekliy.com",
    address: "Yusufpur, Rajshahi, Bangladesh",
    whatsapp: "017XXXXXXXX",
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