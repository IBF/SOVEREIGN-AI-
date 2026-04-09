import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Shield, RefreshCw } from "lucide-react";

const explanationSlides = [
  {
    text: "Zero Token Fees",
    sub: "Pay once per year. Use the AI as much as you want. No surprise bills."
  },
  {
    text: "Complete Data Sovereignty",
    sub: "All processing happens on your infrastructure. Data never leaves your company."
  },
  {
    text: "Predictable Cost",
    sub: "Fixed annual license instead of unpredictable per-token cloud pricing."
  },
  {
    text: "True Air-Gapped Ready",
    sub: "Works offline in secure environments with no external dependencies."
  },
  {
    text: "Built for Regulated Industries",
    sub: "Designed for HIPAA, SOX, and PCI-DSS compliance from the ground up."
  },
  {
    text: "No Vendor Lock-in",
    sub: "You own the system. Run it forever without relying on any cloud provider."
  },
  {
    text: "Enterprise-Grade Privacy",
    sub: "Full audit logs, differential privacy, and on-prem deployment."
  },
  {
    text: "Pay once. Use unlimited.",
    sub: "Own everything. Stop paying for every prompt."
  },
  {
    text: "Your data. Your AI. Your rules.",
    sub: "Compliance without compromise."
  },
  {
    text: "The AI that never phones home.",
    sub: "Fixed cost. Unlimited intelligence."
  }
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&%*";

function FluctuatingCharacter({ delay }: { delay: number; key?: React.Key }) {
  const [char, setChar] = useState(CHARS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChar(CHARS[Math.floor(Math.random() * CHARS.length)]);
    }, 150 + Math.random() * 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0, y: 100 }}
      animate={{ 
        opacity: [0, 0.4, 0],
        y: -100,
      }}
      transition={{ 
        duration: 5 + Math.random() * 5,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      className="absolute text-[10px] font-mono text-electric-blue/40 pointer-events-none select-none"
      style={{ 
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
    >
      {char}
    </motion.span>
  );
}

export default function PremiumVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startVideo = () => {
    setIsPlaying(true);
    setIsEnded(false);
    setCurrentSlide(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.4;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (isPlaying && !isEnded) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev < explanationSlides.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              setIsEnded(true);
              if (audioRef.current) {
                // Fade out audio slightly at the end
                const fadeOut = setInterval(() => {
                  if (audioRef.current && audioRef.current.volume > 0.05) {
                    audioRef.current.volume -= 0.05;
                  } else {
                    clearInterval(fadeOut);
                  }
                }, 100);
              }
            }, 2000);
            return prev;
          }
        });
      }, 3500); // Slightly faster transitions for more content
      return () => clearInterval(interval);
    }
  }, [isPlaying, isEnded]);

  const dataParticles = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => (
      <FluctuatingCharacter key={i} delay={i * 0.2} />
    )), 
  []);

  return (
    <div className="relative w-full h-full group overflow-hidden bg-black">
      {/* Background Futuristic City Video */}
      <video
        ref={videoRef}
        muted
        loop={!isPlaying}
        playsInline
        className={`w-full h-full object-cover transition-all duration-2000 ${
          isPlaying ? "scale-110 blur-[2px] brightness-[0.3]" : "scale-100 brightness-50"
        }`}
        src="https://cdn.pixabay.com/video/2021/09/01/87061-600329482_large.mp4"
      />

      {/* Background Music */}
      <audio 
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-delicate-ambient-111.mp3"
        loop
      />

      {/* Digital Character Layer */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {dataParticles}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/80 z-20" />

      {/* Initial Play State */}
      {!isPlaying && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              onClick={startVideo}
              className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center cursor-pointer group/play relative"
            >
              <div className="absolute inset-0 rounded-full border border-electric-blue/50 animate-ping opacity-20" />
              <Play className="w-10 h-10 text-white fill-white group-hover/play:text-electric-blue group-hover/play:fill-electric-blue transition-colors ml-1" />
            </motion.button>
            <motion.p 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-6 text-white font-bold tracking-[0.4em] uppercase text-[10px] opacity-60"
            >
              Initiate Sovereign Protocol
            </motion.p>
          </motion.div>
        </div>
      )}

      {/* Explanation Sequence */}
      <AnimatePresence mode="wait">
        {isPlaying && !isEnded && (
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              className="h-1 bg-electric-blue mb-8"
            />
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tighter leading-tight">
              {explanationSlides[currentSlide].text}
            </h2>
            <p className="text-electric-blue-light text-sm md:text-xl lg:text-2xl font-light tracking-wide max-w-2xl px-4">
              {explanationSlides[currentSlide].sub}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Logo Reveal */}
      <AnimatePresence>
        {isEnded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 border border-electric-blue/10 rounded-full"
                />
                <div className="p-8 bg-electric-blue/5 rounded-[2.5rem] border border-electric-blue/20 relative z-10">
                  <Shield className="w-28 h-28 text-electric-blue" />
                </div>
              </div>
              
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-2">
                  SOVEREIGN AI
                </h1>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent mb-4" />
                <p className="text-slate-500 font-bold tracking-[0.5em] uppercase text-xs">
                  Engineering Sovereign Intelligence
                </p>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05, color: "#fff" }}
                onClick={startVideo}
                className="mt-16 flex items-center gap-3 text-slate-500 transition-all text-xs font-black uppercase tracking-[0.2em]"
              >
                <RefreshCw className="w-4 h-4" />
                Restart Protocol
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      {isPlaying && !isEnded && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 z-50">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: explanationSlides.length * 4 + 2, ease: "linear" }}
            className="h-full bg-electric-blue shadow-[0_0_20px_#3b82f6]"
          />
        </div>
      )}
    </div>
  );
}
