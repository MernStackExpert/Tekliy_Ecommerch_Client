import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import FacebookPixelTracker from "@/components/common/FacebookPixelTracker";

export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://tekliy.com"),
  title: "TEKLIY | Premium Tech Shop",
  description: "Best electronics and gadgets in Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2088533182067138');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <FacebookPixelTracker />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2088533182067138&ev=PageView&noscript=1"
            alt="facebook-pixel"
          />
        </noscript>

        <CartProvider>
          <Toaster position="top-center" />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
