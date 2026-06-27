import React from "react";

type Props = {
  role: "user" | "assistant";
  content: string;
  suspectName?: string;
};

function parseMarkdown(text: string): React.ReactNode[] {
  const paragraphs = text.split("\n");
  return paragraphs.map((paragraph, pIdx) => {
    if (!paragraph.trim()) return <br key={pIdx} />;
    
    // Parse bold (**) and italics (*)
    const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
    const parts = paragraph.split(regex);
    
    const parsedLine = parts.map((part, partIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={partIdx} className="font-bold text-amber-400">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={partIdx} className="italic text-zinc-400 text-sm">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });

    return (
      <p key={pIdx} className="mb-1.5 last:mb-0 leading-relaxed">
        {parsedLine}
      </p>
    );
  });
}

export default function ChatMessage({ role, content, suspectName }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full flex-col gap-1 my-3 animate-fade-in ${isUser ? "items-end" : "items-start"}`}>
      {/* Sender Badge */}
      <span className={`text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded select-none ${
        isUser 
          ? "bg-zinc-800 text-zinc-400 border border-zinc-700/50" 
          : "bg-amber-950/40 text-amber-500/90 border border-amber-900/30"
      }`}>
        {isUser ? "Detective (You)" : (suspectName || "Suspect")}
      </span>

      {/* Chat Bubble */}
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 shadow-md border ${
          isUser
            ? "bg-zinc-900 border-zinc-700 text-zinc-100 rounded-tr-none"
            : "bg-zinc-950 border-amber-950/40 text-zinc-100 rounded-tl-none"
        }`}
      >
        {parseMarkdown(content)}
      </div>
    </div>
  );
}