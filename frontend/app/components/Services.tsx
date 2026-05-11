"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface ServiceInfo {
  title: string;
  desc: string;
  icon: React.ReactNode;
  features: string[];
  details: string;
  featured?: boolean;
}

const servicesData: ServiceInfo[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Software Development",
    desc: "Custom enterprise solutions built with architectural integrity.",
    details: "Our software development process focuses on building scalable, high-performance systems tailored to your specific business needs. We use modern tech stacks like React, Node.js, and Go to ensure your application is future-proof and maintainable.",
    features: ["Custom Websites", "Custom Web Apps", "Mobile Ecosystems", "Legacy Modernization"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M12 8v4l3 3" />
        <path d="M3.6 9h16.8M3.6 15h16.8" />
      </svg>
    ),
    title: "AI Integration",
    desc: "Implementing intelligent systems that solve real-world problems.",
    details: "We help businesses leverage Artificial Intelligence to automate workflows and gain insights. From fine-tuning LLMs to deploying computer vision pipelines, our AI solutions are designed to be practical and impactful.",
    features: ["Machine Learning", "Natural Language", "Data Architecture"],
    featured: true,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Digital Marketing",
    desc: "We specialise in high-performance Meta Ads campaigns.",
    details: "Our marketing strategies are data-driven and ROI-focused. We specialise in Meta Ads (Facebook & Instagram) to drive growth, using advanced re-targeting and audience segmentation to maximise your advertising spend.",
    features: ["Facebook Ads", "Instagram Ads", "Re-Targeting Expertise"],
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceInfo | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  return (
    <section className="py-20 px-6 md:px-10 bg-white border-t border-[#e5e7eb]" id="services">
      <div className="max-w-5xl mx-auto">
        {/* Header row */}
        <div className="flex justify-between items-start mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#1a1a2e]">
            OUR <span className="text-[#18A058]">SERVICES</span>
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-[#9ca3af] mt-2">
            01 / Services
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  desc,
  features,
  featured = false,
  onClick,
}: ServiceInfo & { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col gap-6 p-8 rounded-2xl border transition-all duration-300 cursor-pointer
        ${featured
          ? "border-[#18A058] shadow-lg shadow-[#18A05818]"
          : "border-[#e5e7eb] hover:border-[#18A058]"
        }
        hover:bg-[#18A058]
      `}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300
          ${featured
            ? "bg-[#18A058] text-white group-hover:bg-white group-hover:text-[#18A058]"
            : "bg-[#18A05812] text-[#18A058] group-hover:bg-white/20 group-hover:text-white"
          }`}
      >
        {icon}
      </div>

      <h3 className="text-base font-bold uppercase tracking-tight transition-colors duration-300 text-[#1a1a2e] group-hover:text-white">
        {title}
      </h3>

      <p className="text-sm leading-relaxed transition-colors duration-300 text-[#6b7280] group-hover:text-white/85">
        {desc}
      </p>

      <ul className="space-y-2 mt-auto">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0 bg-[#18A058] group-hover:bg-white" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6b7280] group-hover:text-white/85">
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServiceModal({ service, onClose }: { service: ServiceInfo; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      notes: `Interested in: ${service.title}\n\nProject Details:\n${formData.get("notes")}`,
      source: "website",
    };

    try {
      await axios.post(`${API_URL}/leads`, payload);
      toast.success("Inquiry sent successfully! We'll be in touch.");
      onClose();
    } catch (error: any) {
      console.error("Inquiry Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-[#f3f4f6] text-[#6b7280] hover:text-[#1a1a2e] transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12">
          {/* Service Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#18A05815] text-[#18A058] flex items-center justify-center">
              {service.icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1a2e]">
              {service.title}
            </h2>
          </div>

          <p className="text-[#6b7280] leading-relaxed mb-8">
            {service.details}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {service.features.map((f) => (
              <span key={f} className="flex items-center gap-2 px-4 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded-full text-xs font-bold text-[#18A058] uppercase tracking-wider">
                <CheckCircle2 size={14} />
                {f}
              </span>
            ))}
          </div>

          <div className="h-px w-full bg-[#e5e7eb] mb-10" />

          {/* Lead Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-bold text-[#1a1a2e] flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#18A058] rounded-full" />
              Let's get started
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#9ca3af]">Full Name</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#18A058] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#9ca3af]">Email Address</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#18A058] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#9ca3af]">Phone (Optional)</label>
                <input 
                  name="phone"
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#18A058] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#9ca3af]">Company (Optional)</label>
                <input 
                  name="company"
                  type="text" 
                  placeholder="Acme Inc."
                  className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#18A058] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#9ca3af]">Project Description</label>
              <textarea 
                required
                name="notes"
                rows={4}
                placeholder="Tell us about your goals and requirements..."
                className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#18A058] transition-colors resize-none"
              />
            </div>

            <button 
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[#18A058] text-white font-bold py-4 rounded-xl hover:bg-[#15803d] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={18} />
                  Send Inquiry
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
