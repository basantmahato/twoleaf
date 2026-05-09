"use client";

import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "TwoLeaf transformed our legacy systems into a high-performance cloud infrastructure. Their architectural precision is unmatched.",
      author: "Sarah Jenkins",
      role: "CTO, Quantum Systems",
      company: "QUANTUM",
    },
    {
      quote: "The AI integration they built for us has automated 60% of our data workflow. A game-changer for our business scaling.",
      author: "Michael Chen",
      role: "Director of Innovation",
      company: "NEURAL CORE",
    },
    {
      quote: "Minimalist design paired with powerful backend logic. They don't just build websites; they build digital assets.",
      author: "David Ross",
      role: "Founder, Apex Digital",
      company: "APEX",
    }
  ];

  return (
    <section className="py-32 px-8 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-baseline mb-24">
          <h2 className="text-5xl font-bold uppercase tracking-tight">
            Client <span className="text-[#00b4ff]">Verticals</span>
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-[#64748b]">04 / TRUST</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="space-y-8 p-10 rounded-[2.5rem] bg-[#f8fafc] border-[1px] border-[#e2e8f0] hover:border-[#00b4ff] transition-all duration-500 group"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="text-6xl font-black text-[#00b4ff] opacity-20 leading-none h-8 italic group-hover:opacity-100 transition-opacity duration-500">"</div>
              <p className="text-lg font-medium text-[#1e293b] leading-relaxed italic">
                {t.quote}
              </p>
              <div className="pt-8 border-t border-[#e2e8f0] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-black">{t.author}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#00b4ff] mt-1">{t.role}</p>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#cbd5e1]">{t.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
