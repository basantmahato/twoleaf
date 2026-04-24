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
      className="py-32 px-8 md:px-12 bg-white"
      data-aos="fade-up"
      data-aos-duration="800"
      id="contact"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-baseline mb-24">
          <h2 className="text-5xl font-bold uppercase tracking-tight">
            Contact Us
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">03 / CONTACT</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5 space-y-12" data-aos="fade-right">
            <p className="text-3xl font-bold uppercase leading-tight tracking-tight">
              HAVE A CHALLENGE THAT REQUIRES ARCHITECTURAL PRECISION?
            </p>
            <div className="space-y-6">
              <div className="group cursor-pointer">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  EMAIL US
                </div>
                <div className="text-2xl font-bold border-b-2 border-transparent group-hover:border-black transition-all inline-block">
                 twoleafservices@gmail.com
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  VISIT STUDIO
                </div>
                <div className="text-xl font-bold border-b-2 border-transparent group-hover:border-black transition-all inline-block uppercase leading-relaxed">
                  Sahara garden city, Adityapur-2, <br />
                  Jamshedpur, Jharkhand - 832109 <br />
                  Flat no: Raspberry - 1442
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-7" data-aos="fade-left">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative">
                  <input
                    {...register("name", { required: true })}
                    className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black py-4 text-xs font-bold uppercase tracking-widest bg-transparent transition-all peer"
                    placeholder="YOUR NAME"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black peer-focus:w-full transition-all duration-300"></div>
                </div>
                <div className="relative">
                  <input
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black py-4 text-xs font-bold uppercase tracking-widest bg-transparent transition-all peer"
                    placeholder="EMAIL ADDRESS"
                    type="email"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black peer-focus:w-full transition-all duration-300"></div>
                </div>
              </div>
              <div className="relative">
                <select 
                  {...register("type", { required: true })}
                  defaultValue="" 
                  title="Project Type" 
                  className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black py-4 text-xs font-bold uppercase tracking-widest bg-transparent appearance-none transition-all"
                >
                  <option disabled value="">
                    PROJECT TYPE
                  </option>
                  <option value="SOFTWARE DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                  <option value="AI INTEGRATION">AI INTEGRATION</option>
                  <option value="CLOUD SOLUTIONS">CLOUD SOLUTIONS</option>
                  <option value="OTHER">OTHER</option>
                </select>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black peer-focus:w-full transition-all duration-300"></div>
              </div>
              <div className="relative">
                <textarea
                  {...register("notes", { required: true })}
                  className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-black py-4 text-xs font-bold uppercase tracking-widest bg-transparent transition-all peer resize-none"
                  placeholder="TELL US ABOUT THE PROJECT"
                  rows={4}
                ></textarea>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black peer-focus:w-full transition-all duration-300"></div>
              </div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full md:w-auto bg-black text-white px-16 py-6 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all disabled:opacity-50"
              >
                {mutation.isPending ? "SENDING..." : "GET IN TOUCH"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
