import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["Services", "About", "Contact", "Blog"];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <nav className="flex justify-between items-center px-6 md:px-12 w-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center group">
          <span className="text-xl font-black tracking-tighter text-black group-hover:text-[#00b4ff] transition-colors duration-300 uppercase">
            TWOLEAF SERVICES
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10">
          {menuItems.map((item) => (
            <Link
              key={item}
              className="font-inter font-semibold uppercase tracking-widest text-[10px] text-[#64748b] hover:text-[#00b4ff] transition-all relative group"
              href={item === "Blog" ? "/blog" : `/#${item.toLowerCase()}`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00b4ff] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {pathname !== "/start-project" && (
            <Link
              href="/start-project"
              className="hidden md:block font-inter font-bold uppercase tracking-widest text-[10px] px-8 py-3 bg-[#00b4ff] text-white hover:bg-black transition-all rounded-full shadow-lg shadow-[#00b4ff20]"
            >
              START PROJECT
            </Link>
          )}

          {/* Hamburger Icon */}
          <button 
            className="md:hidden p-2 text-black hover:bg-[#00b4ff10] rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            title={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-10 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'} md:hidden`}>
        <button 
          className="absolute top-6 right-6 p-2 text-black hover:bg-[#00b4ff10] rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
          title="Close Menu"
          aria-label="Close Menu"
        >
          <X size={32} />
        </button>

        {menuItems.map((item) => (
          <Link
            key={item}
            className="text-4xl font-black uppercase tracking-tighter text-black hover:text-[#00b4ff] transition-colors"
            href={item === "Blog" ? "/blog" : `/#${item.toLowerCase()}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item}
          </Link>
        ))}

        <Link
          href="/start-project"
          className="mt-8 font-inter font-bold uppercase tracking-widest text-sm px-12 py-5 bg-[#00b4ff] text-white rounded-full"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          START A PROJECT
        </Link>
      </div>
    </header>
  );
}
