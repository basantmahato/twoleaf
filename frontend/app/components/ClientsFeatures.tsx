import Image from "next/image";
import Link from "next/link";

/* ─── Client / Partner Logos (SVG inline) ─── */
const clients = [
  {
    name: "Vercel",
    svg: (
      <svg viewBox="0 0 76 65" fill="none" className="h-7 w-auto">
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#1a1a2e" />
      </svg>
    ),
  },
  {
    name: "Stripe",
    svg: (
      <svg viewBox="0 0 60 25" fill="none" className="h-7 w-auto">
        <path
          d="M27.5 7.5C27.5 5.5 29.2 4.5 31.5 4.5C34 4.5 37 5.5 39.5 7L41 2.5C38.5 1 35 0 31.5 0C25.5 0 21 3.5 21 9C21 18.5 34 17 34 21.5C34 23.5 32 24.5 29.5 24.5C26.5 24.5 23 23 20.5 21L19 25.5C21.5 27.5 25.5 29 29.5 29C36 29 40.5 25.5 40.5 20C40.5 10 27.5 12 27.5 7.5Z"
          fill="#635BFF"
        />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-auto" fill="none">
        <path
          d="M12 2C12 2 7 8.5 7 13.5C7 16.5 9.2 19 12 19C14.8 19 17 16.5 17 13.5C17 8.5 12 2 12 2Z"
          fill="#4CAF50"
        />
        <path d="M12 19V22" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "AWS",
    svg: (
      <svg viewBox="0 0 80 48" className="h-7 w-auto" fill="none">
        <text x="0" y="36" fontFamily="Arial" fontWeight="bold" fontSize="30" fill="#FF9900">
          aws
        </text>
      </svg>
    ),
  },
  {
    name: "OpenAI",
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-auto" fill="none">
        <path
          d="M12 2C8.5 2 5.5 4.5 5 8C3.5 8.5 2.5 10 2.5 11.5C2.5 13.5 4 15 6 15.5V16C6 19.3 8.7 22 12 22C15.3 22 18 19.3 18 16V15.5C20 15 21.5 13.5 21.5 11.5C21.5 10 20.5 8.5 19 8C18.5 4.5 15.5 2 12 2Z"
          fill="#10a37f"
        />
      </svg>
    ),
  },
  {
    name: "Docker",
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-auto" fill="none">
        <rect x="2" y="10" width="4" height="3" rx="0.5" fill="#2496ED" />
        <rect x="7" y="10" width="4" height="3" rx="0.5" fill="#2496ED" />
        <rect x="7" y="6" width="4" height="3" rx="0.5" fill="#2496ED" />
        <rect x="12" y="10" width="4" height="3" rx="0.5" fill="#2496ED" />
        <path d="M22 11.5C21 10 19 10 18 10.5C17.5 8.5 16 7.5 14.5 7.5V10H17" stroke="#2496ED" strokeWidth="0.5" />
        <path d="M2 13.5C4 16 8 16 10 14" stroke="#2496ED" strokeWidth="0.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "React",
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-auto" fill="none">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
];

/* ─── Who We Serve cards ─── */
const cards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#18A05815" />
        <path d="M8 22C8 18.7 11.6 16 16 16C20.4 16 24 18.7 24 22" stroke="#18A058" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16" cy="11" r="3.5" stroke="#18A058" strokeWidth="1.8" />
        <circle cx="9" cy="14" r="2.5" stroke="#18A058" strokeWidth="1.5" />
        <circle cx="23" cy="14" r="2.5" stroke="#18A058" strokeWidth="1.5" />
      </svg>
    ),
    title: "Startups & SMEs",
    desc: "We partner with early-stage startups and growing businesses to build scalable digital products, MVPs, and go-to-market tech infrastructure.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#18A05815" />
        <rect x="7" y="13" width="18" height="12" rx="1.5" stroke="#18A058" strokeWidth="1.8" />
        <path d="M11 13V10C11 8.3 12.3 7 14 7H18C19.7 7 21 8.3 21 10V13" stroke="#18A058" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13 19H19M16 17V21" stroke="#18A058" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Enterprise Businesses",
    desc: "We deliver enterprise-grade software, CRM integration, and AI-powered workflows that modernise operations and drive measurable ROI.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#18A05815" />
        <path d="M8 24V12L16 8L24 12V24" stroke="#18A058" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="13" y="17" width="6" height="7" rx="1" stroke="#18A058" strokeWidth="1.5" />
        <path d="M11 15H13M19 15H21" stroke="#18A058" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Agencies & Creators",
    desc: "We help agencies and content creators supercharge their digital presence with bespoke web platforms, AI tools, and high-converting ad campaigns.",
  },
];

export default function ClientsFeatures() {
  return (
    <div className="bg-white">

      {/* ── 1. Our Clients ── */}
      <section className="py-16 px-6 md:px-10 border-b border-[#e5e7eb]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">Our Clients</h2>
          <p className="text-sm text-[#6b7280] mb-10">
            We've worked with leading technology platforms and forward-thinking businesses
          </p>

          {/* Logo strip */}
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {clients.map((c) => (
              <div
                key={c.name}
                className="opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                title={c.name}
              >
                {c.svg}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Who We Serve ── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-3">
              Serving every scale of business
            </h2>
            <p className="text-sm text-[#6b7280]">Who is TwoLeaf suitable for?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e5e7eb] border border-[#e5e7eb] rounded-2xl overflow-hidden">
            {cards.map((card, i) => (
              <div
                key={i}
                className="group p-8 text-center hover:bg-[#18A058] transition-all duration-400 cursor-default"
              >
                <div className="flex justify-center mb-5 group-hover:[&_rect]:fill-white/20 group-hover:[&_path]:stroke-white group-hover:[&_circle]:stroke-white">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-[#1a1a2e] group-hover:text-white mb-3 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-sm text-[#6b7280] group-hover:text-white/80 leading-relaxed transition-colors duration-300">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Feature Block (illustration + text) ── */}
      <section className="py-20 px-6 md:px-10 bg-[#f9fafb]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Illustration */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[380px]">
              <div className="absolute inset-0 rounded-3xl bg-[#18A05810]" />
              <Image
                src="/clients-illustration.png"
                alt="TwoLeaf team collaborating on digital projects"
                width={380}
                height={320}
                className="relative z-10 w-full h-auto object-contain drop-shadow-md"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] leading-snug mb-5">
              Building digital excellence <br />
              <span className="text-[#18A058]">for over 3 years</span>
            </h2>
            <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
              Since our founding, TwoLeaf has partnered with startups, enterprises, and agencies 
              across India and beyond. We combine engineering rigour with creative strategy to deliver 
              digital products that are not just beautiful — but built to perform.
            </p>
            <p className="text-sm text-[#6b7280] leading-relaxed mb-8">
              Whether it's a custom web application, an AI integration, or a full-funnel Meta Ads 
              campaign, our team brings the same level of precision and dedication to every project.
            </p>
            <Link
              href="/start-project"
              className="inline-block bg-[#18A058] text-white text-sm font-semibold px-7 py-3 rounded-md hover:bg-[#15803d] transition-all duration-300 shadow-sm"
            >
              Work With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
