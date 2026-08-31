"use client";

import React, { useState } from "react";
import { formatPrice, formatDate } from "@/lib/formatters";
import {
  Save,
  Building,
  Store,
  Sparkles,
  Mail,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Power,
} from "lucide-react";

interface SettingsManagerProps {
  storeSettings: any;
  paymentSettings: any;
  homepageSettings: any;
  subscribers: any[];
}

export function SettingsManager({
  storeSettings: initialStore,
  paymentSettings: initialPayment,
  homepageSettings: initialHomepage,
  subscribers,
}: SettingsManagerProps) {
  const [store, setStore] = useState(initialStore);
  const [payment, setPayment] = useState(initialPayment);
  const [homepage, setHomepage] = useState(initialHomepage);

  const [activeTab, setActiveTab] = useState("payment");
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  const saveSettings = async (type: "store" | "payment" | "homepage", data: any) => {
    setIsSaving(true);
    setFeedback("");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data }),
      });
      if (res.ok) {
        setFeedback(`${type.toUpperCase()} settings saved successfully!`);
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (e: any) {
      setFeedback("Error saving settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
          STORE & SYSTEM SETTINGS
        </h1>
        <p className="text-xs text-brand-muted mt-0.5">
          Configure GTBank accounts, WhatsApp numbers, store online/offline mode, announcement bar, and homepage banners.
        </p>
      </div>

      {feedback && (
        <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-700 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-brand-border/60 pb-2">
        {[
          { id: "payment", label: "Bank & WhatsApp Details", icon: Building },
          { id: "store", label: "General & Online Mode", icon: Store },
          { id: "homepage", label: "Homepage & Announcement", icon: Sparkles },
          { id: "subscribers", label: `VIP Newsletter (${subscribers.length})`, icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-brand-dark text-white shadow-xs"
                  : "text-brand-muted hover:text-brand-dark hover:bg-brand-sand"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Payment & WhatsApp Settings */}
      {activeTab === "payment" && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border/60 shadow-xs space-y-6 max-w-3xl">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <h2 className="font-serif-luxury text-xl font-bold text-brand-dark">
              GTBank & WhatsApp Payment Configuration
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Bank Name *
                </label>
                <input
                  type="text"
                  value={payment.bankName}
                  onChange={(e) => setPayment({ ...payment, bankName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Account Name *
                </label>
                <input
                  type="text"
                  value={payment.accountName}
                  onChange={(e) => setPayment({ ...payment, accountName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Account Number *
                </label>
                <input
                  type="text"
                  value={payment.accountNumber}
                  onChange={(e) => setPayment({ ...payment, accountNumber: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8] font-mono font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Official WhatsApp Number (Country Code + Phone) *
                </label>
                <input
                  type="text"
                  value={payment.whatsappNumber}
                  onChange={(e) => setPayment({ ...payment, whatsappNumber: e.target.value })}
                  placeholder="2348012345678"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Payment Instructions Shown to Customers
              </label>
              <textarea
                rows={3}
                value={payment.paymentInstructions}
                onChange={(e) => setPayment({ ...payment, paymentInstructions: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              />
            </div>

            <button
              onClick={() => saveSettings("payment", payment)}
              disabled={isSaving}
              className="px-6 py-3 bg-brand-dark text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Payment Details"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: General & Online/Offline Mode */}
      {activeTab === "store" && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border/60 shadow-xs space-y-6 max-w-3xl">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <h2 className="font-serif-luxury text-xl font-bold text-brand-dark">
              General Store & Status Control
            </h2>
          </div>

          <div className="space-y-4">
            
            {/* Store Status Toggle */}
            <div className="p-4 rounded-xl bg-brand-sand/60 border border-brand-border flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-brand-dark uppercase tracking-wider flex items-center gap-2">
                  <Power className="w-4 h-4 text-brand-dark" />
                  <span>Store Mode (Online / Maintenance)</span>
                </span>
                <p className="text-[11px] text-brand-muted">
                  Toggle store accessibility. When OFFLINE, public visitors see maintenance screen.
                </p>
              </div>

              <select
                value={store.storeStatus}
                onChange={(e) => setStore({ ...store, storeStatus: e.target.value })}
                className="px-4 py-2 rounded-xl border border-brand-border text-xs font-bold bg-white text-brand-dark cursor-pointer"
              >
                <option value="ONLINE">ONLINE (Public Accessible)</option>
                <option value="OFFLINE">OFFLINE (Maintenance Mode)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Store Name
                </label>
                <input
                  type="text"
                  value={store.storeName}
                  onChange={(e) => setStore({ ...store, storeName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Store Tagline
                </label>
                <input
                  type="text"
                  value={store.tagline}
                  onChange={(e) => setStore({ ...store, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Default Delivery Fee (₦)
                </label>
                <input
                  type="number"
                  value={store.defaultDeliveryFee}
                  onChange={(e) => setStore({ ...store, defaultDeliveryFee: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Free Delivery Threshold (₦)
                </label>
                <input
                  type="number"
                  value={store.freeDeliveryThreshold}
                  onChange={(e) => setStore({ ...store, freeDeliveryThreshold: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Store Location / Atelier Address
              </label>
              <input
                type="text"
                value={store.address}
                onChange={(e) => setStore({ ...store, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              />
            </div>

            <button
              onClick={() => saveSettings("store", store)}
              disabled={isSaving}
              className="px-6 py-3 bg-brand-dark text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Store Settings"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Homepage & Announcement */}
      {activeTab === "homepage" && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border/60 shadow-xs space-y-6 max-w-3xl">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <h2 className="font-serif-luxury text-xl font-bold text-brand-dark">
              Homepage Banners & Announcement Bar
            </h2>
          </div>

          <div className="space-y-4">
            
            {/* Announcement Bar */}
            <div className="p-4 rounded-xl bg-brand-sand/50 border border-brand-border space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-wider text-brand-dark">
                <input
                  type="checkbox"
                  checked={homepage.announcementEnabled}
                  onChange={(e) => setHomepage({ ...homepage, announcementEnabled: e.target.checked })}
                  className="w-4 h-4 accent-brand-dark"
                />
                <span>Enable Top Announcement Bar</span>
              </label>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Announcement Text
                </label>
                <input
                  type="text"
                  value={homepage.announcementText}
                  onChange={(e) => setHomepage({ ...homepage, announcementText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Hero Main Headline
              </label>
              <textarea
                rows={2}
                value={homepage.heroTitle}
                onChange={(e) => setHomepage({ ...homepage, heroTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Hero Subtitle
              </label>
              <textarea
                rows={2}
                value={homepage.heroSubtitle}
                onChange={(e) => setHomepage({ ...homepage, heroSubtitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Hero Image URL
              </label>
              <input
                type="url"
                value={homepage.heroImage}
                onChange={(e) => setHomepage({ ...homepage, heroImage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              />
            </div>

            <button
              onClick={() => saveSettings("homepage", homepage)}
              disabled={isSaving}
              className="px-6 py-3 bg-brand-dark text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Homepage Content"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Newsletter Subscribers */}
      {activeTab === "subscribers" && (
        <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-brand-border/60">
            <h2 className="font-serif-luxury text-lg font-bold text-brand-dark">
              VIP Newsletter Subscribers ({subscribers.length})
            </h2>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAF8] text-brand-muted uppercase tracking-wider text-[10px] border-b border-brand-border">
              <tr>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Subscription Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-sand">
              {subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-brand-sand/30">
                  <td className="py-4 px-6 font-semibold text-brand-dark">{s.email}</td>
                  <td className="py-4 px-6">
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-bold">
                      {s.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-brand-muted text-[11px]">{formatDate(s.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
