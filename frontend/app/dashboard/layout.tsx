"use client";

import React, { useState, useEffect } from "react";
import RouteGuard from "../components/RouteGuard";
import DashboardSidebar from "./components/Sidebar";
import DashboardHeader from "./components/Header";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  // Adjust sidebar based on initial screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize(); // Set initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <RouteGuard>
      <div className="flex h-screen overflow-hidden bg-[#fbfcfd] font-sans">
        <DashboardSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <DashboardHeader 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            isSidebarOpen={isSidebarOpen}
          />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#fbfcfd]">
            <div className="max-w-[1600px] mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
