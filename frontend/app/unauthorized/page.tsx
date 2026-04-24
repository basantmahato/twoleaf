"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-black">
      <div className="text-center">
        <div className="text-6xl mb-8">RESTRICTED</div>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Access Denied</h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-12">Unauthorized protocol detected.</p>
        <Link 
          href="/dashboard" 
          className="bg-black text-white font-bold px-12 py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all"
        >
          Return to Hub
        </Link>
      </div>
    </div>
  );
}
