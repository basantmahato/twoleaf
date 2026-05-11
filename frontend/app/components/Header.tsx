"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home",      href: "/" },
  { label: "Services",  href: "/#services" },
  { label: "About",     href: "/#about" },
  { label: "Blog",      href: "/blog" },
  { label: "Contact",   href: "/#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isStartProject = pathname === "/start-project";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm py-3" : "bg-white py-4"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logofav.png"
              alt="TwoLeaf logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-[18px] font-bold text-[#1a1a2e] group-hover:text-[#18A058] transition-colors duration-300 tracking-tight">
              TWOLEAF SERVICES
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  (link.href === pathname || (link.href !== "/" && pathname.startsWith(link.href.split("#")[0])))
                    ? "text-[#18A058]"
                    : "text-[#4b5563] hover:text-[#18A058]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* <Link
              href="/#contact"
              className="text-sm font-semibold text-[#18A058] hover:text-[#15803d] transition-colors duration-200"
            >
              Login
            </Link> */}
            {!isStartProject && (
              <Link
                href="/start-project"
                className="text-sm font-semibold bg-[#18A058] text-white px-5 py-2 rounded-md hover:bg-[#15803d] transition-all duration-300 shadow-sm"
              >
                Start a Project
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[#4b5563] hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-white z-[60] flex flex-col pt-24 pb-10 px-8 gap-6 transition-transform duration-400 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-2">
          <Image src="/logofav.png" alt="TwoLeaf logo" width={28} height={28} className="object-contain" />
          <span className="text-lg font-bold text-[#1a1a2e]">TwoLeaf</span>
        </div>

        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-2xl font-bold text-[#1a1a2e] hover:text-[#18A058] transition-colors border-b border-gray-100 pb-4"
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/start-project"
          className="mt-4 text-center text-sm font-bold bg-[#18A058] text-white px-6 py-4 rounded-lg hover:bg-[#15803d] transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          Start a Project
        </Link>
      </div>
    </>
  );
}
