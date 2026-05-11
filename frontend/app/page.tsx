"use client";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Stats from "./components/Stats";
import ClientsFeatures from "./components/ClientsFeatures";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";

export default function Home() {

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClientsFeatures />
        <Stats />
        <Services />
        <Portfolio />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
