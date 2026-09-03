import React from "react";
import { ArrowUpRight } from "lucide-react";

interface InstagramGridProps {
  instagramUrl?: string;
  tiktokUrl?: string;
}

export function InstagramGrid({
  instagramUrl = "https://instagram.com/CK_Hair.Ng",
  tiktokUrl = "https://tiktok.com/@ck.hair0",
}: InstagramGridProps) {
  const posts = [
    {
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
      caption: "CK Signature Body Wave",
      link: instagramUrl,
      type: "instagram",
    },
    {
      img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80",
      caption: "HD Lace Melt Installation",
      link: tiktokUrl,
      type: "tiktok",
    },
    {
      img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      caption: "Bone Straight Raw Bundles",
      link: instagramUrl,
      type: "instagram",
    },
    {
      img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=600&q=80",
      caption: "Luxury Ready-to-Wear Glueless",
      link: tiktokUrl,
      type: "tiktok",
    },
    {
      img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80",
      caption: "Deep Wave Salon Finish",
      link: instagramUrl,
      type: "instagram",
    },
    {
      img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
      caption: "Custom Color & Styling",
      link: instagramUrl,
      type: "instagram",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF6F2] border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#B76E79] font-bold block">
            Social Inspiration
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl font-bold text-brand-dark uppercase">
            JOIN OUR COMMUNITY
          </h2>
          <p className="text-xs md:text-sm text-brand-muted font-light">
            Tag us in your looks with <span className="font-medium text-brand-dark">#CKHairLuxury</span> to be featured.
          </p>

          {/* Social Action Links with Official Logos */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-border/80 text-brand-dark text-xs font-semibold hover:border-[#B76E79] hover:text-[#B76E79] transition-all shadow-2xs group"
            >
              <svg
                className="w-4 h-4 text-[#E1306C] group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>@CK_Hair.Ng</span>
              <ArrowUpRight className="w-3 h-3 text-brand-muted group-hover:text-[#B76E79]" />
            </a>

            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-border/80 text-brand-dark text-xs font-semibold hover:border-[#000000] hover:text-black transition-all shadow-2xs group"
            >
              <svg
                className="w-4 h-4 fill-current text-black group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
              </svg>
              <span>@ck.hair0</span>
              <ArrowUpRight className="w-3 h-3 text-brand-muted group-hover:text-black" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-brand-sand block shadow-2xs"
            >
              <img
                src={post.img}
                alt={`CK Hair Inspiration Look ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center">
                {post.type === "tiktok" ? (
                  <svg className="w-6 h-6 fill-current mb-1" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 mb-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                )}
                <span className="text-[10px] font-medium tracking-wide line-clamp-1">{post.caption}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
