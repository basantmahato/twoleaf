"use client";

import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function FloatingCTA() {
  const pathname = usePathname();
  const whatsappNumber = "918002213907"; // Placeholder: update with real number
  const email = "twoleafservices@gmail.com";

  // Hide CTA on login and dashboard routes
  if (pathname === "/login" || pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      {/* WhatsApp CTA */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} fill="white" />
        <span className="absolute right-full mr-4 px-3 py-1.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
          Chat with us
        </span>
      </a>

      {/* Mail CTA */}
      <a
        href={`mailto:${email}`}
        className="group relative flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-lg"
        title="Send an Email"
      >
        <Mail size={24} />
        <span className="absolute right-full mr-4 px-3 py-1.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
          Email us
        </span>
      </a>
    </div>
  );
}
