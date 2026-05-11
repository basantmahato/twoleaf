"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function Portfolio() {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["latest-blogs"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/blogs?limit=2`);
      return res.data.data;
    },
  });

  return (
    <section className="py-20 px-6 md:px-10 bg-white border-t border-[#e5e7eb]" id="portfolio">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-start mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a2e]">
            Latest <span className="text-[#18A058]">Insights</span>
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-[#9ca3af] mt-2">
            02 / Blogs
          </span>
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading || !blogs || blogs.length === 0 ? (
            <>
              <BlogSkeleton />
              <BlogSkeleton />
            </>
          ) : (
            blogs?.map((blog: any, index: number) => (
              <ProjectCard
                key={blog._id}
                title={blog.title}
                desc={blog.subtitle}
                image={blog.image}
                slug={blog.slug}
              />
            ))
          )}
        </div>

        {/* Tech stack marquee */}
        <div className="mt-20 border-y border-[#e5e7eb] py-5 overflow-hidden flex whitespace-nowrap bg-[#f9fafb]">
          <div className="animate-marquee flex gap-12 text-sm uppercase font-bold text-[#d1d5db] tracking-widest">
            <span>
              REACT • NODE.JS • AWS • DOCKER • PYTHON • GO • NATIVE ANDROID • POSTGRESQL •
              KUBERNETES • TYPESCRIPT • SQL •{" "}
            </span>
            <span>
              REACT • NODE.JS • AWS • DOCKER • PYTHON • GO • NATIVE ANDROID • POSTGRESQL •
              KUBERNETES • TYPESCRIPT • SQL •{" "}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-[#e5e7eb] flex flex-col h-full animate-pulse">
      <div className="aspect-[1.1/1] bg-[#f2f4f2] m-2 rounded-[1.8rem]" />
      <div className="p-6 pt-2 space-y-4">
        <div className="h-2.5 bg-[#f2f4f2] rounded-full w-1/3" />
        <div className="space-y-2">
          <div className="h-4 bg-[#f2f4f2] rounded-full w-full" />
          <div className="h-4 bg-[#f2f4f2] rounded-full w-2/3" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, desc, image, slug }: { title: string; desc: string; image: string; slug: string }) {
  return (
    <Link href={`/blog/${slug}`} className="group block bg-white border border-[#e5e7eb] rounded-[2rem] overflow-hidden hover:border-[#18A058] hover:shadow-lg hover:shadow-[#18A05810] transition-all duration-300">
      <div className="aspect-[1.1/1] bg-gray-100 overflow-hidden relative m-2 rounded-[1.8rem]">
        <Image
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={image}
          fill
        />
        <div className="absolute inset-0 bg-[#18A058] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      </div>
      <div className="p-6 pt-2 flex justify-between items-center gap-4">
        <div>
          <h4 className="text-base font-bold text-[#1a1a2e] mb-1 group-hover:text-[#18A058] transition-colors duration-300 leading-snug line-clamp-1">
            {title}
          </h4>
          <p className="text-sm text-[#6b7280] line-clamp-2">{desc}</p>
        </div>
        <div className="w-10 h-10 rounded-full border border-[#e5e7eb] flex items-center justify-center flex-shrink-0 group-hover:bg-[#18A058] group-hover:border-[#18A058] transition-all duration-300">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:text-white text-[#6b7280] transition-colors duration-300">
            <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
