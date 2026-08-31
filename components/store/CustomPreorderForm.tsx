"use client";

import React, { useState } from "react";
import { MessageCircle, Sparkles, Clock, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { NIGERIAN_STATES } from "@/lib/formatters";

interface CustomPreorderFormProps {
  whatsappNumber?: string;
}

const PREORDER_TEXTURES = [
  "Anna Bodywave",
  "Anna Straight",
  "Anna Natural Curl",
  "Ariel Hair",
  "French Curl",
  "Bone Straight",
  "Deep Wave",
  "Water Wave",
  "Custom Curl / Wave Pattern",
];

const PREORDER_FORMATS = [
  "Braiding Hair",
  "Weft Hair (Bundles)",
  "HD Lace Frontal Wig (13x4 / 13x6)",
  "HD Lace Closure Wig (4x4 / 5x5)",
  "Full Lace Bespoke Wig",
  "HD Frontal / Closure Only",
];

const PREORDER_LENGTHS = [
  '12"',
  '14"',
  '16"',
  '18"',
  '20"',
  '22"',
  '24"',
  '26"',
  '28"',
  '30"',
  '32"',
  '34"',
  '36"',
  '40"',
];

const PREORDER_COLORS = [
  "Natural Black (1B)",
  "Jet Black (1)",
  "613 Platinum Blonde",
  "Piano / Honey Highlight (P4/27)",
  "Auburn / Copper Brown (#30/#33)",
  "Burgundy / Wine (#99J)",
  "Custom Ombre / Dip Dye",
];

const QUANTITY_OPTIONS = [
  "1 Piece / Pack",
  "2 Bundles",
  "3 Bundles (Standard Full Head)",
  "3 Bundles + HD Closure / Frontal",
  "4 Bundles (Extra Glam Fullness)",
  "1 Complete Handcrafted Wig Unit",
  "Custom Wholesale Order",
];

export function CustomPreorderForm({
  whatsappNumber = "2349026555783",
}: CustomPreorderFormProps) {
  const [category, setCategory] = useState("Blend / Premium Fiber Hair");
  const [texture, setTexture] = useState("Anna Bodywave");
  const [format, setFormat] = useState("Braiding Hair");
  const [length, setLength] = useState('22"');
  const [color, setColor] = useState("Natural Black (1B)");
  const [quantity, setQuantity] = useState("3 Bundles (Standard Full Head)");
  const [capSize, setCapSize] = useState("Medium (22.5 inch - Standard)");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerState, setCustomerState] = useState("Lagos");
  const [customNotes, setCustomNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");

  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, "");

  const buildWhatsAppMessage = () => {
    return `👑 *NEW BESPOKE PRE-ORDER REQUEST — CK HAIR* 👑

👤 *CLIENT INFORMATION:*
• *Name:* ${customerName || "Valued Client"}
• *Phone/WhatsApp:* ${customerPhone || "Provided on Chat"}
• *Location:* ${customerState}, Nigeria

✨ *HAIR SPECIFICATIONS:*
• *Category:* ${category}
• *Style / Texture:* ${texture}
• *Format:* ${format}
• *Length:* ${length}
• *Color:* ${color}
• *Quantity / Units:* ${quantity}
${format.toLowerCase().includes("wig") ? `• *Cap Size:* ${capSize}\n` : ""}
📝 *SPECIAL NOTES & CUSTOM INSTRUCTIONS:*
${customNotes ? `"${customNotes}"` : "Standard luxury artisan preparation & quality check."}

⏳ *ORDER TYPE:* Custom Pre-Order (Estimated 2–4 weeks artisan fulfillment)
💬 *Action:* Please confirm pricing, availability, and GTBank direct transfer details.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = buildWhatsAppMessage();
    const url = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(msg)}`;
    setGeneratedUrl(url);
    setIsSubmitted(true);

    // Open WhatsApp in new tab
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-brand-border/70 shadow-xl overflow-hidden">
      {/* Form Header */}
      <div className="bg-[#2B2118] text-[#FAF6F2] p-6 sm:p-8 md:p-10 border-b border-[#3E3025] space-y-2 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#EAD7C3] text-[10px] uppercase tracking-[0.2em] font-semibold">
          <Sparkles className="w-3 h-3 text-[#B76E79]" />
          <span>Bespoke Pre-Order Concierge</span>
        </div>
        <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FAF6F2]">
          DESIGN YOUR EXACT HAIR SPECIFICATION
        </h2>
        <p className="text-xs sm:text-sm text-[#D8C7B8] font-light max-w-2xl">
          Specify your exact texture, custom length, density, and color. Your request is compiled instantly and forwarded to our CK Hair Concierge on WhatsApp for confirmation and reserved crafting.
        </p>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 space-y-8">
        {/* Step 1: Hair Category & Texture */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-brand-border/60">
            <span className="w-6 h-6 rounded-full bg-[#2B2118] text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="font-serif-luxury text-lg font-bold text-brand-dark uppercase tracking-wider">
              Hair Category & Texture
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Hair Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5] cursor-pointer font-medium"
              >
                <option value="Blend / Premium Fiber Hair">Blend / Premium Fiber Hair</option>
                <option value="100% Human Hair">100% Human Hair (Raw & Virgin)</option>
                <option value="Custom Handcrafted Wig">Custom Handcrafted Ready-To-Wear Wig</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Hair Texture / Style *
              </label>
              <select
                value={texture}
                onChange={(e) => setTexture(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5] cursor-pointer font-medium"
              >
                {PREORDER_TEXTURES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Format, Length & Color */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-brand-border/60">
            <span className="w-6 h-6 rounded-full bg-[#2B2118] text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="font-serif-luxury text-lg font-bold text-brand-dark uppercase tracking-wider">
              Format, Length & Color
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Format / Type *
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5] cursor-pointer font-medium"
              >
                {PREORDER_FORMATS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Desired Length *
              </label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5] cursor-pointer font-medium"
              >
                {PREORDER_LENGTHS.map((l) => (
                  <option key={l} value={l}>
                    {l} Inches
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Hair Color Tone *
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5] cursor-pointer font-medium"
              >
                {PREORDER_COLORS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Quantity / Number of Bundles *
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5] cursor-pointer font-medium"
              >
                {QUANTITY_OPTIONS.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            {format.toLowerCase().includes("wig") && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Wig Cap Size
                </label>
                <select
                  value={capSize}
                  onChange={(e) => setCapSize(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5] cursor-pointer font-medium"
                >
                  <option value="Small (21.5 inch)">Small (21.5 inch)</option>
                  <option value="Medium (22.5 inch - Standard)">Medium (22.5 inch - Standard)</option>
                  <option value="Large (23.5 inch)">Large (23.5 inch)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Client Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-brand-border/60">
            <span className="w-6 h-6 rounded-full bg-[#2B2118] text-white text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h3 className="font-serif-luxury text-lg font-bold text-brand-dark uppercase tracking-wider">
              Your Details & Notes
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Chioma Adebayo"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="08012345678"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Delivery State *
              </label>
              <select
                value={customerState}
                onChange={(e) => setCustomerState(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5] cursor-pointer"
              >
                {NIGERIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
              Special Custom Notes / Reference Details
            </label>
            <textarea
              rows={3}
              placeholder="Tell us any specific requirements (e.g., HD lace tint preference, custom parting, expedited deadline, or matching bundle weights)..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
            />
          </div>
        </div>

        {/* Live Preview Summary Card */}
        <div className="p-5 rounded-2xl bg-[#FAF6F2] border border-[#EAD7C3] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-brand-dark">
              <Clock className="w-4 h-4 text-[#B76E79]" />
              <span>Pre-Order Summary Preview</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-white px-2 py-0.5 rounded-full border border-brand-border font-bold text-[#B76E79]">
              Est. 2–4 Weeks
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-brand-muted pt-1">
            <div>
              <span className="text-[10px] block uppercase tracking-wider text-[#A39488]">Style</span>
              <p className="font-bold text-brand-dark truncate">{texture}</p>
            </div>
            <div>
              <span className="text-[10px] block uppercase tracking-wider text-[#A39488]">Format</span>
              <p className="font-bold text-brand-dark truncate">{format}</p>
            </div>
            <div>
              <span className="text-[10px] block uppercase tracking-wider text-[#A39488]">Length</span>
              <p className="font-bold text-brand-dark">{length}</p>
            </div>
            <div>
              <span className="text-[10px] block uppercase tracking-wider text-[#A39488]">Color</span>
              <p className="font-bold text-brand-dark truncate">{color}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            type="submit"
            className="w-full py-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2.5 shadow-lg active:scale-98"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span>Send Pre-Order Request to WhatsApp Concierge</span>
          </button>

          <p className="text-[11px] text-center text-brand-muted font-light flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
            <span>No upfront payment required to inquire. Our concierge will confirm availability and send your official invoice.</span>
          </p>
        </div>

        {/* Success Modal / Banner */}
        {isSubmitted && (
          <div className="p-6 rounded-2xl bg-green-50 border border-green-200 text-green-900 space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-700 flex-shrink-0" />
              <span>Your Pre-Order Specification is Prepared!</span>
            </div>
            <p className="text-xs text-green-800 leading-relaxed font-light">
              If WhatsApp did not open automatically on your device, click the direct button below to submit your order specification:
            </p>
            <a
              href={generatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:bg-[#1EBE5D]"
            >
              <span>Click to Open WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
