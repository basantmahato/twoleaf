"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase">
              Privacy Policy
            </h1>
            <p className="text-slate-500 font-medium">Last Updated: April 24, 2026</p>
          </header>

          <section className="max-w-none space-y-12 text-slate-700">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">1. Introduction</h2>
              <p>
                At TwoLeaf Digital, we value your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website 
                or engage with our services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">2. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact information (name, email address, phone number)</li>
                <li>Project details and business requirements</li>
                <li>Communication history between you and TwoLeaf Digital</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">3. How We Use Your Information</h2>
              <p>We use the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">4. Data Security</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet, 
                or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect 
                your Personal Data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                <span className="font-bold">Email:</span> hello@twoleaf.digital
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
