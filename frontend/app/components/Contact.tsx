"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
interface ContactFormData { name: string; email: string; type: string; notes: string; }
const inputClass = "w-full border border-[#e5e7eb] rounded-lg px-4 py-3 text-sm text-[#1a1a2e] placeholder-[#9ca3af] bg-white focus:outline-none focus:border-[#18A058] transition-colors";

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, status: "new", source: "contact_form", notes: `${data.type}: ${data.notes}` }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      return res.json();
    },
    onSuccess: () => { toast.success("Enquiry Received", { description: "Our team will reach out within 24 hours.", duration: 5000 }); reset(); },
    onError: (error: any) => { toast.error("Submission Failed", { description: error.message }); },
  });

  return (
    <section className="py-20 px-6 md:px-10 bg-white border-t border-[#e5e7eb]" id="contact">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-start mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a2e]">
            Get In <span className="text-[#18A058]">Touch</span>
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-[#9ca3af] mt-2">03 / Contact</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Left info */}
          <div className="md:col-span-2 space-y-8">
            <p className="text-base font-semibold text-[#1a1a2e] leading-snug">
              Have a challenge that requires <span className="text-[#18A058]">digital precision?</span>
            </p>
            <div className="space-y-6">
              <div>
                <div className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-widest mb-1">Email Us</div>
                <a href="mailto:twoleafservices@gmail.com" className="text-sm font-semibold text-[#1a1a2e] hover:text-[#18A058] transition-colors break-all">
                  twoleafservices@gmail.com
                </a>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-widest mb-1">Location</div>
                <div className="text-sm font-semibold text-[#1a1a2e]">Jamshedpur, Jharkhand</div>
              </div>
            </div>
            <div className="p-5 bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] space-y-3">
              {["48-hour response guarantee", "Free initial consultation", "Fixed-price project quotes"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#18A05815] flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="#18A058" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs text-[#4b5563] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="md:col-span-3 bg-white border border-[#e5e7eb] rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-[#6b7280] block mb-1.5">Your Name</label>
                  <input {...register("name", { required: true })} placeholder="e.g. John Doe" className={inputClass} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">Required</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6b7280] block mb-1.5">Email Address</label>
                  <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="e.g. john@company.com" className={inputClass} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">Valid email required</p>}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6b7280] block mb-1.5">Project Type</label>
                <select {...register("type", { required: true })} defaultValue="" title="Project Type" className={inputClass}>
                  <option disabled value="">Select a type...</option>
                  <option value="SOFTWARE DEVELOPMENT">Software Development</option>
                  <option value="AI INTEGRATION">AI Integration</option>
                  <option value="CLOUD SOLUTIONS">Cloud Solutions</option>
                  <option value="DIGITAL MARKETING">Digital Marketing</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6b7280] block mb-1.5">Tell us about the project</label>
                <textarea {...register("notes", { required: true })} placeholder="Describe your project goals, timeline, and requirements..." rows={4} className={`${inputClass} resize-none`} />
              </div>
              <button type="submit" disabled={mutation.isPending}
                className="w-full bg-[#18A058] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#15803d] transition-all duration-300 disabled:opacity-50">
                {mutation.isPending ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
