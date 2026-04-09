import { motion } from "motion/react";
import { ChevronRight, ShieldCheck } from "lucide-react";
import PremiumVideo from "./PremiumVideo";

interface HeroProps {
  onOpenDemo: () => void;
}

export default function Hero({ onOpenDemo }: HeroProps) {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <ShieldCheck className="w-4 h-4 text-electric-blue" />
          <span className="text-xs font-medium tracking-wide text-slate-300 uppercase">Air-Gapped Infrastructure Ready</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
        >
          AI that stays where <br />
          <span className="text-gradient">your data lives.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Sovereign AI delivers world-class intelligence for Finance, Healthcare, and Legal sectors. 
          Fully self-hosted, air-gapped, and zero-trust by design.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={onOpenDemo}
            className="w-full sm:w-auto px-8 py-4 bg-white text-navy-900 font-bold rounded-full hover:bg-slate-200 transition-all hover:scale-105 active:scale-95"
          >
            Book Private Demo
          </button>
          <button 
            onClick={() => scrollTo("demo")}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
          >
            Try Live Demo
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Hero Video Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-24 relative w-full max-w-6xl mx-auto"
      >
        <div className="aspect-[21/9] rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl relative">
          <PremiumVideo />
        </div>
      </motion.div>
    </section>
  );
}
