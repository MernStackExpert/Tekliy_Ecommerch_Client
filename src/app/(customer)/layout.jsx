import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import FloatingSupport from "@/components/common/FloatingSupport";

export const metadata = {
  title: {
    default: "TEKLIY | Premium Tech Shop in Bangladesh",
    template: "%s | TEKLIY",
  },
  description:
    "Explore the best gadgets, electronics, and tech accessories at TEKLIY. High-quality products with fast delivery across Bangladesh.",
  keywords: [
    "e-commerce",
    "tech shop",
    "gadgets",
    "electronics",
    "Bangladesh",
    "online shopping",
  ],
  authors: [{ name: "MD NIROB ISLAM" }],
  openGraph: {
    title: "TEKLIY | Premium Tech Shop",
    description: "Your ultimate destination for premium tech and gadgets.",
    url: "https://tekliy.com",
    siteName: "TEKLIY",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEKLIY | Premium Tech Shop",
    description: "Premium tech products at your doorstep.",
  },
};

export default function CustomerLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {children}
        <FloatingSupport />
      </main>

      <Footer />
    </div>
  );
}
