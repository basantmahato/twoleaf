"use client";

import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <section
      className="py-32 px-8 md:px-12 bg-black text-white"
      data-aos="fade-up"
      data-aos-duration="800"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <div data-aos="fade-right" data-aos-delay="200">
            <h2 className="text-5xl font-bold uppercase mb-12 leading-none tracking-tight">
              Our Digital <br />
              Philosophy.
            </h2>
            <div className="space-y-8 text-lg text-gray-400 leading-relaxed">
              <p>
                We believe that every pixel and every line of code serves a purpose. 
                In the digital age, your brand's presence must be built with the 
                same precision, speed, and scalability as the world's leading tech platforms.
              </p>
              <p>
                Our team is comprised of world-class developers and creative 
                designers who share a single obsession: growth. We strip away 
                the noise to deliver digital solutions that are as elegant as they are 
                high-converting.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-12 border-t border-gray-800 pt-12">
              <div>
                <div className="text-4xl font-bold mb-2">12+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Projects Completed
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">05+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Years Experience
                </div>
              </div>
            </div>
          </div>
          <div className="relative" data-aos="fade-left" data-aos-delay="400">
            <div className="aspect-square border-2 border-white p-8 relative overflow-hidden">
              <Image
                alt="Digital Philosophy"
                className="object-cover grayscale opacity-80 hover:scale-105 transition-transform duration-1000"
                src="/_A_premium_abstract_202604241347.jpeg"
                fill
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 border-2 border-black hidden md:block z-10">
              <div className="text-3xl font-bold leading-tight uppercase tracking-tight">
                Uncompromising
                <br />
                Standards.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
