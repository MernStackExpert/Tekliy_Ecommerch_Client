import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://tekliy.com'), 
  title: "TEKLIY | Premium Tech Shop",
  description: "Best electronics and gadgets in Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          <Toaster position="top-center" />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}