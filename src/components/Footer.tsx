import { Shield, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-navy-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <Shield className="w-6 h-6 text-electric-blue" />
              <span className="text-xl font-semibold text-white">Sovereign AI</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Engineering world-class intelligence for the most secure environments on Earth.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><button onClick={() => scrollTo("features")} className="hover:text-white transition-colors">Architecture</button></li>
              <li><button onClick={() => scrollTo("demo")} className="hover:text-white transition-colors">Security</button></li>
              <li><button onClick={() => scrollTo("verticals")} className="hover:text-white transition-colors">Verticals</button></li>
              <li><button onClick={() => scrollTo("pricing")} className="hover:text-white transition-colors">Pricing</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © 2026 Sovereign AI Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <span>Built for Sovereignty</span>
            <span>Air-Gapped Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
