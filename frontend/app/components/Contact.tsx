"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface ContactFormData {
  name: string;
  email: string;
  type: string;
  notes: string;
}

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          status: "new",
          source: "contact_form",
          notes: `${data.type}: ${data.notes}`
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Enquiry Received", {
        description: "Our team will reach out to you within 24 hours.",
        duration: 5000,
      });
      reset();
    },
    onError: (error: any) => {
      toast.error("Submission Failed", {
        description: error.message
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <section
      className="py-32 px-8 md:px-12 bg-[#f8fafc]"
      data-aos="fade-up"
      data-aos-duration="800"
      id="contact"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-baseline mb-24">
          <h2 className="text-5xl font-bold uppercase tracking-tight">
            Get In <span className="text-[#00b4ff]">Touch</span>
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-[#64748b]">03 / CONTACT</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5 space-y-12" data-aos="fade-right">
            <p className="text-3xl font-bold uppercase leading-tight tracking-tight text-black">
              HAVE A CHALLENGE THAT REQUIRES <span className="text-[#00b4ff]">DIGITAL PRECISION?</span>
            </p>
            <div className="space-y-8">
              <div className="group cursor-pointer max-w-full">
                <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mb-2">
                  EMAIL US
                </div>
                <div className="text-lg md:text-2xl font-bold text-black group-hover:text-[#00b4ff] transition-all duration-300 break-all md:break-normal leading-tight">
                 twoleafservices@gmail.com
                </div>
              </div>
              <div className="group cursor-pointer max-w-full">
                <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mb-2">
                  LOCATION
                </div>
                <div className="text-lg md:text-xl font-bold text-black group-hover:text-[#00b4ff] transition-all duration-300 uppercase leading-relaxed break-words">
                 Jamshedpur, Jharkhand
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5" data-aos="fade-left">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative group">
                  <input
                    {...register("name", { required: true })}
                    className="w-full border-0 border-b-[1px] border-[#e2e8f0] focus:ring-0 focus:border-[#00b4ff] py-4 text-xs font-bold uppercase tracking-widest bg-transparent transition-all peer text-black"
                    placeholder="YOUR NAME"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00b4ff] peer-focus:w-full transition-all duration-500"></div>
                </div>
                <div className="relative group">
                  <input
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    className="w-full border-0 border-b-[1px] border-[#e2e8f0] focus:ring-0 focus:border-[#00b4ff] py-4 text-xs font-bold uppercase tracking-widest bg-transparent transition-all peer text-black"
                    placeholder="EMAIL ADDRESS"
                    type="email"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00b4ff] peer-focus:w-full transition-all duration-500"></div>
                </div>
              </div>
              <div className="relative group">
                <select 
                  {...register("type", { required: true })}
                  defaultValue="" 
                  title="Project Type" 
                  className="w-full border-0 border-b-[1px] border-[#e2e8f0] focus:ring-0 focus:border-[#00b4ff] py-4 text-xs font-bold uppercase tracking-widest bg-transparent appearance-none transition-all text-black"
                >
                  <option disabled value="">
                    PROJECT TYPE
                  </option>
                  <option value="SOFTWARE DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                  <option value="AI INTEGRATION">AI INTEGRATION</option>
                  <option value="CLOUD SOLUTIONS">CLOUD SOLUTIONS</option>
                  <option value="OTHER">OTHER</option>
                </select>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00b4ff] peer-focus:w-full transition-all duration-500"></div>
              </div>
              <div className="relative group">
                <textarea
                  {...register("notes", { required: true })}
                  className="w-full border-0 border-b-[1px] border-[#e2e8f0] focus:ring-0 focus:border-[#00b4ff] py-4 text-xs font-bold uppercase tracking-widest bg-transparent transition-all peer resize-none text-black"
                  placeholder="TELL US ABOUT THE PROJECT"
                  rows={4}
                ></textarea>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00b4ff] peer-focus:w-full transition-all duration-500"></div>
              </div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full md:w-auto bg-[#00b4ff] text-white px-16 py-6 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all duration-500 rounded-full shadow-lg shadow-[#00b4ff20] disabled:opacity-50"
              >
                {mutation.isPending ? "SENDING..." : "SEND ENQUIRY"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
