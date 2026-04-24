import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = ["Services", "About", "Contact", "Blog"];

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-sm">
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 w-full">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logocp.JPG" 
            alt="TwoLeaf Logo" 
            width={40} 
            height={40} 
            className="rounded-lg object-contain"
          />
          <span className="text-2xl font-black tracking-tighter text-black">
            TWOLEAF SERVICES
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12">
          {menuItems.map((item) => (
            <Link
              key={item}
              className="font-inter font-medium uppercase tracking-widest text-sm text-gray-500 hover:text-black transition-all"
              href={item === "Blog" ? "/blog" : `/#${item.toLowerCase()}`}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {pathname !== "/start-project" && (
            <Link
              href="/start-project"
              className="hidden md:block font-inter font-medium uppercase tracking-widest text-sm px-6 py-2 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all"
            >
              START A PROJECT
            </Link>
          )}

          {/* Hamburger Icon */}
          <button 
            className="md:hidden p-2 text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            title={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <button 
          className="absolute top-6 right-6 p-2"
          onClick={() => setIsMobileMenuOpen(false)}
          title="Close Menu"
          aria-label="Close Menu"
        >
          <X size={32} />
        </button>

        {menuItems.map((item) => (
          <Link
            key={item}
            className="text-3xl font-black uppercase tracking-tighter hover:text-gray-500 transition-colors"
            href={item === "Blog" ? "/blog" : `/#${item.toLowerCase()}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item}
          </Link>
        ))}

        <Link
          href="/start-project"
          className="mt-8 font-inter font-bold uppercase tracking-widest text-base px-10 py-4 bg-black text-white border-2 border-black"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          START A PROJECT
        </Link>
      </div>
    </header>
  );
}
