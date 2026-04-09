import { motion } from "motion/react";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$2,499",
    description: "Perfect for small teams and pilot projects.",
    features: [
      "Single Node Deployment",
      "Standard LLM Models",
      "8k Context Window",
      "Community Support",
      "Local Vector Store"
    ],
    cta: "Start Pilot",
    highlighted: false
  },
  {
    name: "Professional",
    price: "$9,999",
    description: "For production-grade enterprise applications.",
    features: [
      "Up to 5 Cluster Nodes",
      "Advanced Quantized Models",
      "32k Context Window",
      "24/7 Priority Support",
      "Custom RAG Pipeline",
      "OIDC Integration"
    ],
    cta: "Go Production",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Bespoke solutions for global institutions.",
    features: [
      "Unlimited Cluster Nodes",
      "Custom Model Fine-tuning",
      "128k+ Context Window",
      "Dedicated On-site Support",
      "Hardware Optimization",
      "Full Source Access"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

interface PricingProps {
  onOpenDemo: () => void;
}

export default function Pricing({ onOpenDemo }: PricingProps) {
  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, secure pricing.</h2>
          <p className="text-slate-400 text-lg">Infrastructure that scales with your security needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`relative p-8 rounded-[2.5rem] flex flex-col ${
                tier.highlighted 
                  ? "bg-white/10 border-2 border-electric-blue shadow-2xl shadow-electric-blue/10 scale-105 z-10" 
                  : "bg-white/5 border border-white/5"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-electric-blue text-white text-xs font-bold rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-slate-500 text-sm">/month</span>}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-electric-blue/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-electric-blue" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <button 
                onClick={onOpenDemo}
                className={`w-full py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] ${
                tier.highlighted 
                  ? "bg-electric-blue text-white shadow-lg shadow-electric-blue/20" 
                  : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
              }`}>
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
