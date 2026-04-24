"use client";

import { useEffect } from "react";
import AOS from "aos";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Stats from "./components/Stats";

import Testimonials from "./components/Testimonials";

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
      easing: "ease-out-quart",
      offset: 100,
    });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
