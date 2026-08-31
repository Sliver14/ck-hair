"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setIsSuccess(true);
        setEmail("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[#2B2118] text-[#FAF6F2] border-b border-[#3E3025]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#B76E79] font-bold block">
          Exclusive Access
        </span>
        <h2 className="font-serif-luxury text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF6F2]">
          JOIN THE CK HAIR SOCIETY
        </h2>
        <p className="text-xs md:text-sm text-[#D8C7B8] max-w-md mx-auto font-light">
          Be the first to receive VIP notifications for limited pre-order drops, private sales, and hair care rituals.
        </p>

        {isSuccess ? (
          <div className="inline-flex items-center gap-2 p-4 bg-white/10 rounded-full text-xs font-semibold text-white">
            <CheckCircle2 className="w-4 h-4 text-[#B76E79]" />
            <span>Welcome to the CK Hair Society. Thank you for subscribing!</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-[#FAF6F2] placeholder-[#AA9E94] text-xs outline-none focus:border-[#B76E79] transition-all font-light"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FAF6F2] text-[#2B2118] hover:bg-[#EAD7C3] text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 flex-shrink-0 active:scale-98"
            >
              <span>{isSubmitting ? "Joining..." : "Join The List"}</span>
              <Send className="w-3.5 h-3.5 text-[#B76E79]" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
