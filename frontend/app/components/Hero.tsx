"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to("#hero-label", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
      })
        .to(
          "#hero-title",
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
          },
          "-=0.7"
        )
        .to(
          "#hero-content",
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.8"
        )
        .to(
          "#hero-graphic",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "expo.out",
          },
          "-=1"
        );

      // Rotate the inner diamond of the graphic slightly on load
      gsap.fromTo(
        "#hero-graphic .rotate-45",
        { rotate: 0, scale: 0.8 },
        { rotate: 45, scale: 1, duration: 2, ease: "expo.out", delay: 1.2 }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="min-h-screen flex flex-col justify-center px-8 md:px-12 pt-32 pb-16 overflow-hidden relative bg-dot-pattern"
    >
      {/* Decorative gradient blur */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00b4ff15] rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#00b4ff10] rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-8 gsap-reveal" id="hero-label">
          <span className="font-label-caps text-xs uppercase border-l-2 border-[#00b4ff] pl-4 font-semibold tracking-widest text-[#64748b]">
            Digital Agency
          </span>
        </div>
        <h1
          className="text-5xl md:text-8xl font-bold uppercase mb-12 max-w-5xl gsap-reveal leading-none tracking-tighter"
          id="hero-title"
        >
          Building the <br />
          <span className="text-[#00b4ff]">Future</span> of Tech.
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-xl gsap-reveal" id="hero-content">
            <p className="text-lg md:text-xl text-[#64748b] mb-12 leading-relaxed">
              We are a premier digital agency crafting 
              <span className="text-black font-medium"> high-performance software</span>, 
              integrated AI systems, and bespoke web experiences that drive growth.
            </p>
            <div className="flex flex-wrap gap-6">
              <a 
                href="#services"
                className="bg-[#00b4ff] text-white px-10 py-5 font-label-caps text-xs uppercase tracking-[0.2em] hover:bg-black transition-all duration-500 rounded-full shadow-lg shadow-[#00b4ff20] font-bold"
              >
                OUR SERVICES
              </a>
              <a 
                href="#portfolio"
                className="border-2 border-black px-10 py-5 font-label-caps text-xs uppercase tracking-[0.2em] hover:bg-[#00b4ff] hover:border-[#00b4ff] hover:text-white transition-all duration-500 rounded-full font-bold"
              >
                VIEW WORK
              </a>
            </div>
          </div>
          <div
            className="w-full md:w-1/3 aspect-square border-[1px] border-[#e2e8f0] bg-white p-8 relative group gsap-reveal shadow-2xl shadow-[#00b4ff05] rounded-3xl"
            id="hero-graphic"
          >
            <div className="w-full h-full bg-[#00b4ff] flex items-center justify-center overflow-hidden rounded-2xl relative">
              <div className="w-2/3 h-2/3 border-2 border-white rotate-45 group-hover:rotate-90 transition-transform duration-1000"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-full h-px bg-white"></div>
                <div className="h-full w-px bg-white absolute"></div>
              </div>
              {/* Floating elements for modern look */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full blur-sm group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/10 rounded-full blur-md group-hover:scale-125 transition-transform duration-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
