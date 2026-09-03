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
  subtext = "Loading luxury hair pieces & textures...",
}: HairLoaderProps) {
  const sizeMap = {
    sm: {
      wrapper: "w-16 h-16",
      logo: "w-12 h-12",
      ring: "w-16 h-16",
      text: "text-[9.5px]",
      subtext: "text-[8px]",
    },
    md: {
      wrapper: "w-28 h-28",
      logo: "w-20 h-20",
      ring: "w-28 h-28",
      text: "text-xs",
      subtext: "text-[10px]",
    },
    lg: {
      wrapper: "w-36 h-36",
      logo: "w-28 h-28",
      ring: "w-36 h-36",
      text: "text-sm",
      subtext: "text-xs",
    },
    fullscreen: {
      wrapper: "w-44 h-44",
      logo: "w-32 h-32",
      ring: "w-44 h-44",
      text: "text-sm sm:text-base",
      subtext: "text-xs",
    },
  };

  const selectedSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className="flex flex-col items-center justify-center text-center space-y-4 select-none">
      {/* Animated Logo Container */}
      <div className={`relative ${selectedSize.wrapper} flex items-center justify-center`}>
        {/* Soft Ambient Radial Halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#EAD7C3]/60 via-[#B76E79]/30 to-[#FAF6F2]/40 blur-xl animate-pulse" />

        {/* Rotating Outer Luxury Orbit Ring */}
        <div className={`absolute ${selectedSize.ring} rounded-full border border-dashed border-[#B76E79]/40 animate-ring-rotate`} />

        {/* Inner Solid Shimmer Border */}
        <div className="absolute inset-1 rounded-full border border-[#EAD7C3]/80" />

        {/* Central Logo with Float and Breathing Pulse */}
        <div className="relative z-10 flex items-center justify-center animate-logo-float">
          <div className="animate-logo-pulse flex items-center justify-center">
            <img
              src="/logo.png"
              alt="CK Hair Logo"
              className={`${selectedSize.logo} object-contain select-none drop-shadow-md`}
              draggable={false}
            />
          </div>
        </div>

        {/* Twinkling Diamond Sparkles */}
        <div className="absolute -top-1 -right-1 z-20">
          <Sparkles className="w-3.5 h-3.5 text-[#B76E79] animate-ping" style={{ animationDuration: "3s" }} />
        </div>
        <div className="absolute -bottom-1 -left-1 z-20">
          <Sparkles className="w-3 h-3 text-[#EAD7C3] animate-pulse" style={{ animationDuration: "2s" }} />
        </div>
      </div>

      {/* Brand Caption */}
      {text && (
        <div className="space-y-1 animate-fade-in">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[#B76E79] text-xs">✦</span>
            <p className={`font-serif-luxury font-bold tracking-[0.22em] text-[#2B2118] uppercase ${selectedSize.text}`}>
              {text}
            </p>
            <span className="text-[#B76E79] text-xs">✦</span>
          </div>
          {subtext && (
            <p className={`text-[#756558] font-light tracking-wider animate-pulse ${selectedSize.subtext}`}>
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
