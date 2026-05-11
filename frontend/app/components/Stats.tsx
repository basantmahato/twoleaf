"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── Animated counter hook ── */
function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ── Stat card ── */
function StatCard({
  icon,
  value,
  suffix = "",
  label,
}: {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
}) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-[#18A05815] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-[#1a1a2e] leading-tight">
          {count.toLocaleString()}
          {suffix}
        </div>
        <div className="text-xs text-[#6b7280] mt-0.5">{label}</div>
      </div>
    </div>
  );
}

/* ── Stats icons ── */
const MembersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#18A058" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ProjectsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#18A058" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);
const YearsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#18A058" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const RateIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#18A058" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

export default function Stats() {
  return (
    <div>
      {/* ── Section 1: Heading + Stats grid ── */}
      <section className="bg-white py-20 px-6 md:px-10 border-y border-[#e5e7eb]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] leading-snug mb-3">
              Helping businesses grow<br />
              <span className="text-[#18A058]">through smart technology</span>
            </h2>
            <p className="text-sm text-[#6b7280] leading-relaxed max-w-sm">
              We've reached these milestones through hard work, dedication, 
              and an unwavering commitment to our clients' success.
            </p>
          </div>

          {/* Right: 2×2 stats grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8">
            <StatCard icon={<MembersIcon />} value={10}  suffix="+" label="Happy Clients" />
            <StatCard icon={<ProjectsIcon />} value={12} suffix="+" label="Projects Delivered" />
            <StatCard icon={<YearsIcon />}    value={3}  suffix="+" label="Years Experience" />
            <StatCard icon={<RateIcon />}     value={99} suffix="%" label="Success Rate" />
          </div>
        </div>
      </section>

      {/* ── Section 2: Illustration + text ── */}
      <section className="bg-[#f9fafb] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: Illustration */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[380px]">
              <Image
                src="/stats-illustration.png"
                alt="TwoLeaf digital solutions in action"
                width={380}
                height={340}
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>
          </div>

          {/* Right: text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] leading-snug mb-5">
              How we build solutions <br />that actually work
            </h2>
            <p className="text-sm text-[#6b7280] leading-relaxed mb-3">
              At TwoLeaf, every project begins with a deep understanding of your business goals. 
              We architect digital solutions—from custom web apps to AI-powered workflows—that 
              are engineered for performance, scale, and long-term value.
            </p>
            <p className="text-sm text-[#6b7280] leading-relaxed mb-8">
              Our agile process ensures transparency at every stage: from wireframe to 
              deployment, you always know what we're building and why. No black boxes, 
              no surprises—just clean, measurable results.
            </p>
            <Link
              href="/start-project"
              className="inline-block bg-[#18A058] text-white text-sm font-semibold px-7 py-3 rounded-md hover:bg-[#15803d] transition-all duration-300 shadow-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
