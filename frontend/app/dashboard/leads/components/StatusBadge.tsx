"use client";

import React from "react";

const STATUS_CONFIG: Record<string, { label: string, color: string }> = {
  new: { label: "New", color: "bg-slate-100 text-slate-700 border-slate-200" },
  contacted: { label: "Contacted", color: "bg-blue-50 text-blue-700 border-blue-100" },
  qualified: { label: "Qualified", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  proposal: { label: "Proposal", color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  closed_won: { label: "Closed Won", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  closed_lost: { label: "Closed Lost", color: "bg-rose-50 text-rose-700 border-rose-100" },
};

export default function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || { label: status, color: "bg-slate-50 text-slate-700 border-slate-100" };
  
  return (
    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${config.color} uppercase tracking-wider`}>
      {config.label}
    </span>
  );
}
