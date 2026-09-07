"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ChevronUp } from "lucide-react";

export function VerticalScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const updateScrollProgress = useCallback(() => {
    const scrollPx = window.scrollY;
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const totalScrollable = docHeight - winHeight;

    if (totalScrollable <= 60) {
      setIsVisible(false);
      return;
    }

    const currentProgress = Math.min(
      100,
      Math.max(0, (scrollPx / totalScrollable) * 100)
    );

    setScrollProgress(currentProgress);
    setIsVisible(scrollPx > 80);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      updateScrollProgress();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial check
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScrollProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const trackHeight = rect.height;
    const percentage = clickY / trackHeight;

    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const targetScroll = percentage * (docHeight - winHeight);

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Scroll position and navigation"
      className="fixed right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 select-none pointer-events-auto transition-opacity duration-500 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scroll to Top Quick Trigger */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`w-7 h-7 rounded-full bg-[#FAF6F2]/90 backdrop-blur-md border border-[#EAD7C3] shadow-md flex items-center justify-center text-[#756558] hover:text-[#B76E79] hover:border-[#B76E79] hover:scale-110 active:scale-95 transition-all duration-300 ${
          scrollProgress > 20 ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
        title="Scroll to Top"
        aria-label="Scroll to top of page"
      >
        <ChevronUp className="w-3.5 h-3.5" />
      </button>

      {/* Vertical Track Container */}
      <div
        onClick={handleTrackClick}
        className="relative w-4.5 h-36 sm:h-44 flex items-center justify-center cursor-pointer group py-1"
        title={`Page progress: ${Math.round(scrollProgress)}%`}
      >
        {/* Background Subtle Track Groove */}
        <div className="w-[3px] h-full bg-[#EAD7C3]/60 rounded-full overflow-hidden shadow-inner group-hover:w-[4px] transition-all duration-300" />

        {/* Dynamic Progress Fill Line */}
        <div
          className="absolute top-1 w-[3px] rounded-full bg-gradient-to-b from-[#2B2118] via-[#B76E79] to-[#EAD7C3] shadow-xs group-hover:w-[4px] transition-all duration-150 ease-out"
          style={{
            height: `calc(${(scrollProgress / 100) * 100}% - 8px)`,
            maxHeight: "calc(100% - 8px)",
          }}
        />

        {/* Current Position Glowing Luxury Pip / Diamond */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#B76E79] border border-white shadow-md transition-all duration-150 ease-out pointer-events-none flex items-center justify-center"
          style={{
            top: `calc(${Math.min(95, Math.max(3, scrollProgress))}% - 5px)`,
          }}
        >
          <span className="w-1 h-1 rounded-full bg-white animate-ping opacity-60" />
        </div>

        {/* Hover Percentage Floating Badge */}
        <div
          className={`absolute right-6 px-2 py-0.5 rounded-md bg-[#2B2118]/90 backdrop-blur-xs text-[#FAF6F2] text-[10px] font-mono font-medium whitespace-nowrap shadow-lg transition-all duration-200 pointer-events-none ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
          style={{
            top: `calc(${scrollProgress}% - 10px)`,
          }}
        >
          {Math.round(scrollProgress)}%
        </div>
      </div>

      {/* Bottom Percentage Display when Hovered */}
      <span
        className={`text-[9px] font-mono text-[#8C7A6B] tracking-tighter transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {Math.round(scrollProgress)}%
      </span>
    </aside>
  );
}
