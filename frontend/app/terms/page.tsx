"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase">
              Terms of Service
            </h1>
            <p className="text-slate-500 font-medium">Last Updated: April 24, 2026</p>
          </header>

          <section className="max-w-none space-y-12 text-slate-700">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the services of TwoLeaf Digital, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">2. Service Description</h2>
              <p>
                TwoLeaf Digital provides high-performance software architecture, AI systems development, and digital 
                infrastructure consulting. Any new features added to the current Service shall also be subject to 
                these Terms of Service.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">3. User Obligations</h2>
              <p>
                As a user of our services, you agree to provide true, accurate, current, and complete information 
                about yourself as prompted by our lead forms and project inquiries.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">4. Intellectual Property</h2>
              <p>
                All content, trademarks, and data on this website, including but not limited to software, databases, 
                text, graphics, and icons are the property of TwoLeaf Digital and are protected by international 
                copyright laws.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">5. Limitation of Liability</h2>
              <p>
                TwoLeaf Digital shall not be liable for any indirect, incidental, special, consequential or punitive 
                damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">6. Termination</h2>
              <p>
                We may terminate or suspend access to our Service immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
