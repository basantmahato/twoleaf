"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase,
  LogOut,
  X
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuthStore();
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col md:relative ${
        isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20"
      }`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Image 
              src="/logocp.JPG" 
              alt="Logo" 
              width={32} 
              height={32} 
              className="rounded-lg object-contain shrink-0"
            />
            {(isOpen) && <span className="font-bold text-slate-900 tracking-tight text-lg">TwoLeaf</span>}
          </div>
          <button 
            onClick={onClose}
            title="Close Sidebar"
            className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <div className={`${isOpen ? "px-2 mb-2" : "md:hidden"}`}>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Main</span>
          </div>
          
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={pathname === "/dashboard"} 
            isSidebarOpen={isOpen} 
            href="/dashboard" 
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Leads" 
            active={pathname.startsWith("/dashboard/leads")} 
            isSidebarOpen={isOpen} 
            href="/dashboard/leads" 
          />
          <SidebarItem 
            icon={<Briefcase size={20} />} 
            label="Projects" 
            active={pathname.startsWith("/dashboard/projects")} 
            isSidebarOpen={isOpen} 
            href="/dashboard/projects" 
          />
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <button 
            onClick={logout}
            title="Logout"
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 transition-colors group"
          >
            <LogOut size={20} className="group-hover:text-red-600 transition-colors" />
            {(isOpen) && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ icon, label, active = false, isSidebarOpen, href }: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  isSidebarOpen: boolean; 
  href: string 
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
        active
          ? "bg-indigo-50 text-indigo-700 font-bold"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 font-medium"
      }`}
    >
      <span className={`${active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"} transition-colors shrink-0`}>
        {icon}
      </span>
      {(isSidebarOpen) && <span className="text-sm tracking-tight">{label}</span>}
      {active && isSidebarOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>}
    </Link>
  );
}
