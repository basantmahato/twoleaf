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
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7f5]">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-[3px] border-[#18A058] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[#6b7280]">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7f5]">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-[#1a1a2e]">
            Article <span className="text-[#18A058]">Not Found</span>
          </h1>
          <Link href="/blog" className="text-sm text-[#18A058] hover:text-[#15803d] font-semibold transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <article className="min-h-screen bg-[#f5f7f5] pt-24 pb-20">

        {/* Hero area */}
        <div className="bg-white border-b border-[#e5e7eb] px-6 md:px-10 py-10">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#18A058] transition-colors group mb-8"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {blog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#18A058] bg-[#18A05810] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-2xl md:text-4xl font-bold text-[#1a1a2e] leading-snug mb-4">
              {blog.title}
            </h1>
            <p className="text-base text-[#6b7280] leading-relaxed mb-8">
              {blog.subtitle}
            </p>

            {/* Author row */}
            <div className="flex items-center justify-between pt-6 border-t border-[#e5e7eb]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#18A05815] flex items-center justify-center">
                  <span className="text-sm font-bold text-[#18A058]">
                    {blog.author?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a2e]">{blog.author}</p>
                  <p className="text-xs text-[#9ca3af]">
                    {new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cover image */}
        <div className="max-w-3xl mx-auto px-6 md:px-10 mt-8">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden relative bg-gray-100 shadow-md">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Article body */}
        <div className="max-w-3xl mx-auto px-6 md:px-10 mt-10">
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-8 md:p-10 space-y-6 text-[#374151] leading-relaxed">
            {blog.content.split("\n\n").map((paragraph: string, index: number) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-bold text-[#1a1a2e] pt-4 first:pt-0 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#18A058] rounded-full inline-block flex-shrink-0" />
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={index} className="space-y-3">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#6b7280]">
                        <span className="w-2 h-2 bg-[#18A058] rounded-full mt-1.5 flex-shrink-0" />
                        <span>{item.replace("- ", "")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-sm md:text-base text-[#6b7280] leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* CTA card */}
          <div className="mt-10 bg-[#18A058] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white space-y-1">
              <h4 className="text-lg font-bold">Ready to scale your next project?</h4>
              <p className="text-sm text-white/80">
                Let's discuss how our expertise can drive your growth.
              </p>
            </div>
            <Link
              href="/start-project"
              className="flex-shrink-0 bg-white text-[#18A058] text-sm font-bold px-7 py-3 rounded-lg hover:bg-[#f0fdf4] transition-all duration-300"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
