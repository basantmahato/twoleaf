"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
interface ProjectFormData { name: string; email: string; company?: string; type: string; budget: string; details: string; }
const inputClass = "w-full border border-[#e5e7eb] rounded-lg px-4 py-3 text-sm text-[#1a1a2e] placeholder-[#9ca3af] bg-white focus:outline-none focus:border-[#18A058] transition-colors";

export default function StartProjectPage() {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<ProjectFormData>({ defaultValues: { budget: "₹10k - ₹50k" } });
  const selectedBudget = watch("budget");

  const mutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const res = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, company: data.company, status: "new", source: "start_project_page", value: parseInt(data.budget.replace(/[^0-9]/g, "")) || 0, notes: `Type: ${data.type} | Budget: ${data.budget} | Details: ${data.details}` }),
      });
      if (!res.ok) throw new Error("Failed to submit request");
      return res.json();
    },
  });

  if (mutation.isSuccess) {
    return (
      <div className="min-h-screen bg-[#f5f7f5] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-6">
            <div className="w-20 h-20 bg-[#18A058] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#18A05830]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17L4 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#1a1a2e]">Request <span className="text-[#18A058]">Received!</span></h1>
            <p className="text-sm text-[#6b7280] leading-relaxed">
              Our team has received your project details and will review your requirements and get back to you within 24–48 hours.
            </p>
            <Link href="/" className="inline-block bg-[#18A058] text-white text-sm font-semibold px-8 py-3 rounded-lg hover:bg-[#15803d] transition-all">
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7f5] flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#18A058] transition-colors mb-10 group">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
            {/* Left */}
            <div className="md:col-span-2 space-y-6 md:sticky md:top-28">
              <div>
                <span className="text-xs font-bold text-[#18A058] uppercase tracking-widest block mb-3">Inquiry Phase</span>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] leading-snug">
                  Let&apos;s Build <br />Something <br /><span className="text-[#18A058]">Great.</span>
                </h1>
              </div>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Share your vision with us. From enterprise software to integrated AI systems, we provide the architectural precision your project requires.
              </p>

              {/* Checklist */}
              <div className="space-y-3 pt-4">
                {["Free initial consultation", "48-hour response time", "Transparent fixed pricing", "Dedicated project manager"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#18A05815] flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="#18A058" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#4b5563]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right form */}
            <div className="md:col-span-3 bg-white border border-[#e5e7eb] rounded-2xl p-8 shadow-sm">
              <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-6">
                {mutation.isError && (
                  <div className="bg-red-50 text-red-600 p-4 text-sm rounded-lg border border-red-100">
                    {mutation.error?.message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-[#6b7280] block mb-1.5">Your Name *</label>
                    <input {...register("name", { required: true })} placeholder="e.g. John Doe" className={inputClass} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">Required</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#6b7280] block mb-1.5">Email Address *</label>
                    <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="e.g. john@company.com" className={inputClass} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">Valid email required</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-[#6b7280] block mb-1.5">Company Name</label>
                    <input {...register("company")} placeholder="e.g. Acme Corp" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#6b7280] block mb-1.5">Project Type *</label>
                    <select {...register("type", { required: true })} defaultValue="" title="Project Type" className={inputClass}>
                      <option value="" disabled>Select type...</option>
                      <option value="software">Software Development</option>
                      <option value="ai">AI Integration</option>
                      <option value="cloud">Cloud Solutions</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6b7280] block mb-3">Project Budget</label>
                  <div className="flex flex-wrap gap-3">
                    {["< ₹10k", "₹10k - ₹50k", "₹50k - ₹100k", "₹100k+"].map((budget) => (
                      <button key={budget} type="button" onClick={() => setValue("budget", budget)}
                        className={`px-5 py-2 border text-xs font-semibold rounded-lg transition-all ${selectedBudget === budget ? "bg-[#18A058] text-white border-[#18A058]" : "border-[#e5e7eb] text-[#6b7280] hover:border-[#18A058] hover:text-[#18A058]"}`}>
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6b7280] block mb-1.5">Project Details *</label>
                  <textarea {...register("details", { required: true })} rows={4} placeholder="Tell us about your requirements, goals, and timeline..." className={`${inputClass} resize-none`} />
                </div>

                <button type="submit" disabled={mutation.isPending}
                  className="w-full bg-[#18A058] text-white text-sm font-semibold py-3.5 rounded-lg hover:bg-[#15803d] transition-all duration-300 disabled:opacity-50">
                  {mutation.isPending ? "Submitting..." : "Submit Project Request"}
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
