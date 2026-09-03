import React from "react";

interface AnnouncementBarProps {
  text?: string;
  enabled?: boolean;
}

export function AnnouncementBar({ text, enabled = true }: AnnouncementBarProps) {
  if (!enabled || !text) return null;

  return (
    <aside
      aria-label="Announcement"
      className="bg-[#1C150E] text-[#D8C7B8] py-2 px-4 text-center border-b border-[#2E2218] relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3">
        <span className="text-[#B76E79] text-[8px] sm:text-[9px] opacity-75 select-none">✦</span>
        <p className="text-[8.5px] sm:text-[9.5px] font-normal tracking-[0.28em] uppercase text-[#F3EBE1] leading-none">
          {text}
        </p>
        <span className="text-[#B76E79] text-[8px] sm:text-[9px] opacity-75 select-none">✦</span>
      </div>
    </aside>
  );
}
