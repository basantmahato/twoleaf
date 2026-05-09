"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../store/authStore";
import { X, Save, AlertCircle, FileText, Link as LinkIcon, Image as ImageIcon, Type, Tag, Layout } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface BlogFormData {
  title: string;
  slug: string;
  subtitle: string;
  content: string;
  image: string;
  tags: string;
  category: string;
  author: string;
  seoTitle: string;
  seoDesc: string;
}

export default function BlogModal({ isOpen, onClose, blog }: { isOpen: boolean; onClose: () => void; blog?: any }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<BlogFormData>();

  // Auto-generate slug from title
  const title = watch("title");
  useEffect(() => {
    if (title && !blog) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setValue("slug", generatedSlug);
    }
  }, [title, blog, setValue]);

  useEffect(() => {
    if (blog) {
      reset({
        ...blog,
        tags: blog.tags.join(", ")
      });
    } else {
      reset({
        title: "",
        slug: "",
        subtitle: "",
        content: "",
        image: "",
        tags: "",
        category: "General",
        author: "TwoLeaf Team",
        seoTitle: "",
        seoDesc: ""
      });
    }
  }, [blog, reset]);

  const mutation = useMutation({
    mutationFn: async (data: BlogFormData) => {
      const payload = {
        ...data,
        tags: data.tags.split(",").map(t => t.trim()).filter(t => t !== "")
      };
      const url = blog ? `${API_URL}/blogs/${blog._id}` : `${API_URL}/blogs`;
      const method = blog ? "PUT" : "POST";
      
      const res = await apiFetch(url, {
        method,
        body: JSON.stringify(payload),
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save blog");
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success(blog ? "Blog updated successfully" : "Blog published successfully");
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[95vh]">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                {blog ? "Edit Insight" : "Publish New Insight"}
              </h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-0.5">
                /{watch("slug") || "url-path"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            title="Close Modal"
            aria-label="Close Modal"
            className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {mutation.isError && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold p-4 rounded-xl flex items-center gap-2">
              <AlertCircle size={16} />
              {mutation.error.message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1 flex items-center gap-2">
                <Type size={12} className="text-indigo-600" />
                Blog Title
              </label>
              <input 
                {...register("title", { required: true })}
                placeholder="The Future of Architecture..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1 flex items-center gap-2">
                <LinkIcon size={12} className="text-indigo-600" />
                URL Slug
              </label>
              <input 
                {...register("slug", { required: true })}
                placeholder="url-friendly-slug"
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none transition-all font-bold text-slate-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Subtitle / Excerpt</label>
            <input 
              {...register("subtitle")}
              placeholder="Short teaser for the listing page..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1 flex items-center gap-2">
                <Layout size={12} className="text-indigo-600" />
                Category
              </label>
              <select 
                {...register("category", { required: true })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
              >
                <option value="General">General</option>
                <option value="Engineering">Engineering</option>
                <option value="AI & Data">AI & Data</option>
                <option value="Cloud">Cloud</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Author</label>
              <input 
                {...register("author")}
                placeholder="Author name"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1 flex items-center gap-2">
                <Tag size={12} className="text-indigo-600" />
                Tags
              </label>
              <input 
                {...register("tags")}
                placeholder="react, cloud, ai"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1 flex items-center gap-2">
              <ImageIcon size={12} className="text-indigo-600" />
              Featured Image Link
            </label>
            <input 
              {...register("image", { required: true })}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Content (Markdown Supported)</label>
            <textarea 
              {...register("content", { required: true })}
              rows={10}
              placeholder="Start writing your masterpiece... Use ### for headings and - for lists."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none font-medium min-h-[300px]"
            ></textarea>
          </div>

          {/* SEO Section */}
          <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-700 flex items-center gap-2">
              <AlertCircle size={14} />
              Search Engine Optimization
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Meta Title</label>
                <input 
                  {...register("seoTitle")}
                  placeholder="SEO optimized title..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Meta Description</label>
                <textarea 
                  {...register("seoDesc")}
                  rows={2}
                  placeholder="Brief summary for Google search results..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none font-medium"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 sticky bottom-0 bg-white py-4 border-t border-slate-100">
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
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {mutation.isPending ? "Saving..." : blog ? "Update Insight" : "Publish Insight"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
