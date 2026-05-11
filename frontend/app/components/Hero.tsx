"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[88vh] flex items-center bg-[#f5f7f5] pt-20 pb-12 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left: Text Content */}
        <div className="hero-fade-in delay-200">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e] leading-tight mb-4">
            Solutions and results{" "}
            <span className="text-[#18A058] block mt-1">for your business</span>
          </h1>

          <p className="text-[#6b7280] text-base md:text-lg leading-relaxed mb-8 max-w-md">
            We craft high-performance software, integrate intelligent AI systems, 
            and deliver digital marketing campaigns that drive real growth for your business.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/start-project"
              className="inline-block bg-[#18A058] text-white text-sm font-semibold px-8 py-3 rounded-md hover:bg-[#15803d] transition-all duration-300 shadow-md shadow-[#18A05830]"
            >
              Start a Project
            </Link>
            <Link
              href="/#services"
              className="inline-block border border-[#18A058] text-[#18A058] text-sm font-semibold px-8 py-3 rounded-md hover:bg-[#18A058] hover:text-white transition-all duration-300"
            >
              Our Services
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#18A05815] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z" fill="#18A058"/>
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#4b5563]">5★ Client Rating</span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#18A05815] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#18A058" strokeWidth="1.5"/>
                  <path d="M8 5V8.5L10 10" stroke="#18A058" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#4b5563]">5+ Years Experience</span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#18A05815] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L6.5 11.5L13 5" stroke="#18A058" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#4b5563]">12+ Projects Delivered</span>
            </div>
          </div>
        </div>

        {/* Right: Illustration */}
        <div
          className="relative flex justify-center items-center hero-scale-in delay-400"
        >
          {/* Background circle decoration */}
          <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full bg-[#18A05812] -z-0" />
          <div className="absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full bg-[#18A05818] -z-0" />

          <div className="relative z-10 w-full max-w-[480px]">
            <Image
              src="/hero-illustration.png"
              alt="TwoLeaf digital agency - software development and AI integration"
              width={520}
              height={420}
              className="w-full h-auto object-contain drop-shadow-xl"
              priority
            />
          </div>

          {/* Floating stat cards */}
          <div className="absolute top-6 right-0 md:-right-6 z-20 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 hero-fade-in delay-800">
            <div className="w-9 h-9 rounded-full bg-[#18A05815] flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 13L7 9L10 12L15 6" stroke="#18A058" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-xs text-[#9ca3af]">Project Success</div>
              <div className="text-sm font-bold text-[#1a1a2e]">99% Rate</div>
            </div>
          </div>

          <div className="absolute bottom-6 left-0 md:-left-6 z-20 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 hero-fade-in delay-1000">
            <div className="w-9 h-9 rounded-full bg-[#18A05815] flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="6" stroke="#18A058" strokeWidth="2"/>
                <path d="M9 6V9.5L11 11" stroke="#18A058" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="text-xs text-[#9ca3af]">On-time Delivery</div>
              <div className="text-sm font-bold text-[#1a1a2e]">Always</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
