"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export default function StatCard({ title, value, change, isPositive, icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-100">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
          <span className={`text-xs font-bold ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
}
