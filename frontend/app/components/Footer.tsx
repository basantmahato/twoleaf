import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-32 bg-[#f8fafc] border-t-[1px] border-[#e2e8f0] text-black">
      <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center group">
          <div className="text-xl font-black tracking-tighter uppercase group-hover:text-[#00b4ff] transition-colors duration-300">
            TWOLEAF SERVICES
          </div>
        </div>
        <div className="flex gap-10">
          <Link href="/blog" className="text-[10px] font-bold uppercase tracking-widest text-[#64748b] hover:text-[#00b4ff] transition-all">
            Blog
          </Link>
          <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-widest text-[#64748b] hover:text-[#00b4ff] transition-all">
            Privacy
          </Link>
          <Link href="/terms" className="text-[10px] font-bold uppercase tracking-widest text-[#64748b] hover:text-[#00b4ff] transition-all">
            Terms
          </Link>
          <Link href="https://instagram.com/twoleafservices" className="text-[10px] font-bold uppercase tracking-widest text-[#64748b] hover:text-[#00b4ff] transition-all">
            Instagram
          </Link>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
          © {new Date().getFullYear()} TWOLEAF DIGITAL. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
