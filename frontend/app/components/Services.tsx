export default function Services() {
  return (
    <section
      className="py-32 px-8 md:px-12 bg-white border-t-2 border-black"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-offset="200"
      id="services"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-baseline mb-24">
          <h2 className="text-5xl font-bold uppercase tracking-tight">
            Core Expertise
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">01 / SERVICES</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-black">
          <ServiceCard
            icon="terminal"
            title="Software Development"
            desc="Custom enterprise solutions built with architectural integrity. We focus on scalability, maintainability, and pure performance."
            features={["CUSTOM WEB APPS", "MOBILE ECOSYSTEMS", "LEGACY MODERNIZATION"]}
            border
          />
          <ServiceCard
            icon="neurology"
            title="AI Integration"
            desc="Implementing intelligent systems that solve real-world problems. From LLM tuning to computer vision pipelines."
            features={["MACHINE LEARNING", "NATURAL LANGUAGE", "DATA ARCHITECTURE"]}
            border
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

function ServiceCard({ icon, title, desc, features, border = false }: { icon: string; title: string; desc: string; features: string[]; border?: boolean }) {
  return (
    <div className={`p-12 ${border ? "border-b-2 md:border-b-0 md:border-r-2" : ""} border-black hover:bg-black hover:text-white transition-all duration-300 group`}>
      <div className="mb-12">
        <span className="material-symbols-outlined text-5xl">
          {icon}
        </span>
      </div>
      <h3 className="text-3xl font-bold uppercase mb-6 leading-none tracking-tight">
        {title}
      </h3>
      <p className="text-base mb-8 group-hover:text-gray-300 leading-relaxed">
        {desc}
      </p>
      <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="w-2 h-2 bg-current"></span> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
