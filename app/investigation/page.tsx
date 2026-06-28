"use client";

import React, { useState, useEffect, useRef } from "react";
import Chat from "@/app/investigation/Chat";
import Link from "next/link";
import type { SuspectId, Language, StoryId } from "./types";
import { STORIES } from "../data/stories";

const TRANSLATIONS = {
  en: {
    exit: "Exit",
    startBtn: "Start Investigation",
    enterGame: "Enter Game",
    skipBtn: "Skip",
    timeRemaining: "Time Remaining:",
    accuseBtn: "Accuse",
    roomTitle: "Interrogation Room B",
    activeSession: "Active Session",
    roomSubtitle: "Switch between suspects to question their accounts. Watch for slip-ups.",
    mapTitle: "Neighborhood Map",
    antonHouse: "Crime Scene",
    ningsihHouse: "Neighbor's House",
    baksoCart: "Corner Street",
    jono: "Street Entry",
    factsTitle: "Case Facts",
    victimLabel: "Victim",
    causeLabel: "Cause of Death",
    timeline: "Timeline of Interest",
    witnessTitle: "Witness Statement",
    witnessLabel: "Witness:",
    dossierFocus: "Dossier Focus:",
    accuseHeader: "Make Official Accusation",
    timeExpired: "TIME EXPIRED! YOU MUST SUBMIT YOUR VERDICT NOW.",
    accuseDesc: "Assess the facts. Select the culprit, their motive, and the critical clue.",
    idCulprit: "1. Identify the Culprit",
    estMotive: "2. Establish the Motive",
    selEvidence: "3. Select Key Contradictory Evidence",
    evidenceTitle: "Evidence Found",
    exhibitA: "EXHIBIT A",
    exhibitB: "EXHIBIT B",
    accuseTitle: "Submit Final Report",
    returnBtn: "Return to Case",
    submitBtn: "Submit Verdict",
    caseClosed: "Case Closed",
    apprehended: "Verdict: Culprit Apprehended",
    congrats: "Congratulations, Detective! You successfully solved the absurdity.",
    reportLabel: "2. Write Your Official Report",
    reportPlaceholder: "Explain your theory: How did they do it? And why?",
    submitting: "Chief is reviewing your report...",
    judgeFeedbackLabel: "Chief's Evaluation:",
    playAgain: "Play Again",
    caseCold: "Case Cold",
    escaped: "Verdict: Culprit Escaped",
    failed: "Your accusation failed, Detective. The suspect’s defense lawyers easily tore your theory to shreds, and the judge dismissed the charges.",
    atLarge: "The real killer remains at large, and the precinct has taken you off the case. Review the evidence log carefully and pay attention to the timeline and witness statements.",
    tip: "(Tip: One of the suspects made a crucial claim that contradicts a witness statement about the cart.)",
    retry: "Retry Case"
  },
  id: {
    exit: "Keluar",
    startBtn: "Mulai Penyelidikan",
    enterGame: "Masuk ke Permainan",
    skipBtn: "Lewati",
    timeRemaining: "Sisa Waktu:",
    accuseBtn: "Tuduh",
    roomTitle: "Ruang Interogasi B",
    activeSession: "Sesi Aktif",
    roomSubtitle: "Ganti antar tersangka untuk menanyai mereka. Perhatikan kejanggalannya.",
    mapTitle: "Peta Lingkungan",
    antonHouse: "TKP",
    ningsihHouse: "Rumah Tetangga",
    baksoCart: "Ujung Jalan",
    jono: "Jalan Masuk",
    factsTitle: "Fakta Kasus",
    victimLabel: "Korban",
    causeLabel: "Penyebab Kematian",
    timeline: "Garis Waktu Menarik",
    witnessTitle: "Pernyataan Saksi",
    witnessLabel: "Saksi:",
    dossierFocus: "Fokus Berkas:",
    accuseHeader: "Buat Tuduhan Resmi",
    timeExpired: "WAKTU HABIS! ANDA HARUS MENGIRIMKAN KEPUTUSAN SEKARANG.",
    accuseDesc: "Nilai fakta. Pilih pelaku, motif, dan petunjuk penting.",
    idCulprit: "1. Identifikasi Pelaku",
    estMotive: "2. Tetapkan Motif",
    selEvidence: "3. Pilih Bukti Kontradiktif Kunci",
    evidenceTitle: "Bukti Ditemukan",
    exhibitA: "BUKTI A",
    exhibitB: "BUKTI B",
    accuseTitle: "Serahkan Laporan Akhir",
    returnBtn: "Kembali ke Kasus",
    submitBtn: "Kirim Keputusan",
    caseClosed: "Kasus Ditutup",
    apprehended: "Keputusan: Pelaku Ditangkap",
    congrats: "Selamat, Detektif! Anda berhasil memecahkan absurditas ini.",
    reportLabel: "2. Tulis Laporan Resmi Anda",
    reportPlaceholder: "Jelaskan teori Anda: Bagaimana mereka melakukannya? Dan mengapa?",
    submitting: "Kepala Polisi sedang meninjau laporan Anda...",
    judgeFeedbackLabel: "Evaluasi Kepala Polisi:",
    playAgain: "Main Lagi",
    caseCold: "Kasus Buntu",
    escaped: "Keputusan: Pelaku Lolos",
    failed: "Tuduhan Anda gagal, Detektif. Pengacara tersangka dengan mudah menghancurkan teori Anda, dan hakim membatalkan tuduhan.",
    atLarge: "Pembunuh aslinya masih berkeliaran, dan kepolisian menarik Anda dari kasus ini. Tinjau bukti lagi dan perhatikan pernyataan saksi.",
    tip: "(Tips: Salah satu tersangka membuat klaim yang bertentangan dengan pernyataan saksi tentang gerobaknya.)",
    retry: "Coba Lagi"
  }
};

