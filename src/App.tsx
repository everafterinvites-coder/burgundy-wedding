import React, { useState, useEffect, useRef } from "react";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Image as ImageIcon, 
  Sparkles, 
  Upload, 
  Trash2, 
  Shield, 
  Eye, 
  Download, 
  LogIn, 
  Lock, 
  Instagram, 
  Check, 
  RefreshCw,
  ChevronRight,
  Sparkle,
  Volume2,
  VolumeX,
  Database
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  addRsvp, 
  getRsvps, 
  deleteRsvp, 
  addPhoto, 
  subscribeToPhotos, 
  deletePhoto 
} from "./firebase";
import {
  isSupabaseConfigured,
  getSupabaseCredentials,
  saveSupabaseCredentials,
  clearSupabaseCredentials,
  testSupabaseConnection,
  syncRsvpToSupabase,
  syncPhotoToSupabase,
  deleteRsvpFromSupabase,
  deletePhotoFromSupabase,
  fetchSupabaseRsvps,
  fetchSupabasePhotos,
  SUPABASE_SQL_SCHEMA
} from "./supabase";

const SAMPLE_GALLERY = [
  {
    id: "sample-1",
    guestName: "Yara & Ahmed",
    caption: "Our Engagement Session in Cairo",
    photoUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString()
  },
  {
    id: "sample-2",
    guestName: "Nour & Karim",
    caption: "Can't wait to celebrate with you!",
    photoUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString()
  },
  {
    id: "sample-3",
    guestName: "Ever After Invites",
    caption: "Perfect day for a perfect couple",
    photoUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [curtainEnded, setCurtainEnded] = useState(false);
  const [skipCurtain, setSkipCurtain] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(console.error);
    }
  };

  useEffect(() => {
    const showMain = curtainEnded || skipCurtain;
    if (showMain && audioRef.current) {
      const timer = setTimeout(() => {
        audioRef.current?.play().then(() => setIsPlayingAudio(true)).catch(() => setIsPlayingAudio(false));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [curtainEnded, skipCurtain]);

  const [mediaErrors, setMediaErrors] = useState<Record<string, boolean>>({});
  const handleMediaError = (key: string) => setMediaErrors((prev) => ({ ...prev, [key]: true }));
  const isVideoFile = (url: string) => {
    const trimmed = url.toLowerCase().split('?')[0];
    return trimmed.endsWith(".mp4") || trimmed.endsWith(".webm") || trimmed.endsWith(".mov");
  };

  const showMainSite = curtainEnded || skipCurtain;

  return (
    <div className="min-h-screen bg-burgundy-950 text-burgundy-50 font-sans relative overflow-x-hidden">
      
      <audio
        ref={audioRef}
        src="media/sparks.mp3"
        loop
        preload="auto"
      />

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
                isVideoFile("media/curtains.MOV") ? (
                  <video 
                    src="media/curtains.MOV" 
                    autoPlay 
                    muted 
                    playsInline
                    onEnded={() => setCurtainEnded(true)}
                    onError={() => handleMediaError("curtains")}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src="media/curtains.MOV" 
                    alt="Wedding Curtains"
                    onError={() => handleMediaError("curtains")}
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-burgundy-950 via-burgundy-800 to-burgundy-950" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showMainSite && (
        <div className="relative">
           {/* Rest of your site content goes here... */}
           <h1 className="text-center pt-20">Welcome to Yara x Ahmed's Wedding</h1>
        </div>
      )}
    </div>
  );
}
