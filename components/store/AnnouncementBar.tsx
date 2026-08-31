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
      className="bg-[#2B2118] text-[#D8C7B8] text-[9.5px] sm:text-[10.5px] tracking-[0.2em] uppercase py-2 px-4 text-center font-light border-b border-[#3E3025]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2.5">
        <span className="text-[#B76E79] text-[10px]">✦</span>
        <p className="inline text-[#FAF6F2] font-normal tracking-[0.22em] leading-tight">
          {text}
        </p>
        <span className="text-[#B76E79] text-[10px]">✦</span>
      </div>
    </aside>
  );
}
