"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function BlogListing() {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/blogs`);
      return res.data.data;
    },
  });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-40 pb-24 px-6 bg-dot-pattern relative overflow-hidden">
        {/* Decorative gradient blurs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00b4ff10] rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#00b4ff08] rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <header className="mb-24 flex justify-between items-baseline">
            <div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black uppercase leading-none">
                Insights & <span className="text-[#00b4ff]">Case Studies</span>
              </h1>
              <p className="mt-6 text-[#64748b] font-medium max-w-xl text-lg leading-relaxed">
                Exploring the intersection of high-performance architecture, artificial intelligence, and global digital infrastructure.
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#64748b]">03 / BLOG</span>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {isLoading ? (
              <div className="col-span-2 text-center py-20 text-[#64748b] font-bold uppercase tracking-widest">
                Loading Insights...
              </div>
            ) : blogs?.length === 0 ? (
              <div className="col-span-2 text-center py-20 text-[#64748b] font-bold uppercase tracking-widest">
                No insights found.
              </div>
            ) : blogs?.map((blog: any) => (
              <Link href={`/blog/${blog.slug}`} key={blog._id} className="group flex flex-col">
                <div className="aspect-[16/9] overflow-hidden rounded-[2.5rem] mb-8 relative shadow-xl shadow-black/5 bg-[#f8fafc]">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-[#00b4ff] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                </div>
                <div className="flex justify-between items-start px-2">
                  <div className="flex-1 pr-4">
                    <div className="flex gap-3 mb-6">
                      {blog.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-[#00b4ff] bg-[#00b4ff08] px-4 py-1.5 rounded-full border border-[#00b4ff15]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-black group-hover:text-[#00b4ff] transition-colors leading-tight mb-4">
                      {blog.title}
                    </h2>
                    <p className="text-[#64748b] font-normal text-sm line-clamp-2 leading-relaxed">
                      {blog.subtitle}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-[#e2e8f0] flex items-center justify-center group-hover:bg-[#00b4ff] group-hover:border-[#00b4ff] transition-all duration-500 shrink-0">
                    <span className="material-symbols-outlined text-2xl group-hover:text-white group-hover:translate-x-1 transition-all duration-500">
                      arrow_forward
                    </span>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-[#e2e8f0] flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full"></span>
                    {blog.author}
                  </span>
                  <span>{new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
