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
      className="min-h-screen flex flex-col justify-center px-8 md:px-12 pt-32 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-8 gsap-reveal" id="hero-label">
          <span className="font-label-caps text-xs uppercase border-l-2 border-black pl-4">
            Digital Agency
          </span>
        </div>
        <h1
          className="text-5xl md:text-8xl font-bold uppercase mb-12 max-w-5xl gsap-reveal leading-none tracking-tighter"
          id="hero-title"
        >
          Building the <br />
          Future of Tech.
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-xl gsap-reveal" id="hero-content">
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              We are an digital agency. We design and build
              high-performance software, integrated AI systems, Website and Mobile Apps.
            </p>
            <div className="flex gap-4">
              {/* <button className="bg-black text-white px-8 py-4 font-label-caps text-xs uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all">
                VIEW OUR WORK
              </button> */}
              <a 
                href="#services"
                className="border-2 border-black px-8 py-4 font-label-caps text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all inline-block"
              >
                OUR SERVICES
              </a>
            </div>
          </div>
          <div
            className="w-full md:w-1/3 aspect-square border-2 border-black p-4 relative group gsap-reveal"
            id="hero-graphic"
          >
            <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
              <div className="w-2/3 h-2/3 border-2 border-white rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-full h-px bg-white"></div>
                <div className="h-full w-px bg-white absolute"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
