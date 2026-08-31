"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { SlidersHorizontal, ArrowUpDown, X, Sparkles } from "lucide-react";

interface ShopCatalogProps {
  initialProducts: any[];
  categories: any[];
  currentCategorySlug?: string;
  isPreorderPage?: boolean;
}

export function ShopCatalog({
  initialProducts,
  categories,
  currentCategorySlug,
  isPreorderPage = false,
}: ShopCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    currentCategorySlug || "all"
  );
  const [selectedTexture, setSelectedTexture] = useState("all");
  const [selectedHairType, setSelectedHairType] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState(
    isPreorderPage ? "PREORDER" : "all"
  );
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available textures extracted dynamically
  const textures = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.texture) set.add(p.texture);
    });
    return Array.from(set);
  }, [initialProducts]);

  // Available hair types
  const hairTypes = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.hairType) set.add(p.hairType);
    });
    return Array.from(set);
  }, [initialProducts]);

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Category
        if (selectedCategory !== "all") {
          const matchesCategory =
            product.category?.slug === selectedCategory ||
            product.category?.parent?.slug === selectedCategory ||
            product.category?.parentId === selectedCategory;
          if (!matchesCategory) return false;
        }
        // Texture
        if (
          selectedTexture !== "all" &&
          product.texture !== selectedTexture
        ) {
          return false;
        }
        // Hair Type
        if (
          selectedHairType !== "all" &&
          product.hairType !== selectedHairType
        ) {
          return false;
        }
        // Availability
        if (selectedAvailability !== "all") {
          if (selectedAvailability === "PREORDER") {
            if (
              product.availability !== "PREORDER" &&
              !product.preorderEnabled
            ) {
              return false;
            }
          } else if (selectedAvailability === "IN_STOCK") {
            if (product.availability !== "IN_STOCK") {
              return false;
            }
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "bestseller")
          return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
        if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [
    initialProducts,
    selectedCategory,
    selectedTexture,
    selectedHairType,
    selectedAvailability,
    sortBy,
  ]);

  const hasActiveFilters =
    (selectedCategory !== "all" && !currentCategorySlug) ||
    selectedTexture !== "all" ||
    selectedHairType !== "all" ||
    (selectedAvailability !== "all" && !isPreorderPage);

  const resetFilters = () => {
    if (!currentCategorySlug) setSelectedCategory("all");
    setSelectedTexture("all");
    setSelectedHairType("all");
    if (!isPreorderPage) setSelectedAvailability("all");
  };

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-brand-border/60">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-brand-sand border border-brand-border rounded-full text-xs font-semibold uppercase tracking-wider text-brand-dark"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
            <p className="text-xs text-brand-muted uppercase tracking-widest font-medium">
              Showing <span className="font-bold text-brand-dark">{filteredProducts.length}</span> pieces
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-brand-muted" />
            <span className="text-xs uppercase tracking-wider text-brand-muted font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products by"
              className="text-xs font-semibold bg-brand-sand border border-brand-border rounded-full px-4 py-2 text-brand-dark outline-none focus:border-brand-dark cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="bestseller">Bestselling Units</option>
              <option value="newest">Newest Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex items-center flex-wrap gap-2 mb-8">
            <span className="text-xs text-brand-muted mr-1 uppercase tracking-widest font-medium">Active:</span>
            {selectedCategory !== "all" && !currentCategorySlug && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dark text-white text-xs">
                Category: {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                <button onClick={() => setSelectedCategory("all")}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedTexture !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dark text-white text-xs">
                Texture: {selectedTexture}
                <button onClick={() => setSelectedTexture("all")}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedHairType !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dark text-white text-xs">
                Hair: {selectedHairType}
                <button onClick={() => setSelectedHairType("all")}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedAvailability !== "all" && !isPreorderPage && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dark text-white text-xs">
                {selectedAvailability === "PREORDER" ? "Pre-Orders Only" : "In Stock Only"}
                <button onClick={() => setSelectedAvailability("all")}><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-brand-gold hover:underline font-semibold ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
            
            {/* Category Filter */}
            {!currentCategorySlug && (
              <div className="space-y-3">
                <h3 className="font-serif-luxury text-sm font-bold uppercase tracking-[0.18em] text-brand-dark pb-2 border-b border-brand-border">
                  Category
                </h3>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`block w-full text-left text-xs uppercase tracking-wider py-1 transition-colors ${
                      selectedCategory === "all"
                        ? "font-bold text-brand-dark pl-2 border-l-2 border-brand-dark"
                        : "text-brand-muted hover:text-brand-dark"
                    }`}
                  >
                    All Categories ({initialProducts.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`block w-full text-left text-xs uppercase tracking-wider py-1 transition-colors ${
                        selectedCategory === cat.slug
                          ? "font-bold text-brand-dark pl-2 border-l-2 border-brand-dark"
                          : "text-brand-muted hover:text-brand-dark"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            {!isPreorderPage && (
              <div className="space-y-3">
                <h3 className="font-serif-luxury text-sm font-bold uppercase tracking-[0.18em] text-brand-dark pb-2 border-b border-brand-border">
                  Availability
                </h3>
                <div className="space-y-2 text-xs text-brand-dark">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="avail"
                      checked={selectedAvailability === "all"}
                      onChange={() => setSelectedAvailability("all")}
                      className="accent-brand-dark"
                    />
                    <span>All Availability</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="avail"
                      checked={selectedAvailability === "IN_STOCK"}
                      onChange={() => setSelectedAvailability("IN_STOCK")}
                      className="accent-brand-dark"
                    />
                    <span>In Stock (Ready to Ship)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="avail"
                      checked={selectedAvailability === "PREORDER"}
                      onChange={() => setSelectedAvailability("PREORDER")}
                      className="accent-brand-dark"
                    />
                    <span>Pre-Order Artisan Drops</span>
                  </label>
                </div>
              </div>
            )}

            {/* Texture Filter */}
            {textures.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif-luxury text-sm font-bold uppercase tracking-[0.18em] text-brand-dark pb-2 border-b border-brand-border">
                  Hair Texture
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTexture("all")}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedTexture === "all"
                        ? "bg-brand-dark text-white"
                        : "bg-brand-sand text-brand-muted hover:text-brand-dark"
                    }`}
                  >
                    All
                  </button>
                  {textures.map((tex) => (
                    <button
                      key={tex}
                      onClick={() => setSelectedTexture(tex)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        selectedTexture === tex
                          ? "bg-brand-dark text-white"
                          : "bg-brand-sand text-brand-muted hover:text-brand-dark"
                      }`}
                    >
                      {tex}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Hair Type Filter */}
            {hairTypes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif-luxury text-sm font-bold uppercase tracking-[0.18em] text-brand-dark pb-2 border-b border-brand-border">
                  Hair Origin & Grade
                </h3>
                <div className="space-y-1.5 text-xs text-brand-dark">
                  <button
                    onClick={() => setSelectedHairType("all")}
                    className={`block w-full text-left py-1 ${
                      selectedHairType === "all"
                        ? "font-bold text-brand-dark"
                        : "text-brand-muted hover:text-brand-dark"
                    }`}
                  >
                    All Grades
                  </button>
                  {hairTypes.map((ht) => (
                    <button
                      key={ht}
                      onClick={() => setSelectedHairType(ht)}
                      className={`block w-full text-left py-1 ${
                        selectedHairType === ht
                          ? "font-bold text-brand-dark pl-2 border-l-2 border-brand-dark"
                          : "text-brand-muted hover:text-brand-dark"
                      }`}
                    >
                      {ht}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </aside>

          {/* Product Grid Main Column */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-brand-sand/30 rounded-2xl border border-brand-border/60">
                <div className="w-12 h-12 rounded-full bg-brand-sand flex items-center justify-center mx-auto text-brand-muted">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-brand-dark">
                  No matching hair pieces found
                </h3>
                <p className="text-xs text-brand-muted max-w-sm mx-auto">
                  Try adjusting your filters or search keywords to explore other luxury items in our collection.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>

      </div>

      {/* Mobile Filters Slide-over */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-in-right">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                  <h3 className="font-serif-luxury text-lg font-bold uppercase tracking-wider text-brand-dark">
                    Filter Collection
                  </h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 text-brand-muted hover:text-brand-dark"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                {!currentCategorySlug && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-brand-dark">Category</h4>
                    <div className="space-y-1">
                      <button
                        onClick={() => { setSelectedCategory("all"); setIsMobileFilterOpen(false); }}
                        className="block text-xs py-1 text-brand-muted"
                      >
                        All Categories
                      </button>
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => { setSelectedCategory(c.slug); setIsMobileFilterOpen(false); }}
                          className="block text-xs py-1 text-brand-muted hover:text-brand-dark"
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Textures */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-brand-dark">Texture</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {textures.map((t) => (
                      <button
                        key={t}
                        onClick={() => { setSelectedTexture(t); setIsMobileFilterOpen(false); }}
                        className={`text-xs px-3 py-1 rounded-full ${
                          selectedTexture === t ? "bg-brand-dark text-white" : "bg-brand-sand text-brand-dark"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              <div className="pt-6 border-t border-brand-border space-y-2">
                <button
                  onClick={() => { resetFilters(); setIsMobileFilterOpen(false); }}
                  className="w-full py-2.5 border border-brand-border rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  Show Results ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
