import React from 'react';
import type { Language, StoryId } from './types';

interface StoryMapProps {
  storyId: StoryId;
  language: Language;
}

export default function StoryMap({ storyId, language }: StoryMapProps) {
  if (storyId === "1948") {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Street */}
        <rect x="0" y="80" width="400" height="40" fill="#27272a" />
        <line x1="0" y1="100" x2="400" y2="100" stroke="#52525b" strokeWidth="2" strokeDasharray="10,10" />
        
        {/* Pak Anton's House (Crime Scene) */}
        <rect x="50" y="20" width="100" height="60" fill="#3f3f46" stroke="#fbbf24" strokeWidth="2" />
        <text x="100" y="55" fill="#a1a1aa" fontSize="12" textAnchor="middle" fontFamily="monospace">
          {language === 'en' ? "Anton's House" : "Rumah Anton"}
        </text>
        <circle cx="120" cy="50" r="4" fill="#ef4444" className="animate-pulse" />
        
        {/* Mango Tree */}
        <circle cx="160" cy="40" r="15" fill="#15803d" />
        
        {/* Bu Ningsih's House */}
        <rect x="180" y="20" width="100" height="60" fill="#3f3f46" />
        <text x="230" y="55" fill="#a1a1aa" fontSize="12" textAnchor="middle" fontFamily="monospace">
          {language === 'en' ? "Ningsih's House" : "Rumah Ningsih"}
        </text>

        {/* Mang Oleh's Cart location */}
        <circle cx="90" cy="140" r="8" fill="#3b82f6" />
        <text x="90" y="160" fill="#a1a1aa" fontSize="10" textAnchor="middle" fontFamily="monospace">
          {language === 'en' ? "Bakso Cart" : "Gerobak Bakso"}
        </text>

        {/* Jono's Delivery location */}
        <circle cx="320" cy="140" r="6" fill="#22c55e" />
        <text x="320" y="160" fill="#a1a1aa" fontSize="10" textAnchor="middle" fontFamily="monospace">
          {language === 'en' ? "Jono" : "Jono"}
        </text>
      </svg>
    );
  }

  if (storyId === "2024") {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* House Walls */}
        <rect x="125" y="20" width="150" height="160" fill="#27272a" stroke="#52525b" strokeWidth="4" />
        
        {/* Hallway (Left) */}
        <rect x="125" y="20" width="30" height="160" fill="#3f3f46" />
        
        {/* Home Office (Crime Scene) */}
        <rect x="155" y="20" width="120" height="80" fill="#18181b" stroke="#fbbf24" strokeWidth="2" />
        <text x="215" y="65" fill="#a1a1aa" fontSize="12" textAnchor="middle" fontFamily="monospace">
          {language === 'en' ? "Office" : "Ruang Kerja"}
        </text>
        <circle cx="215" cy="45" r="4" fill="#ef4444" className="animate-pulse" />
        
        {/* Kitchen */}
        <rect x="155" y="100" width="120" height="80" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
        <text x="215" y="145" fill="#a1a1aa" fontSize="12" textAnchor="middle" fontFamily="monospace">
          {language === 'en' ? "Kitchen" : "Dapur"}
        </text>

        {/* Front Gate / Porch */}
        <rect x="125" y="180" width="150" height="20" fill="#52525b" />
        <text x="200" y="195" fill="#a1a1aa" fontSize="10" textAnchor="middle" fontFamily="monospace">
          {language === 'en' ? "Front Gate" : "Gerbang Depan"}
        </text>
        
        {/* Mbah Surip Offerings */}
        <circle cx="150" cy="190" r="6" fill="#8b5cf6" />
      </svg>
    );
  }

  return null;
}
