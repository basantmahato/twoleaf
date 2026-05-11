"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What services does TwoLeaf specialise in?",
    answer: "We specialise in high-performance software development, AI integration, and digital growth strategies. From custom web applications and mobile ecosystems to implementing intelligent LLM pipelines and managing high-converting Meta Ads, we provide end-to-end digital solutions.",
  },
  {
    question: "How long does a typical project take to complete?",
    answer: "Project timelines vary depending on complexity. A standard website or brand refresh might take 4-6 weeks, while complex enterprise software or custom AI integrations can take 3-6 months. We prioritize architectural integrity and performance, ensuring we never sacrifice quality for speed.",
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, we provide comprehensive ongoing support and maintenance packages. We don't just build and leave; we ensure your systems remain secure, updated, and optimized for performance as your business scales.",
  },
  {
    question: "How is project pricing determined?",
    answer: "We offer both project-based fixed pricing and dedicated resource models. After an initial discovery phase, we provide a detailed proposal with transparent costs based on the specific scope, technical requirements, and estimated delivery timeline.",
  },
  {
    question: "Can you integrate AI into our existing business processes?",
    answer: "Absolutely. We excel at identifying areas where AI can drive efficiency. Whether it's automating customer support with custom-tuned LLMs, implementing computer vision for quality control, or building predictive data architectures, we make AI work for you.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 md:px-10 bg-[#f5f7f5]" id="faq">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-14">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a2e]">
              Common <span className="text-[#18A058]">Inquiries</span>
            </h2>
            <p className="mt-3 text-sm text-[#6b7280] max-w-md">
              Everything you need to know about partnering with TwoLeaf for your next digital evolution.
            </p>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#9ca3af] mt-2">
            04 / FAQ
          </span>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl border transition-all duration-500 overflow-hidden ${
                openIndex === index 
                  ? "border-[#18A058] shadow-lg shadow-[#18A05808]" 
                  : "border-[#e5e7eb] hover:border-[#18A05860]"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    openIndex === index ? "bg-[#18A058] text-white" : "bg-[#18A05810] text-[#18A058]"
                  }`}>
                    <HelpCircle size={16} />
                  </div>
                  <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${
                    openIndex === index ? "text-[#18A058]" : "text-[#1a1a2e]"
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`transition-transform duration-500 ${openIndex === index ? "rotate-180 text-[#18A058]" : "text-[#9ca3af]"}`}>
                  <ChevronDown size={20} />
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${
                  openIndex === index 
                    ? "max-h-[500px] opacity-100" 
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 md:px-8 pb-8 pt-0 ml-12">
                  <div className="h-px w-full bg-[#e5e7eb] mb-6" />
                  <p className="text-sm md:text-base text-[#6b7280] leading-relaxed max-w-2xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#9ca3af]">
            Still have questions? <a href="#contact" className="text-[#18A058] font-bold hover:underline">Get in touch</a> with our team.
          </p>
        </div>
      </div>
    </section>
  );
}
