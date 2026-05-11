"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="bg-[#f5f7f5] py-20 px-6">
           <div className="max-w-7xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase">
                Contact Us
              </h1>
              <p className="text-[#6b7280] font-medium max-w-xl mx-auto">
                Have a project in mind? Let's talk about how we can help you grow.
              </p>
           </div>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
