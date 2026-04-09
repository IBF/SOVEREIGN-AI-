import { motion } from "motion/react";
import { Cpu, ShieldAlert, Zap, Globe, Database, Lock } from "lucide-react";

const features = [
  {
    title: "Local Inference",
    description: "Run world-class LLMs on your own silicon. Optimized for NVIDIA, Apple, and AMD hardware.",
    icon: Cpu
  },
  {
    title: "Air-Gapped Security",
    description: "Zero external dependencies. Operates in completely isolated network environments.",
    icon: ShieldAlert
  },
  {
    title: "High Throughput",
    description: "Proprietary quantization techniques deliver up to 300 tokens/sec on standard hardware.",
    icon: Zap
  },
  {
    title: "Data Residency",
    description: "Your data never leaves your premises. Full compliance with strict residency laws.",
    icon: Globe
  },
  {
    title: "Vector Storage",
    description: "Integrated local vector database for secure RAG and long-term memory.",
    icon: Database
  },
  {
    title: "Zero-Trust Auth",
    description: "Granular access controls and OIDC integration for enterprise-grade security.",
    icon: Lock
  }
];

export default function Features() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Enterprise-grade by design.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Sovereign AI is built from the ground up to meet the most demanding security requirements.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center mb-6 group-hover:bg-electric-blue/20 transition-colors">
                <f.icon className="w-6 h-6 text-electric-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