export default function InvestigationPage() {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [gameState, setGameState] = useState<"splash" | "intro" | "playing" | "accusing" | "won" | "lost">("intro");
  const [accused, setAccused] = useState<SuspectId | "">("");
  const [accusedWeapon, setAccusedWeapon] = useState("");
  const [accusedMotive, setAccusedMotive] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [judgeFeedback, setJudgeFeedback] = useState("");
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [displayedIntro1, setDisplayedIntro1] = useState("");
  const [displayedIntro2, setDisplayedIntro2] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [gameResetKey, setGameResetKey] = useState(0);
  
  const [activeStoryId, setActiveStoryId] = useState<StoryId>("1948");
  const [activeSuspectId, setActiveSuspectId] = useState<SuspectId>("");
  const [language, setLanguage] = useState<Language>("en");
  const [isLangLoaded, setIsLangLoaded] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('detective_lang');
    if (saved === 'id' || saved === 'en') {
      setLanguage(saved);
    }
    const savedStory = localStorage.getItem('detective_story');
    if (savedStory && Object.keys(STORIES).includes(savedStory)) {
      setActiveStoryId(savedStory);
    }
    setIsLangLoaded(true);
  }, []);

  const story = STORIES[activeStoryId];
  const t = TRANSLATIONS[language];

  // Set initial active suspect once story loads
  useEffect(() => {
    if (isLangLoaded && activeSuspectId === "" && story) {
      setActiveSuspectId(story.suspects[language][0].id);
    }
  }, [isLangLoaded, story, activeSuspectId, language]);

  // Timer interval hook
  useEffect(() => {
    if (gameState !== "playing") return;

    if (timeLeft <= 0) {
      setGameState("accusing");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  // Reset Intro when language changes
  useEffect(() => {
    if (gameState === "intro") {
      setAudioUrl(null);
      setIsAudioPlaying(false);
      setIsIntroFinished(false);
      setDisplayedIntro1("");
      setDisplayedIntro2("");
    }
  }, [language, gameState]);

  // Intro Typewriter & Voiceover Effect
  useEffect(() => {
    let isCancelled = false;
    
    if (gameState === "intro" && !audioUrl) {
      const fetchAudio = async () => {
        setIsLoadingAudio(true);
        
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        try {
          const res = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: story.introDesc1[language] + " " + story.introDesc2[language],
              language
            }),
            signal: abortControllerRef.current.signal
          });
          
          if (!res.ok) throw new Error("TTS failed");
          
          const blob = await res.blob();
          if (isCancelled) return;
          
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        } catch (error: any) {
          if (isCancelled) return;
          if (error.name === 'AbortError') {
            console.log("Intro TTS fetch aborted");
            return;
          }
          console.error(error);
          // Fallback if audio fails: start text
          setIsAudioPlaying(true); 
        } finally {
          if (!isCancelled) setIsLoadingAudio(false);
        }
      };
      
      fetchAudio();
    }
    
    return () => {
      isCancelled = true;
    };
  }, [gameState, language, story, audioUrl]);

  // Play audio when ready
  useEffect(() => {
    if (gameState === "intro" && audioUrl && !isAudioPlaying && !isIntroFinished) {
      const audio = document.getElementById("game-audio") as HTMLAudioElement;
      if (audio) {
        audio.src = audioUrl;
        audio.onplay = () => setIsAudioPlaying(true);
        audio.onended = () => setIsIntroFinished(true);
        audio.play().catch((err) => {
          console.error("Intro audio blocked:", err);
          setIsAudioPlaying(true); // Fallback to start text
        });
      }
    }
  }, [gameState, audioUrl, isAudioPlaying]);

  // Start Typewriter when audio starts playing
  useEffect(() => {
    if (gameState === "intro" && isAudioPlaying && !isIntroFinished && story) {
      const text1 = story.introDesc1[language];
      const text2 = story.introDesc2[language];
      
      let i = 0;
      let j = 0;
      
      let interval2: NodeJS.Timeout;
      const interval1 = setInterval(() => {
        setDisplayedIntro1(text1.substring(0, i));
        i++;
        if (i > text1.length) {
          clearInterval(interval1);
          interval2 = setInterval(() => {
            setDisplayedIntro2(text2.substring(0, j));
            j++;
            if (j > text2.length) {
              clearInterval(interval2);
              setIsIntroFinished(true);
            }
          }, 45); // Slower typewriter to better match Onyx
        }
      }, 45);

      return () => {
        clearInterval(interval1);
        if (interval2) clearInterval(interval2);
      };
    }
  }, [gameState, isAudioPlaying, isIntroFinished, language, story]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAccuseSubmit = async () => {
    if (!accused || !accusedWeapon.trim() || !accusedMotive.trim()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suspectId: accused,
          weapon: accusedWeapon,
          motive: accusedMotive,
          language,
          storyId: activeStoryId
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reach the Chief.");
      }

      const data = await response.json();
      setJudgeFeedback(data.feedback || "");
      
      if (data.solved) {
        setGameState("won");
      } else {
        setGameState("lost");
      }
    } catch (error) {
      console.error(error);
      setJudgeFeedback(language === "en" ? "System error evaluating report." : "Kesalahan sistem mengevaluasi laporan.");
      setGameState("lost");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setTimeLeft(600);
    setAccused("");
    setAccusedWeapon("");
    setAccusedMotive("");
    setJudgeFeedback("");
    setGameState("intro");
    setActiveSuspectId(story.suspects[language][0].id);
    setAudioUrl(null);
    setIsAudioPlaying(false);
    setIsIntroFinished(false);
    setDisplayedIntro1("");
    setDisplayedIntro2("");
    setGameResetKey((prev) => prev + 1);
  };

  const activeSuspect = story.suspects[language].find(s => s.id === activeSuspectId) || story.suspects[language][0];
  const activeStatement = story.witnessStatements[language][activeSuspectId as keyof typeof story.witnessStatements.en] || { text: "", details: "" };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans select-none">
      
      {/* Header bar */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono uppercase text-zinc-400 hover:text-amber-500 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t.exit}
          </Link>
          <div className="h-4 w-px bg-zinc-800" />
          <h1 className="text-sm font-mono tracking-widest uppercase text-amber-500 font-semibold hidden md:block">
            {story.title[language]}
          </h1>
        </div>

        {/* Tools (Timer) */}
        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase hidden sm:inline">{t.timeRemaining}</span>
            <span className={`font-mono text-sm font-bold px-2 py-0.5 rounded border transition-colors ${
              timeLeft < 60
                ? "bg-red-950/40 text-red-500 border-red-900/50 animate-pulse"
                : "bg-zinc-900 text-amber-500 border-zinc-800"
            }`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          {gameState === "playing" && (
            <button
              onClick={() => setGameState("accusing")}
              className="rounded bg-amber-600 hover:bg-amber-500 active:bg-amber-700 px-3 py-1 text-xs font-semibold text-zinc-950 transition-colors"
            >
              {t.accuseBtn}
            </button>
          )}
        </div>
      </header>



      {/* Intro state layout */}
      {gameState === "intro" && (
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 max-w-2xl mx-auto w-full">
          <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-8 backdrop-blur-md shadow-2xl flex flex-col items-center text-center gap-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-amber-950/80 border border-amber-600 flex items-center justify-center text-amber-500 mb-2">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-widest text-zinc-100 font-mono uppercase">
                {story.introTitle[language]}
              </h2>
            </div>

            <div className="text-sm leading-relaxed text-zinc-300 font-sans max-w-lg space-y-4 text-left min-h-[160px]">
              {isLoadingAudio && !isAudioPlaying && (
                <div className="flex items-center gap-2 text-amber-600/50 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  <span className="text-xs uppercase tracking-widest font-mono">Loading...</span>
                </div>
              )}
              <p>{displayedIntro1}</p>
              <p>{displayedIntro2}</p>
            </div>

            <div className="flex flex-col items-center gap-3 w-full mt-4">
              <button
                onClick={() => {
                  const audio = document.getElementById("game-audio") as HTMLAudioElement;
                  if (audio) {
                    audio.play().catch(() => {});
                    audio.pause();
                  }
                  setGameState("playing");
                }}
                disabled={!isIntroFinished}
                className="w-full sm:w-auto rounded-md bg-amber-600 hover:bg-amber-500 active:bg-amber-700 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed px-12 py-3 text-sm font-bold text-zinc-950 transition-colors uppercase tracking-wider shadow-lg"
              >
                {t.startBtn}
              </button>
              {!isIntroFinished && (
                <button 
                  onClick={() => {
                    setIsIntroFinished(true);
                    setDisplayedIntro1(story.introDesc1[language]);
                    setDisplayedIntro2(story.introDesc2[language]);
                    
                    if (abortControllerRef.current) {
                      abortControllerRef.current.abort();
                    }
                    
                    const audioEl = document.querySelector('audio');
                    if (audioEl) {
                      audioEl.pause();
                    }
                  }}
                  className="text-xs text-zinc-500 hover:text-zinc-300 font-mono tracking-wider transition-colors"
                >
                  [{t.skipBtn}]
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Playing state layout */}
      {gameState === "playing" && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {/* 1. Crime Scene Pictures */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            <div className="mb-2 lg:mb-6">
              <h3 className="text-xs font-mono tracking-wider uppercase text-amber-500 mb-3 border-b border-zinc-800 pb-1.5 font-bold">
                {t.evidenceTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {story.exhibits[language].map((exhibit) => (
                  <div key={exhibit.id} className="relative group cursor-pointer" onClick={() => setFullscreenImage(exhibit.imageSrc)}>
                    <div className="absolute top-2 left-2 bg-zinc-950/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-amber-500 border border-amber-600/30 z-10">
                      {exhibit.title.toUpperCase()}
                    </div>
                    <img 
                      src={exhibit.imageSrc} 
                      alt={exhibit.title}
                      className="w-full h-32 object-cover rounded border border-zinc-700 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                      <span className="text-white text-xs font-mono border border-white/50 px-2 py-1 rounded backdrop-blur-sm">Click to Expand</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Chat / Interrogation Panel */}
          <div className="lg:col-span-2 flex flex-col justify-start order-3 lg:order-3">
            <div className="mb-4">
              <h2 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
                <span>{t.roomTitle}</span>
                <span className="text-xs font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-normal">{t.activeSession}</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {t.roomSubtitle}
              </p>
            </div>
            <Chat 
              language={language}
              activeSuspectId={activeSuspectId} 
              setActiveSuspectId={setActiveSuspectId} 
              key={gameResetKey} 
              storyId={activeStoryId}
            />
          </div>

          {/* 2. Dossier / Case File */}
          <div className="flex flex-col gap-6 lg:col-span-1 lg:row-span-2 order-2 lg:order-2">
            {/* SVG Neighborhood Map */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 backdrop-blur-sm">
              <h3 className="text-xs font-mono tracking-wider uppercase text-amber-500 mb-3 border-b border-zinc-800 pb-1.5 font-bold">
                {t.mapTitle}
              </h3>
              <div className="w-full aspect-video bg-zinc-950 rounded border border-zinc-800 relative overflow-hidden flex items-center justify-center p-2">
                {/* Simplified map implementation for dynamic stories would go here */}
                <span className="text-[10px] text-zinc-600 font-mono">Map Unavailable</span>
              </div>
            </div>

            {/* Case Fact Sheet */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 backdrop-blur-sm">
              <h3 className="text-xs font-mono tracking-wider uppercase text-amber-500 mb-3 border-b border-zinc-800 pb-1.5 font-bold">
                {t.factsTitle}
              </h3>
              <div className="space-y-3.5 text-xs text-zinc-300">
                {story.facts[language].map((fact, i) => (
                  <p key={i}>• {fact}</p>
                ))}
              </div>
            </div>

            {/* Dynamic Witness Statement */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 backdrop-blur-sm flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-mono tracking-wider uppercase text-amber-500 mb-3 border-b border-zinc-800 pb-1.5 font-bold">
                  {t.witnessTitle}
                </h3>
                <div className="space-y-3 text-xs leading-relaxed text-zinc-300 font-mono">
                  <span className="text-[10px] text-amber-500/80 uppercase block">{t.witnessLabel} {activeSuspect.name}</span>
                  <p className="italic text-zinc-200">
                    {activeStatement.text}
                  </p>
                  <p className="text-zinc-400">
                    {activeStatement.details}
                  </p>
                </div>
              </div>
              <div className="text-[9px] font-mono text-zinc-600 mt-4 border-t border-zinc-900 pt-2 text-right uppercase">
                {t.dossierFocus} {activeSuspectId.replace("_", " ")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accusation Screen Overlay */}
      {gameState === "accusing" && (
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 max-w-2xl mx-auto w-full">
          <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6">
            
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-100 uppercase font-mono">
                {t.accuseHeader}
              </h2>
              {timeLeft <= 0 ? (
                <p className="text-xs text-red-500 font-mono mt-1 animate-pulse">
                  {t.timeExpired}
                </p>
              ) : (
                <p className="text-xs text-zinc-400 mt-1">
                  {t.accuseDesc}
                </p>
              )}
            </div>

            {/* Select Culprit */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                {t.idCulprit}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {story.suspects[language].map((suspect) => (
                  <label key={suspect.id} className={`flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-all ${accused === suspect.id ? 'bg-red-950/30 border-red-500' : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500'}`}>
                    <input type="radio" name="culprit" value={suspect.id} checked={accused === suspect.id} onChange={(e) => setAccused(e.target.value as SuspectId)} className="sr-only" />
                    <img src={suspect.imageSrc} alt={suspect.name} className="w-16 h-16 rounded-full border-2 border-zinc-800 mb-2 object-cover" />
                    <span className="text-xs font-bold text-zinc-300">{suspect.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Weapon Options */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                {language === "en" ? "2. Identify the Weapon" : "2. Identifikasi Senjata"}
              </label>
              <div className="space-y-2">
                {Object.entries(story.evidences[language]).map(([key, label]) => (
                  <label key={key} className={`flex items-start p-3 rounded border cursor-pointer transition-all ${accusedWeapon === key ? 'bg-red-950/20 border-red-500/50' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'}`}>
                    <input type="radio" name="weapon" value={key} checked={accusedWeapon === key} onChange={(e) => setAccusedWeapon(e.target.value)} className="mt-1 mr-3 text-red-500 focus:ring-red-500 bg-zinc-800 border-zinc-700" />
                    <span className="text-sm text-zinc-300">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Motive Options */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                {t.estMotive}
              </label>
              <div className="space-y-2">
                {Object.entries(story.motives[language]).map(([key, label]) => (
                  <label key={key} className={`flex items-start p-3 rounded border cursor-pointer transition-all ${accusedMotive === key ? 'bg-red-950/20 border-red-500/50' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'}`}>
                    <input type="radio" name="motive" value={key} checked={accusedMotive === key} onChange={(e) => setAccusedMotive(e.target.value)} className="mt-1 mr-3 text-red-500 focus:ring-red-500 bg-zinc-800 border-zinc-700" />
                    <span className="text-sm text-zinc-300">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 border-t border-zinc-800 pt-4 mt-2">
              {timeLeft > 0 && (
                <button
                  onClick={() => setGameState("playing")}
                  className="flex-1 rounded-md bg-zinc-800 hover:bg-zinc-750 px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors"
                >
                  {t.returnBtn}
                </button>
              )}
              <button
                onClick={handleAccuseSubmit}
                disabled={!accused || !accusedWeapon.trim() || !accusedMotive.trim() || isSubmitting}
                className="flex-1 rounded-md bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
                    {t.submitting}
                  </>
                ) : (
                  t.submitBtn
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Shared audio element for mobile autoplay unlocking */}
      <audio id="game-audio" className="hidden" playsInline />

      {/* Victory Screen */}
      {gameState === "won" && (
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 max-w-2xl mx-auto w-full">
          <div className="w-full rounded-xl border border-emerald-900 bg-emerald-950/20 p-8 backdrop-blur-md shadow-2xl flex flex-col items-center text-center gap-6 animate-fade-in">
            
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500 flex items-center justify-center text-emerald-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-widest text-emerald-400 font-mono uppercase">
                {t.caseClosed}
              </h2>
              <p className="text-xs font-mono text-emerald-600 uppercase tracking-widest">
                {t.apprehended}
              </p>
            </div>

            <div className="text-sm leading-relaxed text-zinc-300 font-sans max-w-md">
              <p className="mb-2">
                <strong>{t.congrats}</strong> 
              </p>
              <div className="bg-emerald-950 border border-emerald-800 p-4 rounded-lg mt-4 text-left">
                <span className="text-xs font-mono text-emerald-500 block mb-2">{t.judgeFeedbackLabel}</span>
                <p className="text-emerald-300 italic">"{judgeFeedback}"</p>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="mt-4 rounded-md bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition-colors"
            >
              {t.playAgain}
            </button>

          </div>
        </div>
      )}

      {/* Defeat Screen */}
      {gameState === "lost" && (
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 max-w-2xl mx-auto w-full">
          <div className="w-full rounded-xl border border-red-900 bg-red-950/20 p-8 backdrop-blur-md shadow-2xl flex flex-col items-center text-center gap-6 animate-fade-in">
            
            <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-500 flex items-center justify-center text-red-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <div className="space-y-2">
              <h1 className="text-sm font-bold tracking-widest text-zinc-400 font-mono uppercase">
                {story.title[language]}
              </h1>
              <h2 className="text-3xl font-extrabold tracking-widest text-red-400 font-mono uppercase">
                {t.caseCold}
              </h2>
              <p className="text-xs font-mono text-red-600 uppercase tracking-widest">
                {t.escaped}
              </p>
            </div>

            <div className="text-sm leading-relaxed text-zinc-300 font-sans max-w-md">
              <p className="mb-2">
                {t.failed}
              </p>
              <div className="bg-red-950 border border-red-800 p-4 rounded-lg mt-4 text-left">
                <span className="text-xs font-mono text-red-500 block mb-2">{t.judgeFeedbackLabel}</span>
                <p className="text-red-300 italic">"{judgeFeedback}"</p>
              </div>
              <p className="text-zinc-500 text-xs italic">
                {t.tip}
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="mt-4 rounded-md bg-zinc-800 hover:bg-zinc-700 px-6 py-2.5 text-sm font-semibold text-zinc-300 transition-colors"
            >
              {t.retry}
            </button>

          </div>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm cursor-pointer"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center group">
            <button 
              className="absolute -top-12 right-0 text-zinc-400 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setFullscreenImage(null); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={fullscreenImage} 
              alt="Fullscreen Evidence" 
              className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl ring-1 ring-zinc-800"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </main>
  );
}