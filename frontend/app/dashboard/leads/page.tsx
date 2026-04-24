"use client";

import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../store/authStore";
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import LeadTable from "./components/LeadTable";
import LeadFormModal from "./components/LeadFormModal";
import LeadDetailsModal from "./components/LeadDetailsModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  source: string;
  value: number;
  notes?: string;
  createdAt?: string;
}

export default function LeadsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editLead, setEditLead] = useState<Lead | null>(null);

  const handleView = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetails(true);
  };

  // Fetch Leads with React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["leads", page, statusFilter, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (statusFilter) params.set("status", statusFilter);
      if (searchTerm) params.set("search", searchTerm);
      
      const res = await apiFetch(`${API_URL}/leads?${params}`);
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result;
    }
  });

  // Create/Update Mutation
  const saveMutation = useMutation({
    mutationFn: async (formData: any) => {
      const url = editLead ? `${API_URL}/leads/${editLead._id}` : `${API_URL}/leads`;
      const method = editLead ? "PUT" : "POST";
      const res = await apiFetch(url, { method, body: JSON.stringify(formData) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      setShowForm(false);
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`${API_URL}/leads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete lead");
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    }
  });

  const handleEdit = (lead: Lead) => {
    setEditLead(lead);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      deleteMutation.mutate(id);
    }
  };

  const openCreate = () => {
    setEditLead(null);
    setShowForm(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lead Pipeline</h1>
          <p className="text-sm text-slate-500 font-medium">Manage and track your customer acquisition process.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
        >
          <Plus size={16} />
          Add New Lead
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email or company..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter size={16} className="text-slate-400 mr-1 shrink-0" />
          {["", "new", "contacted", "qualified", "proposal", "closed_won", "closed_lost"].map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                statusFilter === s
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900"
              }`}
            >
              {s || "All Leads"}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <LeadTable 
        leads={data?.leads || []} 
        loading={isLoading} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onView={handleView}
      />

      {/* Pagination */}
      {data && data.pages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 pt-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Showing Page {page} of {data.pages}
          </p>
          <div className="flex items-center gap-2">
            <button 
              title="Previous Page"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
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
      <LeadFormModal 
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        initialData={editLead}
      />

      <LeadDetailsModal 
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        lead={selectedLead}
      />
    </div>
  );
}
