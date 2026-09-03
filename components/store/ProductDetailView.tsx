"use client";

import React, { useState, useMemo } from "react";
import { formatPrice } from "@/lib/formatters";
import { useCart } from "@/lib/cart-context";
import {
  ShoppingBag,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Star,
  ChevronDown,
  PhoneCall,
  Check,
} from "lucide-react";
import { ProductCard } from "./ProductCard";

interface ProductDetailViewProps {
  product: any;
  relatedProducts: any[];
  whatsappNumber?: string;
}

export function ProductDetailView({
  product,
  relatedProducts = [],
  whatsappNumber = "2349026555783",
}: ProductDetailViewProps) {
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("details");
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Parse formats, lengths and colors
  const parsedFormats: string[] = useMemo(() => {
    try {
      if (!product.formats) return [];
      return typeof product.formats === "string"
        ? JSON.parse(product.formats)
        : Array.isArray(product.formats)
        ? product.formats
        : [];
    } catch {
      return [];
    }
  }, [product.formats]);

  const parsedLengths: string[] = useMemo(() => {
    try {
      return product.lengths ? JSON.parse(product.lengths) : [];
    } catch {
      return [];
    }
  }, [product.lengths]);

  const parsedColors: string[] = useMemo(() => {
    try {
      return product.colors ? JSON.parse(product.colors) : [];
    } catch {
      return [];
    }
  }, [product.colors]);

  const [selectedFormat, setSelectedFormat] = useState<string>(
    parsedFormats[0] || ""
  );
  const [selectedLength, setSelectedLength] = useState<string>(
    parsedLengths[0] || '20"'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    parsedColors[0] || "Natural Black"
  );

  // Variant matching or length price calculation
  const currentVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return null;
    return product.variants.find((v: any) => v.length === selectedLength);
  }, [product.variants, selectedLength]);

  const currentPrice = currentVariant ? currentVariant.price : product.price;

  const availableStock = product.stock || 0;
  const isOutOfStock = product.availability === "OUT_OF_STOCK";
  const isZeroStock = availableStock <= 0;
  const isExceedingStock = !isZeroStock && quantity > availableStock;
  const isPreorder =
    product.availability === "PREORDER" || isZeroStock || isExceedingStock;

  const images = product.images && product.images.length > 0
    ? product.images
    : [
        {
          url: "/ck-hair/ck-hair-01.jpeg",
          alt: product.name,
        },
      ];

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    const variantLabel = [
      selectedFormat,
      selectedLength,
      selectedColor,
    ]
      .filter(Boolean)
      .join(" / ");

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: currentPrice,
      image: images[0].url,
      variantName: variantLabel,
      format: selectedFormat || null,
      length: selectedLength,
      color: selectedColor,
      texture: product.texture,
      quantity,
      stock: availableStock,
      isPreorder: Boolean(isPreorder),
      preorderDuration: product.preorderDuration || "2–4 weeks",
    });

    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2500);
  };

  const whatsappInquiryUrl = `https://wa.me/${whatsappNumber.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent(
    `Hello CK Hair, I am interested in: ${product.name} (${[selectedFormat, selectedLength, selectedColor].filter(Boolean).join(", ")}) - ${formatPrice(
      currentPrice
    )}.`
  )}`;

  return (
    <div className="py-8 md:py-16 bg-[#FAF6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-brand-sand border border-brand-border/60 shadow-lg">
              <img
                src={images[selectedImageIndex]?.url}
                alt={images[selectedImageIndex]?.alt || product.name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {isPreorder ? (
                  <span className="bg-[#2B2118] text-white text-[10px] uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full font-bold shadow-md flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#B76E79]" />
                    <span>{isExceedingStock ? "Pre-Order (> Stock)" : "Artisan Pre-Order"}</span>
                  </span>
                ) : (
                  <span className="bg-[#2B2118] text-[#FAF6F2] text-[10px] uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full font-bold shadow-md border border-[#EAD7C3]">
                    In Stock ({availableStock} pcs)
                  </span>
                )}
                {product.bestseller && (
                  <span className="bg-white/95 text-brand-dark text-[10px] uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full font-bold shadow-md border border-brand-border">
                    Bestseller
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? "border-brand-dark shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || `Thumb ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {product.category && (
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#B76E79] font-bold mb-1.5">
                  {product.category.parent ? `${product.category.parent.name} • ${product.category.name}` : product.category.name}
                </p>
              )}
              <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight break-words">
                {product.name}
              </h1>

              {/* Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-[#B76E79]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B76E79]" />
                  ))}
                </div>
                <span className="text-xs text-brand-muted font-medium">5.0 (Client Favorite)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif-luxury text-2xl md:text-3xl font-bold text-brand-dark">
                  {formatPrice(currentPrice)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > currentPrice && (
                  <span className="text-base text-brand-lightMuted line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Stock / Preorder Explanatory Box */}
            {isExceedingStock ? (
              <div className="p-4 rounded-2xl bg-[#FAF6E8] border border-[#E9DCB5] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#7E5E1A]">
                    <Clock className="w-4 h-4 text-brand-gold" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Pre-Order Notice (Quantity Exceeds Stock)
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#8A6820] bg-white/80 px-2 py-0.5 rounded-full">
                    {availableStock} in ready stock
                  </span>
                </div>
                <p className="text-xs text-[#5D4919] font-medium">
                  You selected <span className="font-bold">{quantity} pieces</span>. We have <span className="font-bold">{availableStock} pieces</span> in ready stock.
                </p>
                <p className="text-[11px] text-[#7A642B] font-light leading-relaxed">
                  The additional pieces will be specially handcrafted for you. Estimated artisan fulfillment: <span className="font-bold">{product.preorderDuration || "2–4 weeks"}</span>.
                </p>
              </div>
            ) : isZeroStock || product.availability === "PREORDER" ? (
              <div className="p-4 rounded-2xl bg-[#FAF6E8] border border-[#E9DCB5] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#7E5E1A]">
                    <Clock className="w-4 h-4 text-brand-gold" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Artisan Pre-Order
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#8A6820] bg-white/70 px-2 py-0.5 rounded-full">
                    Ready Stock Finished
                  </span>
                </div>
                <p className="text-xs text-[#5D4919] font-medium">
                  Estimated fulfillment: <span className="font-bold">{product.preorderDuration || "2–4 weeks"}</span>
                </p>
                <p className="text-[11px] text-[#7A642B] font-light leading-relaxed">
                  Ready stock for this piece is currently allocated. Your unit will be handcrafted in our next artisan production batch upon bank transfer confirmation.
                </p>
              </div>
            ) : availableStock <= 5 ? (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900">
                    <span className="text-sm">🔥</span>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Only {availableStock} {availableStock === 1 ? "Piece" : "Pieces"} Left in Stock!
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    Fast Selling
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 font-light">
                  Ready for immediate nationwide dispatch. If you select more than {availableStock} pieces, the order automatically switches to Pre-Order.
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between text-green-800 text-xs font-semibold bg-green-50 border border-green-200 px-4 py-2.5 rounded-xl">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-700" />
                  <span>In Stock & Ready for Immediate Dispatch</span>
                </div>
                <span className="text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                  {availableStock} pieces available
                </span>
              </div>
            )}

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-light">
                {product.shortDescription}
              </p>
            )}

            {/* Variants Selector */}
            <div className="space-y-4 pt-2 border-t border-brand-border/60">
              
              {/* Formats (e.g. Braiding Hair vs Weft) */}
              {parsedFormats.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-brand-dark">
                      Select Format: <span className="text-brand-gold font-bold">{selectedFormat}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {parsedFormats.map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setSelectedFormat(fmt)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          selectedFormat === fmt
                            ? "bg-brand-dark text-white shadow-sm"
                            : "bg-white border border-brand-border text-brand-dark hover:border-brand-dark"
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Lengths */}
              {parsedLengths.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-brand-dark">
                      Select Length: <span className="text-brand-muted font-normal">{selectedLength}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {parsedLengths.map((len) => (
                      <button
                        key={len}
                        type="button"
                        onClick={() => setSelectedLength(len)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          selectedLength === len
                            ? "bg-brand-dark text-white shadow-sm"
                            : "bg-white border border-brand-border text-brand-dark hover:border-brand-dark"
                        }`}
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {parsedColors.length > 0 && (
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-brand-dark block mb-2">
                    Color: <span className="text-brand-muted font-normal">{selectedColor}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {parsedColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          selectedColor === color
                            ? "bg-brand-dark text-white shadow-sm"
                            : "bg-white border border-brand-border text-brand-dark hover:border-brand-dark"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center justify-between sm:justify-start border border-brand-border rounded-full bg-white px-3 py-1.5 sm:py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold text-brand-dark hover:bg-[#EAD7C3]/50 rounded-full transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-brand-dark">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold text-brand-dark hover:bg-[#EAD7C3]/50 rounded-full transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 py-4 px-6 rounded-full text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 text-center ${
                    isOutOfStock
                      ? "bg-brand-sand text-brand-lightMuted cursor-not-allowed"
                      : isAddedSuccess
                      ? "bg-green-700 text-white"
                      : isPreorder
                      ? "bg-brand-dark text-white hover:bg-[#3E3025]"
                      : "bg-brand-dark text-white hover:bg-[#3E3025]"
                  }`}
                >
                  {isAddedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : isOutOfStock ? (
                    <span>Sold Out</span>
                  ) : isPreorder ? (
                    <>
                      <Clock className="w-4 h-4 text-[#B76E79]" />
                      <span>Pre-Order ({quantity} {quantity === 1 ? "Piece" : "Pieces"})</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag ({quantity} {quantity === 1 ? "Piece" : "Pieces"})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Consultation CTA */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white border border-brand-border text-brand-dark hover:border-brand-dark text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Inquire About This Unit on WhatsApp</span>
              </a>
            </div>

            {/* Accordions */}
            <div className="pt-6 border-t border-brand-border/60 divide-y divide-brand-border/60">
              
              {/* Description & Hair Details */}
              <div>
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === "details" ? null : "details")
                  }
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-brand-dark"
                >
                  <span>Description & Hair Details</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === "details" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "details" && (
                  <div className="pb-4 text-xs text-brand-muted font-light space-y-2 leading-relaxed">
                    <p>{product.description}</p>
                    <ul className="list-disc list-inside space-y-1 pt-2 text-brand-charcoal">
                      <li>Hair Grade: 100% Unprocessed Single-Donor / Virgin Cuticle Aligned</li>
                      <li>Texture: {product.texture || "Natural"}</li>
                      <li>Hair Type: {product.hairType || "Human Hair"}</li>
                      <li>Dye & Bleach Friendly: Bleaches up to Blonde #613 with ease</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              <div>
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === "care" ? null : "care")
                  }
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-brand-dark"
                >
                  <span>Hair Care & Maintenance Rituals</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === "care" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "care" && (
                  <div className="pb-4 text-xs text-brand-muted font-light space-y-1.5 leading-relaxed">
                    <p>• Wash weekly using sulfate-free moisture-rich shampoo and lukewarm water.</p>
                    <p>• Apply a deep conditioning hair masque for 20 minutes before rinsing thoroughly.</p>
                    <p>• Air dry completely on a mannequin head or towel before heat styling.</p>
                    <p>• Use satin/silk bonnets or pillowcases at night to protect cuticles and luster.</p>
                  </div>
                )}
              </div>

              {/* Shipping & Delivery */}
              <div>
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === "shipping" ? null : "shipping")
                  }
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-brand-dark"
                >
                  <span>Nationwide Delivery & Payment</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "shipping" && (
                  <div className="pb-4 text-xs text-brand-muted font-light space-y-1.5 leading-relaxed">
                    <p>• Lagos Delivery: 24–48 hours for in-stock pieces.</p>
                    <p>• Interstate Delivery: 2–4 business days via verified courier service.</p>
                    <p>• Pre-order deliveries follow the specific artisan timeframe ({product.preorderDuration || "2–4 weeks"}).</p>
                    <p>• Payments are handled via direct bank transfer to our GTBank account with instant WhatsApp confirmation.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-brand-border/60">
            <div className="text-center mb-10">
              <span className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-bold block mb-1">
                Complementary Pieces
              </span>
              <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold text-brand-dark">
                YOU MAY ALSO ADORE
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
