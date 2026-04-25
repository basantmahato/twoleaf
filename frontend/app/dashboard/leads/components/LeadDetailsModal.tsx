"use client";

import React from "react";
import { X, User, Mail, Phone, Building2, Calendar, Target, FileText, DollarSign, ExternalLink, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

import { Lead } from "../types";

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

const STATUS_CONFIG: Record<string, { color: string, label: string }> = {
  new: { color: "bg-blue-50 text-blue-700 border-blue-100", label: "NEW INQUIRY" },
  contacted: { color: "bg-amber-50 text-amber-700 border-amber-100", label: "CONTACTED" },
  qualified: { color: "bg-indigo-50 text-indigo-700 border-indigo-100", label: "QUALIFIED" },
  proposal: { color: "bg-purple-50 text-purple-700 border-purple-100", label: "PROPOSAL SENT" },
  closed_won: { color: "bg-emerald-50 text-emerald-700 border-emerald-100", label: "CLOSED WON" },
  closed_lost: { color: "bg-rose-50 text-rose-700 border-rose-100", label: "CLOSED LOST" },
};

export default function LeadDetailsModal({ isOpen, onClose, lead }: LeadDetailsModalProps) {
  const router = useRouter();
  if (!isOpen || !lead) return null;

  const status = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;

  const handleConvertToProject = () => {
    router.push(`/dashboard/projects?leadId=${lead._id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header Section */}
        <div className="relative h-32 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent" />
          <div className="absolute top-6 right-6">
            <button 
              onClick={onClose}
              className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/10"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
          <div className="absolute -bottom-10 left-12">
            <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-indigo-600 border-4 border-white">
              <User size={40} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="pt-16 pb-10 px-12 space-y-8">
          {/* Identity & Status */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                {lead.name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${status.color}`}>
                  {status.label}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  ID: #{lead.leadId || lead._id?.slice(-4).toUpperCase() || 'TEMP'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Value</p>
              <div className="text-3xl font-black text-slate-900 flex items-center justify-end">
                <span className="text-emerald-500 mr-1">$</span>
                {lead.value.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Mail size={16} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Email Address</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{lead.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Phone size={16} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Phone Number</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{lead.phone || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Building2 size={16} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Company</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{lead.company || "Personal / Individual"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Acquisition Info */}
            <div className="space-y-6">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Acquisition</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Target size={16} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Lead Source</p>
                    <p className="text-sm font-bold text-slate-700 uppercase tracking-tight">{lead.source.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Calendar size={16} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Inquiry Date</p>
                    <p className="text-sm font-bold text-slate-700">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString(undefined, { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                      }) : "Date unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>


            {/* Notes Section */}
            <div className="col-span-2 space-y-4">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2 flex items-center gap-2">
                <FileText size={14} /> Lead Notes & Project Details
              </h3>
              <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-wrap italic">
                  {lead.notes || "No additional notes provided for this lead."}
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 flex gap-4">
            {lead.status !== 'closed_won' && !lead.projectId && (
              <button 
                onClick={handleConvertToProject}
                className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                <Briefcase size={16} />
                Convert to Project
              </button>
            )}
            <button 
              onClick={onClose}
              className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
            >
              Done Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
