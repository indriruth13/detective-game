"use client";

import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import type { Message, Suspect, SuspectId, Language, StoryId } from "./types";
import { STORIES } from "../data/stories";

interface ChatProps {
  activeSuspectId: SuspectId;
  setActiveSuspectId: (id: SuspectId) => void;
  language: Language;
  storyId: StoryId;
}

export default function Chat({ activeSuspectId, setActiveSuspectId, language, storyId }: ChatProps) {
  const story = STORIES[storyId] || STORIES["1948"];
  const SUSPECTS = story.suspects[language];
  const t = {
    interrogating: language === "en" ? "Interrogating" : "Interogasi",
    ask: language === "en" ? "Ask" : "Tanya",
    placeholder: language === "en" ? "Question" : "Tanya",
    thinking: language === "en" ? "Thinking" : "Berpikir",
    thinkingDesc: language === "en" ? "*Thinking... formulating a careful response...*" : "*Berpikir... menyusun jawaban hati-hati...*",
    holdToSpeak: language === "en" ? "Hold" : "Tahan"
  };

  const [messages, setMessages] = useState<Record<SuspectId, Message[]>>(() => {
    const initialMsgs: Record<SuspectId, Message[]> = {};
    SUSPECTS.forEach(s => {
      initialMsgs[s.id] = [];
    });
    return initialMsgs;
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const activeSuspectRef = useRef(activeSuspectId);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    activeSuspectRef.current = activeSuspectId;
  }, [activeSuspectId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, activeSuspectId, loading]);

  const stopAudio = () => {
    const gameAudio = document.getElementById("game-audio") as HTMLAudioElement;
    if (gameAudio) {
      gameAudio.pause();
      gameAudio.src = "";
    }
  };

  const playTTS = async (text: string, suspectId: SuspectId) => {
    stopAudio();
    const voice = suspectId === "ningsih" ? "nova" : suspectId === "jono" ? "echo" : "onyx";
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language, voice }),
        signal: abortControllerRef.current.signal
      });
      if (res.ok) {
        const blob = await res.blob();
        
        // If the user already switched to another suspect, ignore this audio
        if (suspectId !== activeSuspectRef.current) return;

        const url = URL.createObjectURL(blob);
        const gameAudio = document.getElementById("game-audio") as HTMLAudioElement;
        
        if (gameAudio) {
          gameAudio.src = url;
          gameAudio.play().catch(e => console.error("Auto-play blocked:", e));
        } else {
          // Fallback for desktop/if element missing
          const audio = new Audio(url);
          currentAudioRef.current = audio;
          audio.play().catch(e => console.error("Auto-play blocked:", e));
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log("TTS fetch aborted");
      } else {
        console.error("TTS Error:", err);
      }
    }
  };

  useEffect(() => {
    // Handle initial message typing effect and voice
    if (messages[activeSuspectId].length === 0) {
      setLoading(true);
      const currentId = activeSuspectId;
      const suspect = SUSPECTS.find(s => s.id === currentId)!;
      const initialText = suspect.initialMessage;
      
      // Small timeout to simulate typing/loading before saying first line
      const timer = setTimeout(() => {
        setMessages(prev => {
          if (prev[currentId].length > 0) return prev;
          return {
            ...prev,
            [currentId]: [{ role: "assistant", content: initialText }]
          };
        });
        setLoading(false);
        playTTS(initialText, currentId);
      }, 1200);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSuspectId]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach(track => track.stop());
        
        if (audioBlob.size > 0) {
          setLoading(true);
          const formData = new FormData();
          formData.append("file", audioBlob, "recording.webm");
          formData.append("language", language);
          
          try {
            const res = await fetch("/api/transcribe", {
              method: "POST",
              body: formData
            });
            const data = await res.json();
            if (data.text) {
              await sendMessage(data.text);
            }
          } catch (err) {
            console.error("Transcription error:", err);
          } finally {
            setLoading(false);
          }
        }
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic access denied:", err);
      alert("Microphone access is required for voice input.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };



  const activeSuspect = SUSPECTS.find((s) => s.id === activeSuspectId) || SUSPECTS[0];
  const activeMessages = messages[activeSuspectId];

  async function sendMessage(textOverride?: string) {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || loading) return;

    stopAudio();

    const userMessage: Message = { role: "user", content: textToSend };
    const updatedActiveMessages = [...activeMessages, userMessage];

    setMessages((prev) => ({
      ...prev,
      [activeSuspectId]: updatedActiveMessages
    }));
    
    if (!textOverride) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          messages: updatedActiveMessages,
          suspectId: activeSuspectId,
          language,
          storyId
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => ({
        ...prev,
        [activeSuspectId]: [
          ...updatedActiveMessages,
          { role: "assistant", content: data.reply }
        ]
      }));

      // Play the TTS response (excluding gesture text in asterisks)
      const spokenReply = data.reply.replace(/\*.*?\*/g, "").trim();
      if (spokenReply) {
        playTTS(spokenReply, activeSuspectId);
      }
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages((prev) => ({
        ...prev,
        [activeSuspectId]: [
          ...updatedActiveMessages,
          {
            role: "assistant",
            content: `*System Error: ${err.message || "Failed to get response from suspect."}* 

**Troubleshooting Advice:**
Please verify that your server's \`.env.local\` file has a valid \`OPENAI_API_KEY\` set up.`,
          }
        ]
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[600px] flex-col rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-md shadow-2xl overflow-hidden">
      
      {/* Suspect Selector Tabs (Polaroids) */}
      <div className="flex justify-center gap-4 border-b border-zinc-800 bg-zinc-900/40 p-4 select-none">
        {SUSPECTS.map((suspect) => {
          const isActive = suspect.id === activeSuspectId;
          return (
            <button
              key={suspect.id}
              onClick={() => {
                if (!loading) {
                  stopAudio();
                  setActiveSuspectId(suspect.id);
                }
              }}
              disabled={loading}
              className={`flex flex-col items-center p-2 rounded-sm bg-zinc-100 transition-all ${
                isActive
                  ? "border-2 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-105 z-10 rotate-1"
                  : "border-2 border-zinc-200 shadow-md grayscale-[50%] hover:scale-105 -rotate-1 hover:z-10"
              } disabled:opacity-50 disabled:cursor-not-allowed w-28`}
            >
              <div className="w-24 h-24 bg-zinc-900 border border-zinc-300 flex items-center justify-center mb-2 overflow-hidden">
                <img src={suspect.imageSrc} alt={suspect.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-bold font-marker text-zinc-900 leading-tight w-full text-center">{suspect.name}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
            {t.interrogating}: {activeSuspect.name}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatContainerRef} className="flex-1 space-y-4 overflow-y-auto p-4 custom-scrollbar bg-zinc-950/20">
        {activeMessages.map((message, index) => (
          <ChatMessage
            key={index}
            role={message.role === "system" ? "assistant" : message.role}
            content={message.content}
            suspectName={activeSuspect.name}
          />
        ))}
        {loading && (
          <div className="flex w-full flex-col gap-1 items-start my-3 animate-pulse">
            <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-amber-950/20 text-amber-600/70 border border-amber-950/20">
              {activeSuspect.name} ({t.thinking}...)
            </span>
            <div className="max-w-[80%] rounded-lg px-4 py-3 bg-zinc-950/30 border border-zinc-900 text-zinc-500 rounded-tl-none font-mono text-xs">
              {t.thinkingDesc}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer / Input */}
      <div className="flex gap-2 border-t border-zinc-800 bg-zinc-900/30 p-4 relative">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder={`${t.placeholder} ${activeSuspect.name}...`}
          className="flex-1 rounded-md border border-zinc-800 bg-zinc-950/80 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:border-amber-500/50 focus:outline-none transition-colors"
          disabled={loading || isRecording}
        />

        <button
          onPointerDown={(e) => { e.preventDefault(); startRecording(); }}
          onPointerUp={(e) => { e.preventDefault(); stopRecording(); }}
          onPointerLeave={stopRecording}
          onPointerCancel={stopRecording}
          onContextMenu={(e) => e.preventDefault()}
          disabled={loading}
          style={{ WebkitTouchCallout: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
          className={`flex items-center justify-center h-10 w-10 sm:w-auto sm:px-4 gap-1.5 rounded-md font-semibold text-zinc-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed select-none touch-none ${
            isRecording 
              ? "bg-red-600 animate-pulse hover:bg-red-500" 
              : "bg-zinc-200 hover:bg-white"
          }`}
          title="Hold to speak"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <span className="hidden sm:inline text-xs">{isRecording ? "..." : t.holdToSpeak}</span>
        </button>

        <button
          onClick={() => sendMessage()}
          disabled={loading || isRecording || !input.trim()}
          className="flex items-center justify-center h-10 w-10 sm:w-auto sm:px-4 gap-1.5 rounded-md bg-amber-600 hover:bg-amber-500 active:bg-amber-700 font-semibold text-zinc-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">{t.ask}</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
