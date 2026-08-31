import React from "react";
import { getStoreSettings } from "@/lib/db/settings";
import { PhoneCall, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export const revalidate = 0;

export default async function ContactPage() {
  const storeSettings = await getStoreSettings();

  const whatsappUrl = `https://wa.me/${storeSettings.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello CK Hair Concierge, I would like to inquire about your hair pieces and custom wig services."
  )}`;

  return (
    <div className="bg-[#FAF6F2] min-h-screen py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B76E79] font-bold block">
            Concierge & Inquiries
          </span>
          <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-brand-dark">
            CONNECT WITH CK HAIR
          </h1>
          <p className="text-xs md:text-sm text-brand-muted font-light">
            Our luxury hair consultants are available to assist you with custom orders, wig fittings, and nationwide deliveries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Direct WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary WhatsApp Card */}
            <div className="bg-[#2B2118] text-[#FAF6F2] p-8 rounded-3xl shadow-xl space-y-6 border border-[#3E3025]">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B76E79] font-bold block">
                  Fastest Response
                </span>
                <h2 className="font-serif-luxury text-2xl font-bold text-[#FAF6F2]">
                  WHATSAPP CONCIERGE
                </h2>
                <p className="text-xs text-[#D8C7B8] font-light leading-relaxed">
                  Chat directly with our styling team for custom lace matching, pre-order reservations, and instant payment confirmations.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full bg-[#25D366] text-white flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#1EBE5D] transition-all shadow-md active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-[#D8C7B8]">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#B76E79] flex-shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 7:00 PM (WAT)</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#B76E79] flex-shrink-0" />
                  <span>{storeSettings.address}</span>
                </div>
              </div>
            </div>

            {/* Direct Info Card */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-4 text-xs">
              <h3 className="font-serif-luxury text-lg font-bold text-brand-dark uppercase tracking-wider">
                Direct Channels
              </h3>
              <div className="space-y-3 text-brand-muted">
                <p className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-[#B76E79]" />
                  <span>{storeSettings.phone}</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#B76E79]" />
                  <span>{storeSettings.email}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-brand-border/60 shadow-lg space-y-6">
              <h2 className="font-serif-luxury text-2xl font-bold text-brand-dark border-b border-brand-border/60 pb-3">
                SEND US A MESSAGE
              </h2>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chioma Okonjo"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="chioma@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="08012345678"
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                    Message / Custom Request *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the hair length, texture, or wig fitting you require..."
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
                  />
                </div>

                <button
                  type="button"
                  className="w-full py-4 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#3E3025] transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiries</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
