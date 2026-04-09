import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-dark rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12">
              <h3 className="text-3xl font-bold text-white mb-2">Book Private Demo</h3>
              <p className="text-slate-400 mb-8">
                Experience Sovereign AI on your own infrastructure.
              </p>

              <form 
                action="https://formspree.io/f/xbdpeezz" 
                method="POST" 
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-electric-blue transition placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Business Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@yourcompany.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-electric-blue transition placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company / Firm</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your Law Firm or Company"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-electric-blue transition placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Which industry are you in?</label>
                  <select
                    name="industry"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-electric-blue transition appearance-none"
                  >
                    <option value="" className="bg-navy-900">Select Industry</option>
                    <option value="Legal" className="bg-navy-900">Legal</option>
                    <option value="Finance" className="bg-navy-900">Finance</option>
                    <option value="Healthcare" className="bg-navy-900">Healthcare</option>
                    <option value="Other" className="bg-navy-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message / Demo Request</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="I would like a private demo for our team..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-electric-blue transition resize-none placeholder:text-slate-600"
                  ></textarea>
                </div>

                {/* Hidden field to identify the source */}
                <input type="hidden" name="_subject" value="New Demo Request from Sovereign AI Website" />

                <button
                  type="submit"
                  className="w-full py-4 bg-electric-blue text-white font-bold rounded-2xl hover:bg-electric-blue-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-electric-blue/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Submit Demo Request
                  <Send className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest">
                  Your information is secure and private.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
