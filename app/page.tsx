"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { STORIES } from "./data/stories";

export default function Home() {
  const [lang, setLang] = useState<"en" | "id">("en");
  const [selectedStory, setSelectedStory] = useState<string>("1948");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem('detective_lang');
    if (savedLang === 'id' || savedLang === 'en') {
      setLang(savedLang);
    }
    const savedStory = localStorage.getItem('detective_story');
    if (savedStory && Object.keys(STORIES).includes(savedStory)) {
      setSelectedStory(savedStory);
    }
    setIsMounted(true);
  }, []);

  const handleLangChange = (newLang: "en" | "id") => {
    setLang(newLang);
    localStorage.setItem('detective_lang', newLang);
  };

  const handleStoryChange = (newStory: string) => {
    setSelectedStory(newStory);
    localStorage.setItem('detective_story', newStory);
  };

  if (!isMounted) return <main className="min-h-screen bg-zinc-950"></main>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600/30 shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>
      
      {/* Police tape decorative stripes */}
      <div className="absolute top-10 -left-10 w-[120%] h-8 bg-amber-500/80 -rotate-2 flex items-center justify-around overflow-hidden shadow-xl pointer-events-none z-0 mix-blend-overlay">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="text-black font-bold font-mono text-xs tracking-widest uppercase opacity-60">
            {lang === "en" ? "Police Line Do Not Cross" : "Garis Polisi Dilarang Melintas"}
          </span>
        ))}
      </div>
      
      <div className="absolute bottom-20 -left-10 w-[120%] h-8 bg-amber-500/80 rotate-3 flex items-center justify-around overflow-hidden shadow-xl pointer-events-none z-0 mix-blend-overlay">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="text-black font-bold font-mono text-xs tracking-widest uppercase opacity-60">
            {lang === "en" ? "Police Line Do Not Cross" : "Garis Polisi Dilarang Melintas"}
          </span>
        ))}
      </div>

      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex items-center bg-zinc-950/80 backdrop-blur-md rounded-md p-0.5 border border-zinc-800 shadow-xl">
          <button 
            onClick={() => handleLangChange("en")}
            className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded transition-colors ${lang === 'en' ? 'bg-amber-600 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            EN
          </button>
          <button 
            onClick={() => handleLangChange("id")}
            className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded transition-colors ${lang === 'id' ? 'bg-amber-600 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            ID
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6 py-12 flex flex-col items-center text-center space-y-8 bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-2xl">
        
        {/* Fingerprint Icon / Badge */}
        <div className="w-20 h-20 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center shadow-inner mb-4">
          <svg className="w-10 h-10 text-amber-600 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-100 tracking-tighter drop-shadow-lg uppercase">
            {lang === "en" ? (
              <>Welcome, <span className="text-amber-600 font-mono">Detective!</span></>
            ) : (
              <>Selamat Datang, <span className="text-amber-600 font-mono">Detektif!</span></>
            )}
          </h1>
        </div>

        <p className="text-lg text-zinc-300 leading-relaxed max-w-lg">
          {lang === "en" 
            ? "The suspect is waiting in the interrogation room. Ask carefully, listen closely, and make them spill the truth."
            : "Tersangka sedang menunggu di ruang interogasi. Tanyai dengan hati-hati, dengarkan baik-baik, dan buat mereka membongkar kebenaran."}
        </p>

        {/* Story Selection */}
        <div className="w-full max-w-md space-y-3 mt-4">
          <div className="text-sm font-mono tracking-widest text-zinc-400 uppercase mb-2">
            {lang === "en" ? "Select Case File" : "Pilih File Kasus"}
          </div>
          {Object.values(STORIES).map((story) => (
            <button
              key={story.id}
              onClick={() => handleStoryChange(story.id)}
              className={`w-full flex flex-col p-4 rounded-lg border transition-all text-left ${
                selectedStory === story.id
                  ? "bg-amber-600/10 border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.2)]"
                  : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-mono font-bold ${selectedStory === story.id ? "text-amber-500" : "text-zinc-300"}`}>
                  {story.title[lang]}
                </h3>
                {selectedStory === story.id && (
                  <span className="text-amber-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500">{story.description[lang]}</p>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            const audio = document.getElementById("game-audio") as HTMLAudioElement;
            if (audio) {
              audio.play().catch(() => {});
              audio.pause();
            }
            router.push("/investigation");
          }}
          className="group relative inline-flex items-center justify-center px-10 py-4 mt-6 overflow-hidden font-bold tracking-widest text-zinc-950 uppercase rounded-md bg-amber-600 hover:bg-amber-500 active:bg-amber-700 transition-all shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:shadow-[0_0_30px_rgba(217,119,6,0.6)] animate-pulse hover:animate-none"
        >
          <span>{lang === "en" ? "Begin Interrogation" : "Mulai Interogasi"}</span>
          <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </main>
  );
}
