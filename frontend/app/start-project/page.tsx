"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface ProjectFormData {
  name: string;
  email: string;
  company?: string;
  type: string;
  budget: string;
  details: string;
}

export default function StartProjectPage() {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<ProjectFormData>({
    defaultValues: {
      budget: "$10k - $50k"
    }
  });

  const selectedBudget = watch("budget");

  const mutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const res = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          status: "new",
          source: "start_project_page",
          value: parseInt(data.budget.replace(/[^0-9]/g, "")) || 0,
          notes: `Type: ${data.type} | Budget: ${data.budget} | Details: ${data.details}`
        }),
      });
      if (!res.ok) throw new Error("Failed to submit request");
      return res.json();
    }
  });

  const onSubmit = (data: ProjectFormData) => {
    mutation.mutate(data);
  };

  if (mutation.isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-8">
            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
              <ChevronRight className="text-white w-12 h-12" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase">Request Received.</h1>
            <p className="text-gray-500 font-medium leading-relaxed">
              Our architectural team has received your project details. We'll review your requirements and get back to you within 24-48 hours with a preliminary assessment.
            </p>
            <Link 
              href="/" 
              className="inline-block border-2 border-black px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-20 px-8 md:px-12">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-black transition-all mb-12 uppercase tracking-widest group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] block">Inquiry Phase</span>
                <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">
                  Let's Build <br /> Something <br /> Great.
                </h1>
              </div>
              <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                Share your vision with us. From enterprise software to integrated AI systems, we provide the architectural precision your project requires.
              </p>
            </div>

            <div className="md:col-span-7 bg-[#fbfcfd] border border-gray-100 p-8 md:p-12 shadow-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {mutation.isError && (
                  <div className="bg-red-50 text-red-600 p-4 text-xs font-bold uppercase tracking-widest border border-red-200">
                    Submission Error: {mutation.error.message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your Name</label>
                    <input 
                      {...register("name", { required: true })}
                      placeholder="e.g. John Doe" 
                      className="w-full border-0 border-b border-gray-200 bg-transparent py-3 text-sm font-bold focus:ring-0 focus:border-black transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder="e.g. john@company.com" 
                      type="email"
                      className="w-full border-0 border-b border-gray-200 bg-transparent py-3 text-sm font-bold focus:ring-0 focus:border-black transition-all outline-none"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company Name</label>
                    <input 
                      {...register("company")}
                      placeholder="e.g. Acme Corp" 
                      className="w-full border-0 border-b border-gray-200 bg-transparent py-3 text-sm font-bold focus:ring-0 focus:border-black transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project Type</label>
                    <select 
                      {...register("type", { required: true })}
                      title="Project Type"
                      defaultValue=""
                      className="w-full border-0 border-b border-gray-200 bg-transparent py-3 text-sm font-bold focus:ring-0 focus:border-black transition-all outline-none"
                    >
                      <option value="" disabled>Select Type</option>
                      <option value="software">Software Development</option>
                      <option value="ai">AI Integration</option>
                      <option value="cloud">Cloud Solutions</option>
                      <option value="crm">CRM Implementation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project Budget</label>
                  <div className="flex flex-wrap gap-3">
                    {["< $10k", "$10k - $50k", "$50k - $100k", "$100k+"].map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setValue("budget", budget)}
                        className={`px-4 py-2 border text-[10px] font-bold uppercase tracking-widest transition-all ${
                          selectedBudget === budget 
                          ? "bg-black text-white border-black" 
                          : "border-gray-200 hover:border-black"
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project Details</label>
                  <textarea 
                    {...register("details", { required: true })}
                    rows={4}
                    placeholder="Tell us about your requirements, goals, and timeline..."
                    className="w-full border-0 border-b border-gray-200 bg-transparent py-3 text-sm font-medium focus:ring-0 focus:border-black transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-black text-white py-6 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black border-2 border-black transition-all disabled:opacity-50"
                >
                  {mutation.isPending ? "Processing..." : "Submit Project Request"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
