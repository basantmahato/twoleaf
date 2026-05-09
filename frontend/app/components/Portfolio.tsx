import Image from "next/image";
import Link from "next/link";

export default function Portfolio() {
  return (
    <section
      className="py-32 px-8 md:px-12 bg-white"
      data-aos="fade-up"
      data-aos-duration="800"
      id="portfolio"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-baseline mb-24">
          <h2 className="text-5xl font-bold uppercase tracking-tight">
            Latest <span className="text-[#00b4ff]">Insights</span>
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-[#64748b]">02 / BLOGS</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <ProjectCard
            title="NEURAL CORE"
            desc="AI-Driven Analytics Platform"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBBC9lgdJ5gFKosMFdLjhbJFKehXBtAm6sTwHDS8CWA_ht9jnC8ek5UqU4iRQshQhOaGPRDTPZW_flX-kXBrO-7k6LHEVmJDp4fdgiliNF1FedoOntsXRjEsaBtsueqcbZcBsFnV-JTJAxnydZoX16Gxb6EN3pIeRXybEUXZxhw2YixFC1nWauQs3lbUFLGR_o4TJYka5udTvExcM-p7b5vfyuy7PWC-XAXY2L7WgaBfUCuIH5msCuyOeoKaqJsxdMRoTTVx5V1JPWW"
            delay={100}
            slug="neural-core-ai-analytics"
          />
          <ProjectCard
            title="QUANTUM GRID"
            desc="Global Cloud Infrastructure"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAUdRhQJ_e9uBnP8Usbpz5Z5JUjzPyWQeLgMlXwLS8ftIkIm0lK7iWbo_dZv4XU7LDvxtAQdeKzPMvmzUMlfjMlfCSKUH8sYcmQEXksIFJGWpAnREtlV0Zz4vO-6f7c09tX6Mx1ZCN_7nTh3NIIIaxMsMAHE7rREN0TkoZzYYxDXhnlZxaf93IhF8jv-rqoMr6KQqU9TNPBDuuQ7kCRbm2gHv2z6g6dd-wZ4iSCTTga-XlnUZgWLB1qiWWkVMswVEIv5GpK5Dbaali-"
            delay={200}
            slug="quantum-grid-cloud-infrastructure"
          />
        </div>
        
        {/* Marquee for Tech Stack */}
        <div
          className="mt-48 border-y-[1px] border-[#e2e8f0] py-16 overflow-hidden flex whitespace-nowrap bg-[#f8fafc]"
          data-aos="fade-in"
        >
          <div className="animate-marquee flex gap-16 text-5xl uppercase font-black text-[#00b4ff15]">
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

function ProjectCard({ title, desc, image, delay, slug }: { title: string; desc: string; image: string; delay: number; slug: string }) {
  return (
    <Link href={`/blog/${slug}`} className="group block" data-aos="fade-up" data-aos-delay={delay}>
      <div className="aspect-[16/10] bg-gray-100 mb-8 overflow-hidden relative rounded-[2.5rem] shadow-xl shadow-black/5">
        <Image
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          src={image}
          fill
        />
        <div className="absolute inset-0 bg-[#00b4ff] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      </div>
      <div className="flex justify-between items-center px-4">
        <div>
          <h4 className="text-3xl font-bold uppercase mb-2 leading-none tracking-tight group-hover:text-[#00b4ff] transition-colors duration-300">
            {title}
          </h4>
          <p className="text-base text-[#64748b]">
            {desc}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full border-[1px] border-[#e2e8f0] flex items-center justify-center group-hover:bg-[#00b4ff] group-hover:border-[#00b4ff] transition-all duration-500">
          <span className="material-symbols-outlined text-2xl group-hover:text-white group-hover:translate-x-1 transition-all duration-500">
            arrow_forward
          </span>
        </div>
      </div>
    </Link>
  );
}
