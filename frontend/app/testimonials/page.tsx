"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="bg-[#f5f7f5] py-20 px-6">
           <div className="max-w-7xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase">
                Testimonials
              </h1>
              <p className="text-[#6b7280] font-medium max-w-xl mx-auto">
                Hear from the businesses that have achieved exponential growth with our digital expertise.
              </p>
           </div>
        </div>
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
