"use client";

import React, { useState, useEffect } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/formatters";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-brand-border flex flex-col max-h-[80vh]">
        <div className="p-4 md:p-6 border-b border-brand-border flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-muted" />
          <input
            type="text"
            placeholder="Search luxury wigs, bundles, frontals, closures..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 outline-none text-base md:text-lg bg-transparent text-brand-dark placeholder-brand-lightMuted font-light"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-brand-muted hover:text-brand-dark transition-colors rounded-full hover:bg-brand-sand"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto flex-1 divide-y divide-brand-sand">
          {isLoading ? (
            <div className="py-12 text-center text-brand-muted text-sm tracking-widest uppercase">
              Searching CK Hair Catalog...
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-brand-muted font-medium mb-3">
                Products ({results.length})
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 py-3 group hover:bg-brand-sand/50 p-2 rounded-xl transition-all"
                >
                  <div className="w-14 h-14 rounded-lg bg-brand-sand overflow-hidden flex-shrink-0">
                    <img
                      src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm md:text-base font-medium text-brand-dark truncate group-hover:text-brand-gold transition-colors">
                        {product.name}
                      </h4>
                      {product.availability === "PREORDER" && (
                        <span className="text-[9px] uppercase tracking-wider bg-brand-sand text-brand-dark px-2 py-0.5 rounded-full font-semibold border border-brand-border">
                          Pre-order
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-brand-muted truncate capitalize">
                      {product.category?.name} • {product.texture || "Luxury Hair"}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-brand-dark">
                      {formatPrice(product.price)}
                    </p>
                    <span className="text-xs text-brand-gold flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="py-12 text-center text-brand-muted">
              <p className="text-base font-serif-luxury text-xl mb-1 text-brand-dark">No products found</p>
              <p className="text-sm text-brand-muted">Try searching with different keywords like "Body Wave", "Wig", "13x4"</p>
            </div>
          ) : (
            <div className="py-6 space-y-4">
              <p className="text-xs uppercase tracking-widest text-brand-muted font-medium">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {["Body Wave", "HD Lace Wig", "Bone Straight", "Pre-Order Drops", "Deep Wave", "Frontals"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs px-3.5 py-1.5 rounded-full bg-brand-sand hover:bg-brand-dark hover:text-white transition-all text-brand-dark"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
