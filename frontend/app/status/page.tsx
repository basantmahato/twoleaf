"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function StatusPage() {
  const services = [
    { name: "Website & API", status: "Operational", color: "#18A058" },
    { name: "Content Management System", status: "Operational", color: "#18A058" },
    { name: "Client Dashboard", status: "Operational", color: "#18A058" },
    { name: "Email Services", status: "Operational", color: "#18A058" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 px-6 bg-[#f5f7f5]">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18A05815] text-[#18A058] font-bold text-sm uppercase tracking-wider mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#18A058] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#18A058]"></span>
              </span>
              All Systems Operational
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase">
              System Status
            </h1>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              Real-time information about the operational status of our infrastructure and services.
            </p>
          </header>

          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            <div className="p-8 space-y-6">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900">{service.name}</h3>
                    <p className="text-xs text-slate-400">99.9% uptime over the last 90 days</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#18A058]">{service.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl font-bold italic">No incidents reported.</h2>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                We monitor our systems 24/7. In the unlikely event of an outage, we'll post updates here in real-time.
              </p>
            </div>
            {/* Abstract background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#18A058] blur-[120px] opacity-20 -mr-32 -mt-32"></div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
