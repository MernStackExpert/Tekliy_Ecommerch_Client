"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function FacebookPixelTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}