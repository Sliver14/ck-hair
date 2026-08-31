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
    <div className="bg-[#FAFAF8] min-h-screen py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-bold block">
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
            <div className="bg-[#121212] text-white p-8 rounded-3xl shadow-xl space-y-6 border border-brand-border/20">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold block">
                  Fastest Response
                </span>
                <h2 className="font-serif-luxury text-2xl font-bold">
                  WHATSAPP CONCIERGE
                </h2>
                <p className="text-xs text-[#9E9E96] font-light leading-relaxed">
                  Chat directly with our styling team for custom lace matching, pre-order reservations, and instant payment confirmations.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2.5 shadow-lg active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with CK Hair on WhatsApp</span>
              </a>
            </div>

            {/* Address & Hours */}
            <div className="bg-white p-8 rounded-3xl border border-brand-border/60 shadow-xs space-y-5 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wider text-brand-dark block">Atelier Location</span>
                  <p className="text-brand-muted mt-0.5">{storeSettings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneCall className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wider text-brand-dark block">Phone & WhatsApp</span>
                  <p className="text-brand-muted mt-0.5">{storeSettings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wider text-brand-dark block">Email Support</span>
                  <p className="text-brand-muted mt-0.5">{storeSettings.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wider text-brand-dark block">Operating Hours</span>
                  <p className="text-brand-muted mt-0.5">Monday – Saturday: 9:00 AM – 7:00 PM WAT</p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-brand-border/60 shadow-xs space-y-6">
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
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
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
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
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
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
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
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                  />
                </div>

                <button
                  type="button"
                  className="w-full py-4 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
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
