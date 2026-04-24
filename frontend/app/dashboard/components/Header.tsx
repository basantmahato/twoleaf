"use client";

import React from "react";
import { useAuthStore } from "../../store/authStore";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function DashboardHeader({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const { user } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 md:hidden"
          title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {/* Search removed - non-functional */}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">{user?.name}</p>
            <p className="text-[11px] font-medium text-slate-500 uppercase mt-1">Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
