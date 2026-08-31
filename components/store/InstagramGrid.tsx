import React from "react";
import { Instagram } from "lucide-react";

interface InstagramGridProps {
  instagramUrl?: string;
}

export function InstagramGrid({ instagramUrl = "https://instagram.com/CK_Hair.Ng" }: InstagramGridProps) {
  const images = [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF6F2] border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#B76E79] font-bold block">
            Social Inspiration
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl font-bold text-brand-dark uppercase">
            FOLLOW @CK_Hair.Ng
          </h2>
          <p className="text-xs md:text-sm text-brand-muted font-light">
            Tag us in your looks with <span className="font-medium text-brand-dark">#CKHairLuxury</span> to be featured.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {images.map((img, idx) => (
            <a
              key={idx}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-brand-sand block shadow-2xs"
            >
              <img
                src={img}
                alt={`CK Hair Instagram Look ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
