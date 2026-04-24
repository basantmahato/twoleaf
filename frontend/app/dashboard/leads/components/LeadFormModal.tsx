"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Pencil, Plus, AlertCircle, DollarSign } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../../store/authStore";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface Lead {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  source: string;
  value: number;
  notes?: string;
}

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Lead | null;
}

export default function LeadFormModal({ 
  isOpen, 
  onClose, 
  initialData 
}: LeadFormModalProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Lead>({
    defaultValues: initialData || {
      name: "", email: "", phone: "", company: "", status: "new", source: "website", value: 0, notes: "",
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: Partial<Lead>) => {
      const url = initialData ? `${API_URL}/leads/${initialData._id}` : `${API_URL}/leads`;
      const method = initialData ? "PUT" : "POST";
      const res = await apiFetch(url, {
        method,
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save lead");
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success(initialData ? "Lead updated successfully" : "New lead created successfully");
      onClose();
    },
    onError: () => {
      toast.error("An error occurred. Please try again.");
    }
  });

  useEffect(() => {
    if (initialData) reset(initialData);
    else reset({ name: "", email: "", phone: "", company: "", status: "new", source: "website", value: 0, notes: "" });
  }, [initialData, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              {initialData ? <Pencil size={20} /> : <Plus size={20} />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">{initialData ? "Edit Lead Details" : "Create New Lead"}</h2>
              <p className="text-xs text-slate-500 font-medium">Please fill in the information below.</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            title="Close Modal"
            className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="flex-1 overflow-y-auto p-8 space-y-6">
          {mutation.isError && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold p-4 rounded-xl flex items-center gap-2">
              <AlertCircle size={16} />
              An error occurred. Please try again.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Full Name</label>
              <input 
                {...register("name", { required: true })}
                placeholder="e.g. John Doe"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
              <input 
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                type="email"
                placeholder="john@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Phone Number</label>
              <input 
                {...register("phone")}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Company Name</label>
              <input 
                {...register("company")}
                placeholder="Acme Corp"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Estimated Value</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  {...register("value", { valueAsNumber: true })}
                  type="number"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none font-medium"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Lead Source</label>
              <select 
                {...register("source")}
                title="Lead Source"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-slate-700"
              >
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
                <option value="email">Email Campaign</option>
                <option value="cold_call">Cold Call</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Current Status</label>
            <select 
              {...register("status")}
              title="Status"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-slate-700"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="closed_won">Closed Won</option>
              <option value="closed_lost">Closed Lost</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Internal Notes</label>
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="Add any relevant information about this lead..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none font-medium"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={mutation.isPending} 
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
            >
              {mutation.isPending ? "Saving..." : initialData ? "Update Lead" : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
