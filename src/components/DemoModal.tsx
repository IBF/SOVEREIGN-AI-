import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [serverStatus, setServerStatus] = useState<"unknown" | "online" | "offline">("unknown");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "Finance",
    message: ""
  });

  const testConnection = async () => {
    setServerStatus("unknown");
    try {
      const res = await fetch("/api/ping");
      if (res.ok) setServerStatus("online");
      else setServerStatus("offline");
    } catch (e) {
      setServerStatus("offline");
    }
  };

  useEffect(() => {
    if (isOpen) {
      testConnection();
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // Try multiple endpoints in sequence if one fails
      const endpoints = ["/submit-demo", "/api/submit-demo"];
      let lastError = null;

      for (const endpoint of endpoints) {
        try {
          console.log(`Attempting submission to: ${endpoint}`);
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(formData)
          });

          if (response.ok) {
            const result = await response.json();
            console.log("Success:", result);
            setStatus("success");
            setTimeout(() => {
              onClose();
              setStatus("idle");
              setFormData({ name: "", email: "", company: "", industry: "Finance", message: "" });
            }, 3000);
            return; // Exit on success
          } else {
            const text = await response.text();
            console.warn(`Endpoint ${endpoint} failed with status ${response.status}: ${text}`);
            lastError = `[${endpoint}] Status ${response.status}: ${text}`;
          }
        } catch (err: any) {
          console.error(`Fetch error for ${endpoint}:`, err);
          lastError = err.message;
        }
      }
      
      throw new Error(lastError || "All endpoints failed");
    } catch (error: any) {
      console.error("Final Submission Error:", error);
      alert(`SOVEREIGN AI COMMUNICATION ERROR: ${error.message}`);
      setStatus("idle");
    }
  };

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
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12">
              {status === "success" ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Request Received</h3>
                  <p className="text-slate-400">
                    Our team will contact you shortly to schedule your private demo.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-white mb-2">Book Private Demo</h3>
                  <p className="text-slate-400 mb-8">
                    Experience Sovereign AI on your own infrastructure.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-electric-blue transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company</label>
                        <input
                          required
                          type="text"
                          value={formData.company}
                          onChange={e => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-electric-blue transition-colors"
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Work Email</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-electric-blue transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Industry</label>
                      <select
                        value={formData.industry}
                        onChange={e => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-electric-blue transition-colors appearance-none"
                      >
                        <option value="Finance" className="bg-navy-800">Finance</option>
                        <option value="Healthcare" className="bg-navy-800">Healthcare</option>
                        <option value="Legal" className="bg-navy-800">Legal</option>
                        <option value="Government" className="bg-navy-800">Government</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-electric-blue transition-colors resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    <button
                      disabled={status === "submitting"}
                      type="submit"
                      className="w-full py-4 bg-electric-blue text-white font-bold rounded-xl hover:bg-electric-blue-light transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {status === "submitting" ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Send Request
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
