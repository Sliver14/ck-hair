import React from "react";

interface AnnouncementBarProps {
  text?: string;
  enabled?: boolean;
}

export function AnnouncementBar({ text, enabled = true }: AnnouncementBarProps) {
  if (!enabled || !text) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#111111] text-[#E5E5E0] text-[11px] md:text-xs tracking-[0.18em] uppercase py-2.5 px-4 text-center font-medium border-b border-[#222222]">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-3">
        <span>✨</span>
        <p className="inline">{text}</p>
        <span>✨</span>
      </div>
    </aside>
  );
}
