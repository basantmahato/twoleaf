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
            Recent Blogs
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">02 / BLOGS</span>
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
          className="mt-48 border-y-2 border-black py-12 overflow-hidden flex whitespace-nowrap"
          data-aos="fade-in"
        >
          <div className="animate-marquee flex gap-12 text-4xl uppercase font-black opacity-10">
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
      <div className="aspect-[16/10] bg-gray-100 mb-8 border-2 border-black overflow-hidden relative">
        <Image
          alt={title}
          className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
          src={image}
          fill
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-3xl font-bold uppercase mb-2 leading-none tracking-tight">
            {title}
          </h4>
          <p className="text-base text-gray-500">
            {desc}
          </p>
        </div>
        <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">
          arrow_forward
        </span>
      </div>
    </Link>
  );
}
