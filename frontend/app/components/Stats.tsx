"use client";

import React from "react";

export default function Stats() {
  const stats = [
    { label: "Projects Completed", value: "12+" },
    { label: "Years Experience", value: "05+" },
    { label: "Global Clients", value: "10+" },
    { label: "Success Rate", value: "99%" },
  ];

  return (
    <section className="bg-white py-24 border-y-[1px] border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center md:items-start space-y-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <span className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-[#00b4ff]">
                {stat.value}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#64748b]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
