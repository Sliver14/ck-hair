"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface HairLoaderProps {
  size?: "sm" | "md" | "lg" | "fullscreen";
  text?: string;
  subtext?: string;
}

export function HairLoader({
  size = "md",
  text = "CROWNING YOUR BEAUTY",
  subtext = "Crafting luxury raw & premium fiber hair...",
}: HairLoaderProps) {
  const sizeMap = {
    sm: { box: "w-20 h-20", svg: "w-16 h-16", text: "text-[10px]" },
    md: { box: "w-32 h-32", svg: "w-28 h-28", text: "text-xs" },
    lg: { box: "w-44 h-44", svg: "w-40 h-40", text: "text-sm" },
    fullscreen: { box: "w-48 h-48", svg: "w-44 h-44", text: "text-sm" },
  };

  const selectedSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className="flex flex-col items-center justify-center text-center space-y-4 select-none">
      {/* Animated Hair Silhouette SVG */}
      <div className={`relative ${selectedSize.box} flex items-center justify-center`}>
        {/* Soft Ambient Halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#EAD7C3]/40 via-[#B76E79]/20 to-transparent blur-xl animate-pulse" />

        <svg
          viewBox="0 0 200 200"
          className={`${selectedSize.svg} relative z-10`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hairGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2B2118" />
              <stop offset="60%" stopColor="#3E3025" />
              <stop offset="100%" stopColor="#2B2118" />
            </linearGradient>

            <linearGradient id="hairGradientRose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B76E79" />
              <stop offset="50%" stopColor="#FAF6F2" />
              <stop offset="100%" stopColor="#B76E79" />
            </linearGradient>

            <linearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2B2118" />
              <stop offset="50%" stopColor="#B76E79" />
              <stop offset="100%" stopColor="#2B2118" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Floating Artisan Crown */}
          <g className="animate-crown">
            <path
              d="M75 52 L83 66 L100 48 L117 66 L125 52 L121 76 L79 76 Z"
              fill="url(#crownGold)"
              stroke="#2B2118"
              strokeWidth="1.5"
            />
            {/* Crown Jewel Points */}
            <circle cx="75" cy="50" r="2.5" fill="#B76E79" className="animate-ping" />
            <circle cx="100" cy="46" r="3" fill="#B76E79" />
            <circle cx="125" cy="50" r="2.5" fill="#B76E79" className="animate-ping" />
            <circle cx="100" cy="62" r="2" fill="#FAF6F2" />
          </g>

          {/* Elegant Female Face Profile Silhouette */}
          <g transform="translate(0, 10)">
            <path
              d="M102 78 C104 84 107 88 111 90 C110 93 109 95 106 97 C109 99 112 101 113 104 C109 107 106 108 104 112 C108 115 110 119 108 124 C104 128 97 132 90 133 C84 134 76 132 72 130 C75 125 80 120 83 114 C85 110 86 102 85 96 C84 90 88 82 102 78 Z"
              fill="#2B2118"
            />
            {/* Soft Lip & Nose Profile Contour */}
            <path
              d="M111 90 C113 93 114 96 110 98 C113 100 114 103 112 106 C110 109 107 110 105 113"
              stroke="#B76E79"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </g>

          {/* Animated Flowing & Waving Hair Strands */}
          <g className="animate-hair-wave" transform="translate(0, 5)">
            {/* Main Voluminous Hair Body */}
            <path
              d="M82 76 C70 82 62 95 60 110 C58 126 65 140 68 155 C70 165 67 175 62 182 C72 180 82 170 85 158 C88 144 80 132 78 120 C76 108 82 96 90 88 Z"
              fill="url(#hairGradientDark)"
              opacity="0.95"
            />

            {/* Cascading Wave Strand 1 (Rose Gold Shimmer Flow) */}
            <path
              d="M88 78 C74 90 68 106 72 124 C76 142 88 152 82 170 C80 176 74 182 70 186"
              stroke="url(#hairGradientRose)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              className="animate-hair-strand-1"
            />

            {/* Cascading Wave Strand 2 (Champagne Silk Wave) */}
            <path
              d="M94 82 C82 96 78 112 84 130 C90 148 96 160 90 176 C87 182 82 186 78 190"
              stroke="#EAD7C3"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="animate-hair-strand-2"
            />

            {/* Cascading Wave Strand 3 (Deep Espresso Body Wave) */}
            <path
              d="M98 86 C88 100 86 116 92 134 C98 152 102 164 96 178 C93 184 88 188 84 192"
              stroke="#2B2118"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              className="animate-hair-strand-3"
            />

            {/* Front Feathered Curled Locks */}
            <path
              d="M80 84 C72 88 66 96 66 104 C66 112 74 116 78 112 C82 108 80 100 76 98 C72 96 70 100 72 104"
              stroke="#B76E79"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Back Curled Swirl */}
            <path
              d="M62 120 C54 132 54 146 60 158 C64 166 70 170 74 168 C78 166 76 158 70 156 C64 154 62 160 64 164"
              stroke="url(#hairGradientRose)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              className="animate-hair-strand-2"
            />
          </g>

          {/* Twinkling Accent Sparkles */}
          <g className="animate-hair-glow">
            <path
              d="M135 70 L137 75 L142 77 L137 79 L135 84 L133 79 L128 77 L133 75 Z"
              fill="#B76E79"
            />
            <path
              d="M55 95 L56 98 L59 99 L56 100 L55 103 L54 100 L51 99 L54 98 Z"
              fill="#EAD7C3"
            />
            <path
              d="M110 160 L111 163 L114 164 L111 165 L110 168 L109 165 L106 164 L109 163 Z"
              fill="#B76E79"
            />
          </g>
        </svg>
      </div>

      {/* Brand Caption */}
      {text && (
        <div className="space-y-1 animate-fade-in">
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#B76E79] animate-spin" style={{ animationDuration: "6s" }} />
            <p className={`font-serif-luxury font-bold tracking-[0.25em] text-[#2B2118] uppercase ${selectedSize.text}`}>
              {text}
            </p>
            <Sparkles className="w-3 h-3 text-[#B76E79] animate-spin" style={{ animationDuration: "6s" }} />
          </div>
          {subtext && (
            <p className="text-[10px] md:text-xs text-[#756558] font-light tracking-wider animate-pulse">
              {subtext}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (size === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF6F2]/95 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
}
