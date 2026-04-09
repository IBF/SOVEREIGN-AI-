import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Bot, Paperclip, ChevronDown, AlertTriangle, ShieldCheck } from "lucide-react";

type Vertical = "All Industries" | "Legal" | "Finance" | "Healthcare";

interface Message {
  role: "user" | "bot";
  content: string;
  riskLevel?: "low" | "medium" | "high";
}

const responses: Record<Vertical, string[]> = {
  "All Industries": [
    "I am Sovereign AI, running locally on your infrastructure. How can I assist with your secure data today?",
    "All processing is currently being handled by your local GPU cluster. No data has left the premises.",
  ],
  "Legal": [
    "I've analyzed the contract. Section 4.2 contains a high-risk liability clause that deviates from your standard template.",
    "Discovery complete. I have flagged 14 documents for potential attorney-client privilege.",
  ],
  "Finance": [
    "KYC check complete for Entity ID #8821. No red flags found in local sanctions lists.",
    "Risk score for this transaction is 24/100. This falls within your institution's automated approval threshold.",
  ],
  "Healthcare": [
    "Patient record synthesis complete. I have extracted the relevant ICD-10 codes for the recent consultation.",
    "Compliance Check: All PII has been masked in the exported summary as per your HIPAA configuration.",
  ]
};

export default function LiveDemo() {
  const [vertical, setVertical] = useState<Vertical>("All Industries");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Sovereign AI initialized. System status: Secure & Air-Gapped." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const verticalResponses = responses[vertical];
      const randomResponse = verticalResponses[Math.floor(Math.random() * verticalResponses.length)];
      
      const botMsg: Message = { 
        role: "bot", 
        content: randomResponse,
        riskLevel: vertical === "Legal" ? "high" : vertical === "Finance" ? "medium" : "low"
      };
      
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="py-32 px-6 bg-navy-900/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sovereign AI Live Demo</h2>
          <p className="text-slate-400 text-sm">
            Simulated demo — real version runs privately on your infrastructure with Ollama
          </p>
        </div>

        <div className="glass-dark rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-electric-blue" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-navy-900 rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Sovereign Core v4.2</h4>
                <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-3 h-3" />
                  Air-Gapped Mode Active
                </div>
              </div>
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium text-slate-300"
              >
                {vertical}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 glass border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    {(["All Industries", "Legal", "Finance", "Healthcare"] as Vertical[]).map((v) => (
                      <button
                        key={v}
                        onClick={() => { setVertical(v); setIsOpen(false); }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {v}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Chat Messages */}
          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 scroll-smooth">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-white/10" : "bg-electric-blue/10"
                }`}>
                  {msg.role === "user" ? <User className="w-4 h-4 text-slate-300" /> : <Bot className="w-4 h-4 text-electric-blue" />}
                </div>
                <div className={`max-w-[80%] space-y-2`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-electric-blue text-white rounded-tr-none" 
                      : "bg-white/5 text-slate-300 border border-white/5 rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                  {msg.riskLevel && (
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${
                      msg.riskLevel === "high" ? "text-rose-500" : msg.riskLevel === "medium" ? "text-amber-500" : "text-emerald-500"
                    }`}>
                      <AlertTriangle className="w-3 h-3" />
                      Risk Level: {msg.riskLevel}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-electric-blue" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex gap-1">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-6 border-t border-white/5 bg-white/5">
            <div className="relative flex items-center gap-3">
              <button className="p-2 text-slate-500 hover:text-white transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={`Ask Sovereign AI about ${vertical}...`}
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-electric-blue/50 transition-colors"
              />
              <button 
                onClick={handleSend}
                className="p-3 bg-electric-blue text-white rounded-xl hover:bg-electric-blue-light transition-all hover:scale-105 active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
