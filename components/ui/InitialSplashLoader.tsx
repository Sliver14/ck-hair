"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { HairLoader } from "./HairLoader";

export function InitialSplashLoader() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  // Initial Fullscreen Splash on page load/refresh
  useEffect(() => {
    // Show splash for 1.8 seconds, then trigger smooth fade out
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Top Progress Bar on Route Changes
  useEffect(() => {
    setIsNavigating(true);
    const navTimer = setTimeout(() => {
      setIsNavigating(false);
    }, 350);

    return () => clearTimeout(navTimer);
  }, [pathname]);

  return (
    <>
      {/* Route Transition Top Bar */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-[#EAD7C3] overflow-hidden pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#2B2118] via-[#B76E79] to-[#2B2118] animate-pulse"
            style={{
              width: "100%",
              animationDuration: "0.6s",
            }}
          />
        </div>
      )}

      {/* Fullscreen Initial Loading Splash */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FAF6F2] transition-all duration-700 ease-out ${
            isFading ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
          }`}
        >
          <HairLoader
            size="lg"
            text="CK HAIR ATELIER"
            subtext="Luxury Hair • Effortless Confidence"
          />
        </div>
      )}
    </>
  );
}
