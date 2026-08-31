"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@ckhair.com");
  const [password, setPassword] = useState("ChangeMe123!");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid login credentials");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to authenticate");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2B2118] text-[#FAF6F2] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B76E79]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-[#FAF6F2] shadow-xs">
            <img
              src="/logo.png"
              alt="CK Hair"
              className="h-8 w-auto object-contain"
            />
          </div>
          <span className="font-serif-luxury text-xl font-bold tracking-[0.2em] text-white uppercase">
            CK HAIR
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-[#D8C7B8] hover:text-white transition-colors"
        >
          ← Return to Storefront
        </Link>
      </div>

      {/* Center Form */}
      <div className="w-full max-w-md mx-auto my-auto py-10 z-10">
        <div className="bg-[#3E3025] p-8 sm:p-10 rounded-3xl border border-[#4E3E30] shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-[#B76E79]">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              ADMINISTRATOR PORTAL
            </h1>
            <p className="text-xs text-[#D8C7B8] font-light">
              Secure authentication for CK Hair management.
            </p>
          </div>

          {/* Demo Account Callout */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1 text-[#D8C7B8]">
            <p className="font-bold text-[#B76E79] uppercase tracking-wider text-[10px]">
              Demo Administrator Credentials
            </p>
            <p>Email: <code className="text-white font-mono">admin@ckhair.com</code></p>
            <p>Password: <code className="text-white font-mono">ChangeMe123!</code></p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-900/30 border border-red-800/60 text-red-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#D8C7B8] uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#AA9E94] absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#2B2118] border border-[#524133] text-white text-xs outline-none focus:border-[#B76E79] transition-colors font-light"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#D8C7B8] uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#AA9E94] absolute left-4 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#2B2118] border border-[#524133] text-white text-xs outline-none focus:border-[#B76E79] transition-colors font-light"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-full bg-[#FAF6F2] text-[#2B2118] hover:bg-[#EAD7C3] text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98"
            >
              <span>{isLoading ? "Signing in..." : "Login to Dashboard"}</span>
              <ArrowRight className="w-4 h-4 text-[#B76E79]" />
            </button>
          </form>

        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-[#555550] z-10">
        <p>© {new Date().getFullYear()} CK Hair Global Atelier. Authorized Personnel Only.</p>
      </div>
    </div>
  );
}
