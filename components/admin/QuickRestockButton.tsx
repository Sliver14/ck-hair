"use client";

import React, { useState } from "react";
import { Plus, RefreshCw, Check } from "lucide-react";

interface QuickRestockButtonProps {
  productId: string;
  currentStock: number;
  availability: string;
}

export function QuickRestockButton({
  productId,
  currentStock: initialStock,
  availability: initialAvailability,
}: QuickRestockButtonProps) {
  const [stock, setStock] = useState(initialStock);
  const [availability, setAvailability] = useState(initialAvailability);
  const [isOpen, setIsOpen] = useState(false);
  const [addQty, setAddQty] = useState("10");
  const [isLoading, setIsLoading] = useState(false);

  const handleRestock = async () => {
    const qty = parseInt(addQty);
    if (isNaN(qty) || qty <= 0) return;

    setIsLoading(true);
    const newStock = stock + qty;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stock: newStock,
          availability: "IN_STOCK",
        }),
      });

      if (res.ok) {
        setStock(newStock);
        setAvailability("IN_STOCK");
        setIsOpen(false);
      }
    } catch (e) {
      console.error("Restock failed:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <span
          className={`font-semibold text-xs ${
            stock <= 0
              ? "text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md"
              : stock <= 5
              ? "text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md"
              : "text-brand-dark"
          }`}
        >
          {stock <= 0 ? "0 pcs (Pre-Order)" : `${stock} pcs`}
        </span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-md bg-brand-sand hover:bg-brand-dark hover:text-white transition-all text-[10px] font-bold text-brand-dark"
          title="Quick Restock"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-8 left-0 z-30 w-48 p-3 bg-white rounded-xl shadow-xl border border-brand-border space-y-2 text-xs">
          <p className="font-bold text-brand-dark text-[11px]">Restock Inventory</p>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min="1"
              value={addQty}
              onChange={(e) => setAddQty(e.target.value)}
              className="w-16 px-2 py-1 border border-brand-border rounded-lg text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
            />
            <span className="text-[10px] text-brand-muted">pieces</span>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={handleRestock}
              disabled={isLoading}
              className="flex-1 py-1.5 bg-brand-dark text-white rounded-lg text-[10px] font-semibold uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-1"
            >
              <Check className="w-3 h-3" />
              <span>{isLoading ? "Saving..." : "Add Stock"}</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-2 py-1.5 border border-brand-border text-brand-muted hover:text-brand-dark rounded-lg text-[10px]"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
