"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Briefcase
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { apiFetch } from "../../store/authStore";
import { ProjectTable } from "@/app/dashboard/projects/components/ProjectTable";
import { ProjectFormModal } from "@/app/dashboard/projects/components/ProjectFormModal";
import ProjectDetailsModal from "./components/ProjectDetailsModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function ProjectsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [editProject, setEditProject] = useState<any>(null);

  const handleView = (project: any) => {
    setSelectedProject(project);
    setShowDetails(true);
  };
  const searchParams = useSearchParams();

  useEffect(() => {
    const leadId = searchParams.get('leadId');
    if (leadId) {
      setEditProject({ lead: leadId });
      setShowForm(true);
    }
  }, [searchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ["projects", page, search, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
        ...(status && { status }),
      });
      const res = await apiFetch(`${API_URL}/projects?${params}`);
      const result = await res.json();
      return result;
    },
  });

  const handleEdit = (project: any) => {
    setEditProject(project);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditProject(null);
    setShowForm(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Projects</h1>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-wider">Manage ongoing client engagements</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {/* Stats Cards (Optional but good) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ongoing</p>
              <h3 className="text-2xl font-black text-slate-900">{data?.total || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search projects..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            className="flex-1 md:w-48 px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm font-bold uppercase tracking-widest text-slate-600 outline-none cursor-pointer"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            title="Filter by Status"
          >
            <option value="">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <ProjectTable 
        projects={data?.data || []} 
        loading={isLoading} 
        onEdit={handleEdit}
        onView={handleView}
      />

      {/* Pagination */}
      {data && data.pages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing Page {page} of {data.pages}
          </p>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              title="Previous Page"
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              title="Next Page"
              disabled={page === data.pages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Form Modal */}
      <ProjectFormModal 
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditProject(null);
        }}
        initialData={editProject}
      />

      <ProjectDetailsModal 
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        project={selectedProject}
      />
    </div>
  );
}
