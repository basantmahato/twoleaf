"use client";

import React from "react";
import { X, Briefcase, User, Calendar, DollarSign, Activity, FileText, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  lead: {
    _id: string;
    name: string;
    company?: string;
  };
  status: string;
  priority: string;
  totalAmount: number;
  advancePaid: number;
  startDate: string;
  deadline?: string;
  description?: string;
}

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const STATUS_CONFIG: Record<string, { color: string, label: string, icon: any }> = {
  ongoing: { color: "bg-blue-50 text-blue-700 border-blue-100", label: "ONGOING", icon: Activity },
  completed: { color: "bg-emerald-50 text-emerald-700 border-emerald-100", label: "COMPLETED", icon: CheckCircle2 },
  on_hold: { color: "bg-amber-50 text-amber-700 border-amber-100", label: "ON HOLD", icon: Clock },
  cancelled: { color: "bg-rose-50 text-rose-700 border-rose-100", label: "CANCELLED", icon: AlertTriangle },
};

export default function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsModalProps) {
  if (!isOpen || !project) return null;

  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.ongoing;
  const progress = project.totalAmount > 0 ? (project.advancePaid / project.totalAmount) * 100 : 0;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-3xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header Section */}
        <div className="relative h-40 bg-indigo-600 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          
          <div className="absolute top-6 right-6">
            <button 
              onClick={onClose}
              className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/10"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>

          <div className="absolute bottom-8 left-12 right-12 flex justify-between items-end">
            <div className="space-y-1">
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-[0.2em] bg-white text-indigo-600`}>
                Project File
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight uppercase leading-tight">
                {project.title}
              </h2>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white`}>
              <status.icon size={16} />
              <span className="text-xs font-black uppercase tracking-widest">{status.label}</span>
            </div>
          </div>
        </div>

        <div className="py-12 px-12 space-y-10">
          <div className="grid grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="col-span-7 space-y-10">
              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <FileText size={14} /> Project Scope & Overview
                </h3>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                    {project.description || "No detailed description provided for this project."}
                  </p>
                </div>
              </div>

              {/* Client Info */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <User size={14} /> Client Identity
                </h3>
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{project.lead?.name}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                      {project.lead?.company || "Personal Client"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="col-span-5 space-y-8">
              {/* Financials Card */}
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100/20">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Budget</span>
                    <DollarSign size={16} className="text-emerald-400" />
                  </div>
                  <div className="text-4xl font-black leading-none">
                    <span className="text-emerald-400 text-2xl mr-1">$</span>
                    {project.totalAmount.toLocaleString()}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-slate-400">Advance Paid</span>
                      <span className="text-white">${project.advancePaid.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="text-right text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                      {Math.round(progress)}% Realized
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Info */}
              <div className="space-y-6 px-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Started On</p>
                    <p className="text-sm font-bold text-slate-700">{new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500`}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Target Deadline</p>
                    <p className="text-sm font-bold text-slate-700">{project.deadline ? new Date(project.deadline).toLocaleDateString() : "TBD"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600`}>
                    <Activity size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Project Priority</p>
                    <p className="text-sm font-bold text-slate-700 uppercase">{project.priority}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4">
            <button 
              onClick={onClose}
              className="w-full bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              Close Project Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
