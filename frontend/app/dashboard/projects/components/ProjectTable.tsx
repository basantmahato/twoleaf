"use client";

import React from "react";
import { Pencil, Trash2, Calendar, DollarSign, User, Eye } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../../store/authStore";
import { toast } from "sonner";
import { TableRowSkeleton } from "../../components/Skeleton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

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
}

interface ProjectTableProps {
  projects: Project[];
  loading: boolean;
  onEdit: (project: Project) => void;
  onView: (project: Project) => void;
}

const STATUS_COLORS: Record<string, string> = {
  ongoing: "bg-blue-50 text-blue-700 border-blue-100",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  on_hold: "bg-amber-50 text-amber-700 border-amber-100",
  cancelled: "bg-rose-50 text-rose-700 border-rose-100",
};

function Progress({ value }: { value: number }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.width = `${Math.min(value, 100)}%`;
    }
  }, [value]);

  return (
    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
      <div 
        ref={ref}
        className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
      />
    </div>
  );
}

export function ProjectTable({ projects, loading, onEdit, onView }: ProjectTableProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`${API_URL}/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Project Details</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Client</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Financials</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Timeline</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <TableRowSkeleton key={i} columns={6} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Project Details</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Client</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Financials</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Timeline</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                  No projects found.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900 uppercase tracking-tight">{project.title}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                        project.priority === 'high' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                        project.priority === 'medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-slate-50 text-slate-600 border-slate-100'
                      }`}>
                        {project.priority} Prio
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-600">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      <User size={14} className="text-slate-400" />
                      {project.lead?.name || "Unknown"}
                    </div>
                    {project.lead?.company && (
                      <div className="text-xs text-slate-400 mt-0.5">{project.lead.company}</div>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${STATUS_COLORS[project.status]}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-sm font-black text-slate-900">
                      <DollarSign size={14} className="text-emerald-500" />
                      {project.totalAmount.toLocaleString()}
                    </div>
                    <Progress value={project.totalAmount > 0 ? (project.advancePaid / project.totalAmount) * 100 : 0} />
                    <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
                      Advance: ${project.advancePaid.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(project.startDate).toLocaleDateString()}
                    </div>
                    {project.deadline && (
                      <div className="text-[10px] font-bold text-rose-500 mt-1 uppercase">
                        Due: {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 transition-opacity">
                      <button 
                        onClick={() => onView(project)}
                        title="View Details"
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => onEdit(project)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Project"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this project?")) {
                            deleteMutation.mutate(project._id);
                          }
                        }}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
