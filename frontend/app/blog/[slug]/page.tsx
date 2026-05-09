"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function BlogDetail() {
  const params = useParams();
  const slug = params.slug;

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/blogs/${slug}`);
      return res.data.data;
    },
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00b4ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#64748b] font-bold uppercase tracking-widest text-[10px]">Architecting Content...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight text-black mb-4">Insight Not <span className="text-[#00b4ff]">Found</span></h1>
          <Link href="/blog" className="text-[10px] font-bold uppercase tracking-widest text-[#00b4ff] hover:text-black transition-all">Back to Insights</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <article className="min-h-screen pt-40 pb-24 bg-dot-pattern relative overflow-hidden">
        {/* SEO - Note: Next.js Metadata API is preferred in app dir, but keeping this simple */}
        <title>{blog.seoTitle || blog.title}</title>
        <meta name="description" content={blog.seoDesc || blog.subtitle} />

        {/* Decorative gradient blurs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00b4ff10] rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#00b4ff08] rounded-full blur-[100px] -z-10" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <header className="mb-16 space-y-10">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] hover:text-[#00b4ff] transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
            
            <div className="space-y-6">
              <div className="flex gap-3">
                {blog.tags.map((tag: string) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-[#00b4ff] bg-[#00b4ff08] px-4 py-1.5 rounded-full border border-[#00b4ff15]">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase leading-[1.1]">
                {blog.title}
              </h1>
              <p className="text-xl md:text-2xl text-[#64748b] font-medium tracking-tight leading-relaxed">
                {blog.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between pt-10 border-t border-[#e2e8f0]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#00b4ff]">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-black">{blog.author}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mt-1">
                    {new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="aspect-[16/9] overflow-hidden rounded-[3rem] mb-20 relative shadow-2xl shadow-black/5 bg-[#f8fafc]">
            <Image 
              src={blog.image} 
              alt={blog.title} 
              fill 
              className="object-cover"
            />
          </div>

          <section className="max-w-none space-y-10 text-[#1e293b] leading-relaxed font-normal">
            {blog.content.split('\n\n').map((paragraph: string, index: number) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-2xl font-bold uppercase tracking-tight text-black pt-12 first:pt-0">
                    <span className="text-[#00b4ff] mr-2">#</span>
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={index} className="space-y-4 py-4">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-base">
                        <span className="w-2 h-2 bg-[#00b4ff] rounded-full mt-2 shrink-0"></span>
                        <span>{item.replace('- ', '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return <p key={index} className="text-lg text-[#64748b]">{paragraph}</p>;
            })}
          </section>

          <footer className="mt-24 pt-16 border-t border-[#e2e8f0]">
            <div className="bg-white border border-[#e2e8f0] p-12 rounded-[2.5rem] shadow-2xl shadow-black/[0.03] flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="space-y-3">
                <h4 className="text-2xl font-bold uppercase tracking-tight text-black">Ready to scale your next project?</h4>
                <p className="text-[#64748b] font-medium">Let's discuss how our architectural expertise can drive your growth.</p>
              </div>
              <Link 
                href="/start-project"
                className="px-12 py-5 bg-[#00b4ff] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all duration-500 rounded-full shadow-lg shadow-[#00b4ff20] shrink-0"
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

