export default function Services() {
  return (
    <section
      className="py-32 px-8 md:px-12 bg-white border-t-[1px] border-[#e2e8f0]"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-offset="200"
      id="services"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-baseline mb-24">
          <h2 className="text-5xl font-bold uppercase tracking-tight">
            Core <span className="text-[#00b4ff]">Expertise</span>
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-[#64748b]">01 / SERVICES</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon="terminal"
            title="Software Development"
            desc="Custom enterprise solutions built with architectural integrity. We focus on scalability, maintainability, and pure performance."
            features={["CUSTOM WEB APPS", "MOBILE ECOSYSTEMS", "LEGACY MODERNIZATION"]}
          />
          <ServiceCard
            icon="neurology"
            title="AI Integration"
            desc="Implementing intelligent systems that solve real-world problems. From LLM tuning to computer vision pipelines."
            features={["MACHINE LEARNING", "NATURAL LANGUAGE", "DATA ARCHITECTURE"]}
          />
          <ServiceCard
            icon="campaign"
            title="Digital Marketing"
            desc="We specialize in high-performance Meta Ads campaigns that drive real growth, engagement, and conversion."
            features={["FACEBOOK ADS", "INSTAGRAM ADS", "RE-TARGETING EXPERTISE"]}
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc, features }: { icon: string; title: string; desc: string; features: string[] }) {
  return (
    <div className="p-10 border-[1px] border-[#e2e8f0] hover:border-[#00b4ff] hover:bg-[#f0f9ff] transition-all duration-500 group rounded-3xl">
      <div className="mb-10 w-16 h-16 bg-[#00b4ff10] rounded-2xl flex items-center justify-center group-hover:bg-[#00b4ff] transition-colors duration-500">
        <span className="material-symbols-outlined text-3xl text-[#00b4ff] group-hover:text-white transition-colors duration-500">
          {icon}
        </span>
      </div>
      <h3 className="text-2xl font-bold uppercase mb-6 leading-none tracking-tight">
        {title}
      </h3>
      <p className="text-base mb-10 text-[#64748b] leading-relaxed group-hover:text-[#1e293b]">
        {desc}
      </p>
      <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-[#64748b] group-hover:text-[#00b4ff]">
            <span className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full"></span> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
