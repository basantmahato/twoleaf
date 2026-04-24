"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../store/authStore";
import { 
  Users, 
  BarChart3, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Loader2,
  DollarSign
} from "lucide-react";
import StatCard from "./components/StatCard";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface StatItem {
  _id: string;
  count: number;
  totalValue: number;
}

export default function DashboardPage() {
  // Fetch Stats
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await apiFetch(`${API_URL}/leads/stats`);
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.stats as StatItem[];
    }
  });

  // Fetch Recent Leads
  const { data: recentLeadsData, isLoading: leadsLoading } = useQuery({
    queryKey: ["recent-leads"],
    queryFn: async () => {
      const res = await apiFetch(`${API_URL}/leads?limit=5`);
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.leads;
    }
  });

  // Calculate stats from data
  const totalLeads = statsData?.reduce((acc, curr) => acc + curr.count, 0) || 0;
  const closedWon = statsData?.find(s => s._id === "closed_won")?.count || 0;
  const conversionRate = totalLeads > 0 ? ((closedWon / totalLeads) * 100).toFixed(1) : "0.0";
  
  const activeProjects = statsData?.filter(s => ["qualified", "proposal"].includes(s._id))
    .reduce((acc, curr) => acc + curr.count, 0) || 0;
    
  const revenue = statsData?.find(s => s._id === "closed_won")?.totalValue || 0;

  if (statsLoading || leadsLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-sm text-slate-500 font-medium">Monitoring your performance and recent activity.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Leads" value={totalLeads.toLocaleString()} change="Real-time" isPositive={true} icon={<Users className="text-indigo-600" size={20} />} />
        <StatCard title="Conversion Rate" value={`${conversionRate}%`} change="Closed Won" isPositive={true} icon={<TrendingUp className="text-emerald-600" size={20} />} />
        <StatCard title="Active Pipeline" value={activeProjects.toString()} change="Qual/Prop" isPositive={true} icon={<Clock className="text-orange-600" size={20} />} />
        <StatCard title="Revenue" value={`$${revenue.toLocaleString()}`} change="Total Won" isPositive={true} icon={<BarChart3 className="text-blue-600" size={20} />} />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Recent Lead Submissions</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {recentLeadsData?.map((lead: any) => (
            <ActivityItem 
              key={lead._id}
              name={lead.name} 
              email={lead.email} 
              status={lead.status} 
              time={new Date(lead.createdAt).toLocaleDateString()} 
            />
          ))}
          {(!recentLeadsData || recentLeadsData.length === 0) && (
            <div className="px-6 py-12 text-center text-slate-400 text-sm">No recent activity</div>
          )}
        </div>
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200">
          <Link href="/dashboard/leads" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
            View all pipeline activity
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ name, email, status, time }: { name: string; email: string; status: string; time: string }) {
  const getStatusColor = (s: string) => {
    switch(s.toLowerCase()) {
      case 'qualified': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'contacted': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'closed_won': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{name}</p>
          <p className="text-xs font-medium text-slate-500">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(status)} uppercase tracking-wider`}>
          {status}
        </span>
        <span className="text-xs font-medium text-slate-400 w-24 text-right">{time}</span>
      </div>
    </div>
  );
}
