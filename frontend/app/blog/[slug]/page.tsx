"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import blogsData from "../../data/blogs.json";

export default function BlogDetail() {
  const params = useParams();
  const slug = params.slug;
  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold uppercase tracking-tight">Post Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <article className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-16 space-y-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Back to Blog
            </Link>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                {blog.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">
                {blog.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-medium tracking-tight">
                {blog.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-900">{blog.author}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{blog.date}</p>
                </div>
              </div>
            </div>
          </header>

          <div className="aspect-[16/9] overflow-hidden border-2 border-black mb-16 relative grayscale">
            <Image 
              src={blog.image} 
              alt={blog.title} 
              fill 
              className="object-cover"
            />
          </div>

          <section className="max-w-none space-y-8 text-slate-700 leading-relaxed font-medium">
            {blog.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-2xl font-bold uppercase tracking-tight text-slate-900 pt-8 first:pt-0">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={index} className="list-disc pl-6 space-y-4">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i} className="pl-2">{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index} className="text-lg">{paragraph}</p>;
            })}
          </section>

          <footer className="mt-24 pt-12 border-t-2 border-black">
            <div className="bg-slate-50 p-12 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h4 className="text-2xl font-bold uppercase tracking-tight text-slate-900 mb-2">Ready to scale your next project?</h4>
                <p className="text-slate-500 font-medium">Let's discuss how our architectural expertise can drive your growth.</p>
              </div>
              <Link 
                href="/start-project"
                className="px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all shrink-0"
              >
                Start a Project
              </Link>
            </div>
          </footer>
        </div>
      </article>
      <Footer />
    </>
  );
}
