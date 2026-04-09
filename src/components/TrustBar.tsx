import { motion } from "motion/react";

const logos = [
  { name: "HIPAA", color: "text-slate-500" },
  { name: "PCI-DSS", color: "text-slate-500" },
  { name: "GDPR", color: "text-slate-500" },
  { name: "SOC2", color: "text-slate-500" },
  { name: "ISO 27001", color: "text-slate-500" },
];

export default function TrustBar() {
  return (
    <section className="py-12 border-y border-white/5 bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold tracking-widest text-slate-500 uppercase mb-8">
          Trusted by regulated institutions worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
          {logos.map((logo) => (
            <motion.div 
              key={logo.name}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className={`text-xl md:text-2xl font-black tracking-tighter ${logo.color}`}
            >
              {logo.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
