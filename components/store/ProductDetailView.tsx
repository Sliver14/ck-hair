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
  relatedProducts,
  whatsappNumber = "2348012345678",
}: ProductDetailViewProps) {
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("details");
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Parse lengths and colors
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

  const isPreorder =
    product.availability === "PREORDER" || product.preorderEnabled;
  const isOutOfStock = product.availability === "OUT_OF_STOCK";

  const images = product.images && product.images.length > 0
    ? product.images
    : [
        {
          url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85",
          alt: product.name,
        },
      ];

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: currentPrice,
      image: images[0].url,
      variantName: `${selectedLength} / ${selectedColor}`,
      length: selectedLength,
      color: selectedColor,
      texture: product.texture,
      quantity,
      isPreorder: !!isPreorder,
      preorderDuration: product.preorderDuration || "2–4 weeks",
    });

    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2500);
  };

  const whatsappInquiryUrl = `https://wa.me/${whatsappNumber.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent(
    `Hello CK Hair, I am interested in: ${product.name} (${selectedLength}, ${selectedColor}) - ${formatPrice(
      currentPrice
    )}.`
  )}`;

  return (
    <div className="py-8 md:py-16 bg-[#FAFAF8]">
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
                {isPreorder && (
                  <span className="bg-[#111111] text-white text-[10px] uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full font-bold shadow-md">
                    Pre-Order
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
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
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
                <p className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-bold mb-1.5">
                  {product.category.name}
                </p>
              )}
              <h1 className="font-serif-luxury text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight">
                {product.name}
              </h1>

              {/* Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold" />
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

            {/* Preorder Explanatory Box */}
            {isPreorder ? (
              <div className="p-4 rounded-xl bg-[#FAF6E8] border border-[#E9DCB5] space-y-2">
                <div className="flex items-center gap-2 text-[#7E5E1A]">
                  <Clock className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Available for Pre-Order
                  </span>
                </div>
                <p className="text-xs text-[#5D4919] font-medium">
                  Estimated fulfillment: <span className="font-bold">{product.preorderDuration || "2–4 weeks"}</span>
                </p>
                <p className="text-[11px] text-[#7A642B] font-light leading-relaxed">
                  This item is crafted in limited artisan batches. Your order will be prioritized and prepared immediately upon confirmation of bank transfer.
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-800 text-xs font-semibold bg-green-50 border border-green-200 px-3 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                <span>In Stock & Ready for Immediate Nationwide Dispatch</span>
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
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border border-brand-border rounded-full bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold text-brand-dark hover:bg-brand-sand rounded-full"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-brand-dark">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold text-brand-dark hover:bg-brand-sand rounded-full"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
                    isOutOfStock
                      ? "bg-brand-sand text-brand-lightMuted cursor-not-allowed"
                      : isAddedSuccess
                      ? "bg-green-700 text-white"
                      : isPreorder
                      ? "bg-brand-dark text-white hover:bg-black"
                      : "bg-brand-dark text-white hover:bg-black"
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
                      <Clock className="w-4 h-4 text-brand-gold" />
                      <span>Pre-Order Now</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
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
