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
      budget: "₹10k - ₹50k"
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
      <div className="min-h-screen bg-white flex flex-col bg-dot-pattern relative overflow-hidden">
        {/* Decorative gradient blur */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00b4ff15] rounded-full blur-[120px] -z-10" />
        
        <Header />
        <main className="flex-1 flex items-center justify-center p-8 relative z-10">
          <div className="max-w-md text-center space-y-8">
            <div className="w-24 h-24 bg-[#00b4ff] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#00b4ff30]">
              <ChevronRight className="text-white w-12 h-12" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase text-black">Request <span className="text-[#00b4ff]">Received.</span></h1>
            <p className="text-[#64748b] font-medium leading-relaxed">
              Our architectural team has received your project details. We'll review your requirements and get back to you within 24-48 hours with a preliminary assessment.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-black text-white px-12 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#00b4ff] transition-all rounded-full shadow-lg"
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
    <div className="min-h-screen bg-white flex flex-col bg-dot-pattern relative overflow-hidden">
      {/* Decorative gradient blurs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00b4ff10] rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#00b4ff08] rounded-full blur-[100px] -z-10" />

      <Header />
      
      <main className="flex-1 pt-40 pb-24 px-8 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold text-[#64748b] hover:text-[#00b4ff] transition-all mb-16 uppercase tracking-[0.2em] group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
            <div className="md:col-span-5 space-y-10">
              <div className="space-y-6">
                <span className="text-[10px] font-bold text-[#00b4ff] uppercase tracking-[0.4em] block">Inquiry Phase</span>
                <h1 className="text-6xl font-black tracking-tighter uppercase leading-none text-black">
                  Let's Build <br /> Something <br /> <span className="text-[#00b4ff]">Great.</span>
                </h1>
              </div>
              <p className="text-[#64748b] font-medium leading-relaxed max-w-sm text-lg">
                Share your vision with us. From enterprise software to integrated AI systems, we provide the architectural precision your project requires.
              </p>
            </div>

            <div className="md:col-span-7 bg-white border border-[#e2e8f0] p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-black/[0.03]">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                {mutation.isError && (
                  <div className="bg-red-50 text-red-600 p-5 text-[10px] font-bold uppercase tracking-widest border border-red-100 rounded-2xl">
                    Submission Error: {mutation.error.message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4 group">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest group-focus-within:text-[#00b4ff] transition-colors">Your Name</label>
                    <input 
                      {...register("name", { required: true })}
                      placeholder="e.g. John Doe" 
                      className="w-full border-0 border-b border-[#e2e8f0] bg-transparent py-4 text-sm font-bold focus:ring-0 focus:border-[#00b4ff] transition-all outline-none text-black placeholder:text-[#cbd5e1]"
                    />
                  </div>
                  <div className="space-y-4 group">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest group-focus-within:text-[#00b4ff] transition-colors">Email Address</label>
                    <input 
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder="e.g. john@company.com" 
                      type="email"
                      className="w-full border-0 border-b border-[#e2e8f0] bg-transparent py-4 text-sm font-bold focus:ring-0 focus:border-[#00b4ff] transition-all outline-none text-black placeholder:text-[#cbd5e1]"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4 group">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest group-focus-within:text-[#00b4ff] transition-colors">Company Name</label>
                    <input 
                      {...register("company")}
                      placeholder="e.g. Acme Corp" 
                      className="w-full border-0 border-b border-[#e2e8f0] bg-transparent py-4 text-sm font-bold focus:ring-0 focus:border-[#00b4ff] transition-all outline-none text-black placeholder:text-[#cbd5e1]"
                    />
                  </div>
                  <div className="space-y-4 group">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest group-focus-within:text-[#00b4ff] transition-colors">Project Type</label>
                    <select 
                      {...register("type", { required: true })}
                      title="Project Type"
                      defaultValue=""
                      className="w-full border-0 border-b border-[#e2e8f0] bg-transparent py-4 text-sm font-bold focus:ring-0 focus:border-[#00b4ff] transition-all outline-none text-black appearance-none"
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

                <div className="space-y-6">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest">Project Budget</label>
                  <div className="flex flex-wrap gap-4">
                    {["< ₹10k", "₹10k - ₹50k", "₹50k - ₹100k", "₹100k+"].map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setValue("budget", budget)}
                        className={`px-6 py-3 border text-[10px] font-bold uppercase tracking-widest transition-all rounded-full ${
                          selectedBudget === budget 
                          ? "bg-[#00b4ff] text-white border-[#00b4ff] shadow-lg shadow-[#00b4ff20]" 
                          : "border-[#e2e8f0] text-[#64748b] hover:border-[#00b4ff] hover:text-[#00b4ff]"
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 group">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest group-focus-within:text-[#00b4ff] transition-colors">Project Details</label>
                  <textarea 
                    {...register("details", { required: true })}
                    rows={4}
                    placeholder="Tell us about your requirements, goals, and timeline..."
                    className="w-full border-0 border-b border-[#e2e8f0] bg-transparent py-4 text-sm font-medium focus:ring-0 focus:border-[#00b4ff] transition-all outline-none resize-none text-black placeholder:text-[#cbd5e1]"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-[#00b4ff] text-white py-6 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-black transition-all duration-500 rounded-full shadow-xl shadow-[#00b4ff20] disabled:opacity-50"
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
