"use client";

import Image from "next/image";

export default function About() {
  return (
    <section className="py-20 px-6 md:px-10 bg-white border-t border-[#e5e7eb]" id="about">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left: text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] leading-snug mb-6">
            Our Digital <br />
            <span className="text-[#18A058]">Philosophy.</span>
          </h2>
          <div className="space-y-4 text-sm text-[#6b7280] leading-relaxed">
            <p>
              We believe that every pixel and every line of code serves a purpose.
              In the digital age, your brand's presence must be built with the
              same precision, speed, and scalability as the world's leading tech platforms.
            </p>
            <p>
              Our team is comprised of world-class developers and creative
              designers who share a single obsession: growth. We strip away
              the noise to deliver digital solutions that are as elegant as they are
              high-converting.
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-[#e5e7eb] pt-8">
            <div>
              <div className="text-3xl font-bold text-[#1a1a2e] mb-1">12+</div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af]">
                Projects Completed
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1a1a2e] mb-1">05+</div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af]">
                Years Experience
              </div>
            </div>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative">
          <div className="aspect-square border border-[#e5e7eb] p-4 relative overflow-hidden rounded-3xl bg-[#f9fafb] shadow-lg shadow-black/5">
            <Image
              alt="Digital Philosophy — TwoLeaf team"
              className="object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
              src="/about-philosophy.png"
              fill
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-5 -left-5 bg-[#18A058] text-white px-6 py-5 rounded-2xl shadow-lg hidden md:block z-10">
            <div className="text-lg font-bold leading-tight uppercase tracking-tight">
              Uncompromising<br />Standards.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
