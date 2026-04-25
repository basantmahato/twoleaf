import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full mt-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-3">
          <Image 
            src="/logocp.JPG" 
            alt="Logo" 
            width={36} 
            height={36} 
            className="rounded-lg object-contain invert grayscale brightness-200"
          />
          <div className="text-xl font-black tracking-tighter uppercase">TWOLEAF SERVICES</div>
        </div>
        <div className="flex gap-10">
          <Link href="/blog" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all">
            Blog
          </Link>
          <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all">
            Privacy
          </Link>
          <Link href="/terms" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all">
            Terms
          </Link>
          {/* <Link href="https://twitter.com" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all">
            Twitter
          </Link> */}
          {/* <Link href="https://linkedin.com" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all">
            LinkedIn
          </Link> */}

          <Link href="https://instagram.com/twoleafservices" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all">
            Instagram
          </Link>

          
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          © {new Date().getFullYear()} TWOLEAF DIGITAL. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
