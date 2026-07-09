import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [curtainEnded, setCurtainEnded] = useState(false);
  const [skipCurtain, setSkipCurtain] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [mediaErrors, setMediaErrors] = useState<Record<string, boolean>>({});
  const handleMediaError = (key: string) => setMediaErrors((prev) => ({ ...prev, [key]: true }));

  const showMainSite = curtainEnded || skipCurtain;
  
  // This ensures the path correctly points to /burgundy-wedding/media/
  const basePath = "/burgundy-wedding";

  return (
    <div className="min-h-screen bg-burgundy-950 text-burgundy-50 font-sans relative overflow-x-hidden">
      <audio ref={audioRef} src={`${basePath}/media/sparks.mp3`} loop preload="auto" />

      <AnimatePresence>
        {!showMainSite && (
          <motion.div 
            key="curtains-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            onClick={() => setSkipCurtain(true)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-burgundy-950 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 w-full h-full object-cover">
              {!mediaErrors["curtains"] ? (
                <video 
                  src={`${basePath}/media/curtains.mp4`} 
                  autoPlay 
                  muted 
                  playsInline
                  onEnded={() => setCurtainEnded(true)}
                  onError={() => handleMediaError("curtains")}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-burgundy-950 via-burgundy-800 to-burgundy-950" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen w-full">
        <div className="absolute inset-0 z-0 w-full h-full">
          <video 
            src={`${basePath}/media/chandelier.mp4`} 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
          <div className="bg-burgundy-950/80 p-10 rounded-xl text-center shadow-2xl border border-gold-500/30">
            <h1 className="text-5xl font-serif text-cream-100">
              Yara & Ahmed
            </h1>
            <p className="mt-6 text-xl text-cream-200">We are so excited to celebrate with you!</p>
            
            <div className="h-[1000px] mt-10">
              <p className="text-sm text-gold-300">Scroll down to see more...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
