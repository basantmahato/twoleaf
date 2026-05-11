export default function Services() {
  return (
    <section
      className="py-20 px-6 md:px-10 bg-white border-t border-[#e5e7eb]"
      id="services"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header row */}
        <div className="flex justify-between items-start mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#1a1a2e]">
            OUR <span className="text-[#18A058]">SERVICES</span>
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-[#9ca3af] mt-2">
            01 / Services
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            }
            title="Software Development"
            desc="Custom enterprise solutions built with architectural integrity. We focus on scalability, maintainability, and pure performance."
            features={["Custom Web Apps", "Mobile Ecosystems", "Legacy Modernization"]}
          />
          <ServiceCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                <path d="M12 8v4l3 3" />
                <path d="M3.6 9h16.8M3.6 15h16.8" />
              </svg>
            }
            title="AI Integration"
            desc="Implementing intelligent systems that solve real-world problems. From LLM tuning to computer vision pipelines."
            features={["Machine Learning", "Natural Language", "Data Architecture"]}
            featured
          />
          <ServiceCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            }
            title="Digital Marketing"
            desc="We specialise in high-performance Meta Ads campaigns that drive real growth, engagement, and conversion."
            features={["Facebook Ads", "Instagram Ads", "Re-Targeting Expertise"]}
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  desc,
  features,
  featured = false,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`group relative flex flex-col gap-6 p-8 rounded-2xl border transition-all duration-300 cursor-default
        ${featured
          ? "border-[#18A058] shadow-lg shadow-[#18A05818]"
          : "border-[#e5e7eb] hover:border-[#18A058]"
        }
        hover:bg-[#18A058]
      `}
    >
      {/* Icon circle */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300
          ${featured
            ? "bg-[#18A058] text-white group-hover:bg-white group-hover:text-[#18A058]"
            : "bg-[#18A05812] text-[#18A058] group-hover:bg-white/20 group-hover:text-white"
          }`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className={`text-base font-bold uppercase tracking-tight transition-colors duration-300
          ${featured ? "text-[#1a1a2e] group-hover:text-white" : "text-[#1a1a2e] group-hover:text-white"}`}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed transition-colors duration-300
          ${featured ? "text-[#4b5563] group-hover:text-white/85" : "text-[#6b7280] group-hover:text-white/85"}`}
      >
        {desc}
      </p>

      {/* Features */}
      <ul className="space-y-2 mt-auto">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5">
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300
                ${featured ? "bg-[#18A058] group-hover:bg-white" : "bg-[#18A058] group-hover:bg-white"}`}
            />
            <span
              className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300
                ${featured ? "text-[#4b5563] group-hover:text-white/85" : "text-[#6b7280] group-hover:text-white/85"}`}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
