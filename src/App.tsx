import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Verticals from "./components/Verticals";
import Features from "./components/Features";
import LiveDemo from "./components/LiveDemo";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import DemoModal from "./components/DemoModal";
import { motion } from "motion/react";

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const openDemoModal = () => setIsDemoModalOpen(true);

  return (
    <div className="min-h-screen bg-navy-900 selection:bg-electric-blue/30 overflow-x-hidden">
      <Navbar onOpenDemo={openDemoModal} />
      
      <main>
        <Hero onOpenDemo={openDemoModal} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <TrustBar />
        </motion.div>

        <section id="verticals">
          <Verticals />
        </section>
        
        <section id="demo">
          <LiveDemo />
        </section>

        <section id="features">
          <Features />
        </section>

        <section id="pricing">
          <Pricing onOpenDemo={openDemoModal} />
        </section>

        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-electric-blue/5 blur-[120px] rounded-full -translate-y-1/2" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              The future of intelligence <br />
              <span className="text-gradient">is private.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              Join the world's most secure institutions. Reclaim your data sovereignty today.
            </p>
            <button 
              onClick={openDemoModal}
              className="px-10 py-5 bg-electric-blue text-white font-bold text-xl rounded-full hover:bg-electric-blue-light transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-electric-blue/20"
            >
              Request Private Access
            </button>
          </div>
        </section>
      </main>

      <Footer />

      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
}
