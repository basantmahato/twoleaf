"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Services from "../components/Services";

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="bg-[#f5f7f5] py-20 px-6">
           <div className="max-w-7xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase">
                Our Services
              </h1>
              <p className="text-[#6b7280] font-medium max-w-xl mx-auto">
                Comprehensive digital solutions tailored to accelerate your business growth.
              </p>
           </div>
        </div>
        <Services />
      </main>
      <Footer />
    </>
  );
}
