import { motion } from "motion/react";
import { Shield, Menu } from "lucide-react";

interface NavbarProps {
  onOpenDemo: () => void;
}

export default function Navbar({ onOpenDemo }: NavbarProps) {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 glass-dark border-b border-white/5"
    >
      <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <div className="p-2 bg-electric-blue/10 rounded-lg group-hover:bg-electric-blue/20 transition-colors">
          <Shield className="w-6 h-6 text-electric-blue" />
        </div>
        <span className="text-xl font-semibold tracking-tight text-white">Sovereign AI</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {[
          { name: "Architecture", id: "features" },
          { name: "Security", id: "demo" },
          { name: "Verticals", id: "verticals" },
          { name: "Pricing", id: "pricing" }
        ].map((item) => (
          <button 
            key={item.name} 
            onClick={() => scrollTo(item.id)}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenDemo}
          className="hidden md:block px-5 py-2 text-sm font-semibold text-white bg-electric-blue hover:bg-electric-blue-light rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-electric-blue/20"
        >
          Book Private Demo
        </button>
        <button className="md:hidden p-2 text-slate-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
