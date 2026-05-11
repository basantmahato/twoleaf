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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] animate-pulse">
                  <div className="aspect-[16/9] bg-gray-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                    <div className="h-5 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs?.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#18A05815] flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#18A058" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-[#6b7280]">No insights published yet.</p>
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

function BlogCard({ blog }: { blog: any }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] hover:border-[#18A058] hover:shadow-lg hover:shadow-[#18A05810] transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-[16/9] overflow-hidden relative bg-gray-100">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[#18A058] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags.slice(0, 2).map((tag: string) => (
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
