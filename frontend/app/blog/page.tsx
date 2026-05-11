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
      <main className="min-h-screen bg-[#f5f7f5] pt-24 pb-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">

          {/* Page header */}
          <div className="py-12 border-b border-[#e5e7eb] mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#18A058] uppercase tracking-widest block mb-3">
                TwoLeaf Blog
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] leading-tight">
                Insights &amp; <span className="text-[#18A058]">Case Studies</span>
              </h1>
              <p className="mt-3 text-sm text-[#6b7280] max-w-lg leading-relaxed">
                Exploring the intersection of high-performance architecture, artificial intelligence, and digital growth.
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9ca3af]">
              03 / Blog
            </span>
          </div>

          {/* Blog grid */}
          {isLoading || !blogs || blogs.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <BlogSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs?.map((blog: any) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function BlogSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-[#e5e7eb] flex flex-col h-full animate-pulse">
      {/* Image Placeholder */}
      <div className="aspect-[1.1/1] bg-[#f2f4f2] m-2 rounded-[1.8rem]" />
      
      {/* Content Placeholder */}
      <div className="p-6 pt-2 space-y-4">
        <div className="h-2.5 bg-[#f2f4f2] rounded-full w-1/3" />
        <div className="space-y-2">
          <div className="h-4 bg-[#f2f4f2] rounded-full w-full" />
          <div className="h-4 bg-[#f2f4f2] rounded-full w-2/3" />
        </div>
        <div className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#f2f4f2]" />
            <div className="h-2 bg-[#f2f4f2] rounded-full w-12" />
          </div>
          <div className="h-2 bg-[#f2f4f2] rounded-full w-10" />
        </div>
      </div>
    </div>
  );
}

function BlogCard({ blog }: { blog: any }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-[#e5e7eb] hover:border-[#18A058] hover:shadow-lg hover:shadow-[#18A05810] transition-all duration-300 h-full"
    >
      {/* Image Container */}
      <div className="aspect-[1.1/1] overflow-hidden relative bg-gray-100 m-2 rounded-[1.8rem]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[#18A058] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 pt-2 flex flex-col flex-1">
        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags.slice(0, 1).map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-wider text-[#18A058] bg-[#18A05810] px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-base font-bold text-[#1a1a2e] leading-snug mb-2 group-hover:text-[#18A058] transition-colors duration-300 line-clamp-2">
          {blog.title}
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-[#6b7280] leading-relaxed line-clamp-2 flex-1">
          {blog.subtitle}
        </p>

        {/* Footer row */}
        <div className="mt-4 pt-4 border-t border-[#e5e7eb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#18A05815] flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#18A058]">
                {blog.author?.[0]?.toUpperCase()}
              </span>
            </div>
            <span className="text-xs text-[#6b7280] font-medium">{blog.author}</span>
          </div>
          <span className="text-[10px] text-[#9ca3af]">
            {new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      </div>
    </Link>
  );
}
