"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Calendar, DollarSign, Briefcase, FileText } from "lucide-react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../store/authStore";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface Project {
  _id?: string;
  title: string;
  lead: string;
  status: string;
  priority: string;
  totalAmount: number;
  advancePaid: number;
  deadline?: string;
  description?: string;
}

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any | null;
}

export function ProjectFormModal({ 
  isOpen, 
  onClose, 
  initialData 
}: ProjectFormModalProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Project>();

  // Fetch leads for the dropdown
  const { data: leadsData } = useQuery({
    queryKey: ["all-leads"],
    queryFn: async () => {
      const res = await apiFetch(`${API_URL}/leads?limit=100`);
      const result = await res.json();
      return result.leads;
    },
    enabled: isOpen
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        lead: initialData.lead?._id || initialData.lead,
        deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : ""
      });
    } else {
      reset({
        title: "", lead: "", status: "ongoing", priority: "medium", totalAmount: 0, advancePaid: 0, description: ""
      });
    }
  }, [initialData, reset, isOpen]);

  const mutation = useMutation({
    mutationFn: async (data: Project) => {
      const url = initialData ? `${API_URL}/projects/${initialData._id}` : `${API_URL}/projects`;
      const method = initialData ? "PUT" : "POST";
      const res = await apiFetch(url, {
        method,
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save project");
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(initialData ? "Project updated" : "Project created");
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Briefcase size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                {initialData ? "Edit Project" : "Create New Project"}
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Project details & financials</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            title="Close Modal"
            aria-label="Close Modal"
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Project Title</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  {...register("title", { required: "Title is required" })}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-bold text-slate-700"
                  placeholder="E.G. WEBSITE REDESIGN"
                />
              </div>
            </div>

            {/* Lead Select */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Client (Lead)</label>
              <select 
                {...register("lead", { required: "Lead is required" })}
                className="w-full px-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-bold text-slate-700 uppercase tracking-wide appearance-none"
                title="Select Lead"
              >
                <option value="">Select a Client</option>
                {leadsData?.map((lead: any) => (
                  <option key={lead._id} value={lead._id}>{lead.name} ({lead.company || 'Personal'})</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
              <select 
                {...register("status")}
                className="w-full px-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-bold text-slate-700 uppercase tracking-wide appearance-none"
                title="Status"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Financials: Total Amount */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Amount ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="number"
                  {...register("totalAmount", { required: true, min: 0 })}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            {/* Financials: Advance Paid */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Advance Paid ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="number"
                  {...register("advancePaid", { min: 0 })}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Priority</label>
              <select 
                {...register("priority")}
                className="w-full px-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-bold text-slate-700 uppercase tracking-wide appearance-none"
                title="Priority"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Deadline</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="date"
                  {...register("deadline")}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            {/* Description */}
            <div className="col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Project Description</label>
              <textarea 
                {...register("description")}
                rows={3}
                className="w-full px-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-medium text-slate-700 resize-none"
                placeholder="Details about scope, tech stack, etc."
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all border-2 border-slate-100"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={mutation.isPending}
              className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
            >
              {mutation.isPending ? "SAVING..." : initialData ? "UPDATE PROJECT" : "CREATE PROJECT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
