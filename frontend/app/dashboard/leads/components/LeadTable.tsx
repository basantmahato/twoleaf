"use client";

import React from "react";
import { Mail, Phone, Building2, Pencil, Trash2, Briefcase, Eye } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { apiFetch } from "../../../store/authStore";
import { toast } from "sonner";
import { TableRowSkeleton } from "../../components/Skeleton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface Lead {
  _id: string;
  leadId?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  source: string;
  value: number;
  notes?: string;
}

interface LeadTableProps {
  leads: Lead[];
  loading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "bg-slate-100 text-slate-700 border-slate-200" },
  { value: "contacted", label: "Contacted", color: "bg-blue-50 text-blue-700 border-blue-100" },
  { value: "qualified", label: "Qualified", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { value: "proposal", label: "Proposal", color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  { value: "closed_won", label: "Closed Won", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { value: "closed_lost", label: "Closed Lost", color: "bg-rose-50 text-rose-700 border-rose-100" },
];

export default function LeadTable({ leads, loading, onEdit, onDelete }: LeadTableProps) {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const res = await apiFetch(`${API_URL}/leads/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success(`Status updated to ${data.status.toUpperCase()}`);
    },
    onError: () => {
      toast.error("Failed to update status");
    }
  });

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <tbody className="divide-y divide-slate-100">
            {[...Array(5)].map((_, i) => (
              <TableRowSkeleton key={i} columns={6} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-20">ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lead Info</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-slate-400">#{lead.leadId || '—'}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-tight">{lead.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-slate-400">
                        <div className="flex items-center gap-1">
                          <Mail size={12} />
                          <span className="text-[11px] font-medium truncate max-w-[120px]">{lead.email}</span>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1">
                            <Phone size={12} />
                            <span className="text-[11px] font-medium">{lead.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {lead.company ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                        <Building2 size={12} />
                      </div>
                      <span className="text-sm font-semibold text-slate-600">{lead.company}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-300 font-medium">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-900">${lead.value?.toLocaleString() || '0'}</span>
                </td>
                <td className="px-6 py-4">
                  <select
                    title="Change Status"
                    value={lead.status}
                    onChange={(e) => updateStatusMutation.mutate({ id: lead._id, status: e.target.value })}
                    disabled={updateStatusMutation.isPending}
                    className={`px-4 py-1.5 text-[11px] font-bold rounded-full border uppercase tracking-wider outline-none cursor-pointer transition-all min-w-[130px] text-center ${
                      STATUS_OPTIONS.find(o => o.value === lead.status)?.color || "bg-slate-50 border-slate-100"
                    }`}
                  >
                    {STATUS_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value} className="bg-white text-slate-900 font-bold">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => onView(lead)}
                        title="View Details"
                        className="p-2 hover:bg-white hover:text-indigo-600 hover:shadow-sm rounded-lg transition-all text-slate-400"
                      >
                        <Eye size={16} />
                      </button>
                      {(lead.status === 'closed_won' || lead.status === 'qualified') && (
                        <Link
                          href={`/dashboard/projects?leadId=${lead._id}`}
                          title="Convert to Project"
                          className="p-2 hover:bg-white hover:text-emerald-600 hover:shadow-sm rounded-lg transition-all text-slate-400"
                        >
                          <Briefcase size={16} />
                        </Link>
                      )}
                      <button 
                        onClick={() => onEdit(lead as any)} 
                        title="Edit Lead"
                        className="p-2 hover:bg-white hover:text-indigo-600 hover:shadow-sm rounded-lg transition-all text-slate-400"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(lead._id)} 
                        title="Delete Lead"
                        className="p-2 hover:bg-white hover:text-rose-600 hover:shadow-sm rounded-lg transition-all text-slate-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
