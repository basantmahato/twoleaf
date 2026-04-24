"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import blogsData from "../data/blogs.json";

export default function BlogListing() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-24 flex justify-between items-baseline">
            <div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-none">
                Insights & Case Studies
              </h1>
              <p className="mt-4 text-slate-500 font-medium max-w-xl">
                Exploring the intersection of high-performance architecture, artificial intelligence, and global digital infrastructure.
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">03 / BLOG</span>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {blogsData.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.id} className="group flex flex-col">
                <div className="aspect-[16/9] overflow-hidden border-2 border-black mb-8 relative grayscale group-hover:grayscale-0 transition-all duration-700">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <div className="flex gap-3 mb-4">
                      {blog.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-slate-500 font-medium line-clamp-2">
                      {blog.subtitle}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform shrink-0">
                    arrow_forward
                  </span>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span>{blog.author}</span>
                  <span>{blog.date}</span>
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
