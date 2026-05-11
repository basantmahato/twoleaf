"use client";

import Link from "next/link";
import Image from "next/image";


const companyLinks = [
  { label: "About Us",     href: "/about" },
  { label: "Blog",         href: "/blog" },
  { label: "Contact Us",   href: "/contact" },
  { label: "Start Project",href: "/start-project" },
  { label: "Testimonials", href: "/testimonials" },
];

const supportLinks = [
  { label: "Services",      href: "/services" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Status",        href: "/status" },
];

export default function Footer() {


  return (
    <>
      {/* ── Pre-footer CTA ── */}
      <section className="bg-[#f5f7f5] py-20 px-6 md:px-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-6 leading-tight">
          Ready to grow your business <br className="hidden md:block" />
          with digital precision?
        </h2>
        <Link
          href="/start-project"
          className="inline-flex items-center gap-2 bg-[#18A058] text-white text-sm font-semibold px-8 py-3 rounded-md hover:bg-[#15803d] transition-all duration-300 shadow-md shadow-[#18A05830]"
        >
          Start a Project
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

      {/* ── Main Footer ── */}
      <footer className="bg-[#263238] text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Col 1 — Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logofav.png"
                alt="TwoLeaf logo"
                width={28}
                height={28}
                className="object-contain"
              />
              <span className="text-lg font-bold text-white group-hover:text-[#18A058] transition-colors duration-300">
                TwoLeaf
              </span>
            </Link>

            <p className="text-xs text-[#9ca3af] leading-relaxed">
              Copyright © {new Date().getFullYear()} TwoLeaf Services<br />
              All rights reserved.
            </p>

            <div className="space-y-1 pt-2">
              <p className="text-[10px] text-[#6b7280]">Jamshedpur, Jharkhand, India</p>
              <a
                href="mailto:twoleafservices@gmail.com"
                className="text-[10px] text-[#6b7280] hover:text-[#18A058] transition-colors block"
              >
                twoleafservices@gmail.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-1">
              {/* Instagram */}
              <a
                href="https://instagram.com/twoleafservices"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#4b5563] flex items-center justify-center text-[#9ca3af] hover:border-[#18A058] hover:text-[#18A058] transition-all duration-300"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#9ca3af] hover:text-[#18A058] transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#9ca3af] hover:text-[#18A058] transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#37474f]">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6b7280]">
            <span>© {new Date().getFullYear()} TwoLeaf Services. All rights reserved.</span>
            <div className="flex gap-5">
              <Link href="/privacy" className="hover:text-[#18A058] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#18A058] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
