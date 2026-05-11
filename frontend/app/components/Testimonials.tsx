"use client";

const testimonials = [
  {
    quote: "TwoLeaf transformed our legacy systems into a high-performance cloud infrastructure. Their architectural precision is unmatched.",
    author: "Sarah Jenkins",
    role: "CTO, Quantum Systems",
    company: "QUANTUM",
    initial: "S",
  },
  {
    quote: "The AI integration they built for us has automated 60% of our data workflow. A game-changer for our business scaling.",
    author: "Michael Chen",
    role: "Director of Innovation",
    company: "NEURAL CORE",
    initial: "M",
  },
  {
    quote: "Minimalist design paired with powerful backend logic. They don't just build websites; they build digital assets.",
    author: "David Ross",
    role: "Founder, Apex Digital",
    company: "APEX",
    initial: "D",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 md:px-10 bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-start mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a2e]">
            Client <span className="text-[#18A058]">Verticals</span>
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-[#9ca3af] mt-2">
            04 / Trust
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group flex flex-col gap-5 p-7 rounded-2xl bg-white border border-[#e5e7eb] hover:border-[#18A058] hover:shadow-md hover:shadow-[#18A05810] transition-all duration-300"
            >
              {/* Quote mark */}
              <div className="text-4xl font-black text-[#18A058] opacity-25 leading-none italic group-hover:opacity-100 transition-opacity duration-300">
                "
              </div>

              {/* Quote text */}
              <p className="text-sm text-[#4b5563] leading-relaxed italic flex-1">
                {t.quote}
              </p>

              {/* Author row */}
              <div className="pt-5 border-t border-[#e5e7eb] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#18A05815] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#18A058]">{t.initial}</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1a1a2e]">{t.author}</div>
                    <div className="text-[10px] text-[#18A058] font-semibold mt-0.5">{t.role}</div>
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d1d5db]">
                  {t.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
