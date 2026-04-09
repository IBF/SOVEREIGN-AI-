import { motion } from "motion/react";
import { Gavel, Landmark, HeartPulse, ArrowUpRight } from "lucide-react";

const verticals = [
  {
    title: "Legal",
    icon: Gavel,
    description: "Contract review, risk flagging, and discovery automation. Process thousands of documents locally with zero data leakage.",
    features: ["Risk Analysis", "Clause Extraction", "Compliance Check"],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Finance",
    icon: Landmark,
    description: "KYC/AML automation, risk scoring, and fraud detection. High-throughput intelligence behind your own firewall.",
    features: ["KYC Automation", "Risk Scoring", "Fraud Detection"],
    color: "from-indigo-500/20 to-purple-500/20"
  },
  {
    title: "Healthcare",
    icon: HeartPulse,
    description: "Medical coding, patient record synthesis, and HIPAA compliance. Secure clinical intelligence at the point of care.",
    features: ["Medical Coding", "Record Synthesis", "HIPAA Guardrails"],
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

export default function Verticals() {
  return (
    <section id="verticals" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Built for critical sectors.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl"
          >
            Engineered for industries where data privacy isn't a feature—it's a legal requirement.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {verticals.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className={`group relative p-8 rounded-[2rem] glass border border-white/5 overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors">
                  <v.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  {v.title}
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
                </h3>
                
                <p className="text-slate-400 mb-8 leading-relaxed">
                  {v.description}
                </p>

                <div className="space-y-3">
                  {v.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
